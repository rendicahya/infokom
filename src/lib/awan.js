// Penyimpanan penilaian di Firebase (Firestore). Hanya tersedia setelah password dimasukkan.
//
// Konfigurasi Firebase dicari di:
//   1. data internal terenkripsi (internal/narasi.json, kunci "_firebase"), sehingga konfigurasi
//      tidak ikut terbaca di bundel publik; atau
//   2. variabel lingkungan VITE_FIREBASE_* saat build (.env.local).
//
// Struktur data: penilaian/{jenjang}/simpanan/{id}
// SDK Firebase dimuat saat dibutuhkan saja supaya bundel utama tetap ringan.
import { rahasia } from './rahasia.svelte.js';

const env = import.meta.env;
const dariEnv = env.VITE_FIREBASE_PROJECT_ID
  ? {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    }
  : null;

export const konfigurasi = () => rahasia.data?._firebase ?? dariEnv;

let siap;
async function db() {
  const cfg = konfigurasi();
  if (!rahasia.data) throw new Error('Masukkan password terlebih dahulu.');
  if (!cfg?.projectId) throw new Error('Konfigurasi Firebase belum diatur.');
  if (!siap) {
    siap = (async () => {
      const { initializeApp, getApps } = await import('firebase/app');
      const fs = await import('firebase/firestore');
      const app = getApps()[0] ?? initializeApp(cfg);
      return { fs, db: fs.getFirestore(app) };
    })();
    siap.catch(() => (siap = null));
  }
  return siap;
}

const idDari = (nama) =>
  nama.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 120) || 'tanpa-nama';

export async function unggah(jenjangId, data) {
  const { fs, db: d } = await db();
  const id = idDari(data.nama);
  await fs.setDoc(fs.doc(d, 'penilaian', jenjangId, 'simpanan', id), { ...data, diunggah: fs.serverTimestamp() });
  return id;
}

export async function daftar(jenjangId) {
  const { fs, db: d } = await db();
  const q = fs.query(fs.collection(d, 'penilaian', jenjangId, 'simpanan'), fs.orderBy('waktu', 'desc'), fs.limit(100));
  const snap = await fs.getDocs(q);
  return snap.docs.map((x) => ({ id: x.id, ...x.data() }));
}

export async function hapus(jenjangId, id) {
  const { fs, db: d } = await db();
  await fs.deleteDoc(fs.doc(d, 'penilaian', jenjangId, 'simpanan', id));
}
