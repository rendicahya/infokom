// Penyimpanan hasil penilaian di server (Cloud Firestore). Hanya tersedia setelah password dimasukkan.
//
// Konfigurasi dicari di:
//   1. data internal terenkripsi (internal/narasi.json, kunci "_firebase"), sehingga konfigurasi
//      tidak ikut terbaca di bundel publik; atau
//   2. variabel lingkungan VITE_FIREBASE_* saat build (.env.local).
//
// Struktur data: penilaian/{jenjang}/simpanan/{id acak}
// Setiap dokumen memakai format paket .lam (format "infokom-lam"), ditambah stempel waktu server.
// SDK dimuat saat dibutuhkan saja supaya bundel utama tetap ringan.
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
function sambung() {
  const cfg = konfigurasi();
  if (!rahasia.data) throw new Error('Masukkan password terlebih dahulu.');
  if (!cfg?.projectId) throw new Error('Penyimpanan server belum diatur.');
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

function pesan(err) {
  const kode = String(err?.code || '');
  if (kode.endsWith('permission-denied')) return 'Akses ditolak server (data tidak sesuai aturan penyimpanan).';
  if (kode.endsWith('unavailable') || kode.endsWith('deadline-exceeded')) return 'Server tidak dapat dihubungi. Periksa koneksi internet.';
  if (kode.endsWith('not-found')) return 'Data tidak ditemukan di server; mungkin sudah dihapus.';
  if (kode.endsWith('resource-exhausted')) return 'Kuota server sedang habis. Coba lagi nanti.';
  return err?.message || String(err);
}

async function jalankan(fn) {
  const { fs, db } = await sambung();
  try {
    return await fn(fs, db);
  } catch (err) {
    throw new Error(pesan(err));
  }
}

const koleksi = (fs, db, j) => fs.collection(db, 'penilaian', j, 'simpanan');
const dokumen = (fs, db, j, id) => fs.doc(db, 'penilaian', j, 'simpanan', id);
// Buang medan milik server sebelum ditulis ulang
const bersih = ({ id, dibuat, diperbarui, diunggah, ...data }) => data;

export const daftar = (j) =>
  jalankan(async (fs, db) => {
    const snap = await fs.getDocs(fs.query(koleksi(fs, db, j), fs.orderBy('waktu', 'desc'), fs.limit(500)));
    return snap.docs.map((x) => ({ ...x.data(), id: x.id }));
  });

/** Menambah hasil penilaian baru; mengembalikan id-nya. */
export const tambah = (j, data) =>
  jalankan(async (fs, db) => {
    const t = fs.serverTimestamp();
    const ref = await fs.addDoc(koleksi(fs, db, j), { ...bersih(data), waktu: Date.now(), dibuat: t, diperbarui: t });
    return ref.id;
  });

/** Menimpa isi hasil penilaian yang sudah ada. */
export const perbarui = (j, id, data) =>
  jalankan((fs, db) =>
    fs.updateDoc(dokumen(fs, db, j, id), { ...bersih(data), waktu: Date.now(), diperbarui: fs.serverTimestamp() }),
  );

export const gantiNama = (j, id, nama) =>
  jalankan((fs, db) => fs.updateDoc(dokumen(fs, db, j, id), { nama, waktu: Date.now(), diperbarui: fs.serverTimestamp() }));

/** Menghapus satu atau beberapa hasil sekaligus. */
export const hapus = (j, ids) =>
  jalankan(async (fs, db) => {
    for (let i = 0; i < ids.length; i += 400) {
      const b = fs.writeBatch(db);
      for (const id of ids.slice(i, i + 400)) b.delete(dokumen(fs, db, j, id));
      await b.commit();
    }
  });
