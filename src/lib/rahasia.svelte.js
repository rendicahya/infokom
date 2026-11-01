// Narasi internal terenkripsi (public/narasi.enc.json, dibuat oleh scripts/kunci.mjs).
// Teks asli tidak pernah ada di repo maupun bundel JS; hanya bisa dibaca setelah password dimasukkan.

const SIMPAN = 'narasi-kunci';
const ALAMAT = import.meta.env.BASE_URL + 'narasi.enc.json';

export const rahasia = $state({ data: null });

const dariB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const keB64 = (u8) => btoa(String.fromCharCode(...u8));

let berkas;
async function ambil() {
  if (!berkas) {
    berkas = fetch(ALAMAT, { cache: 'no-cache' }).then((r) => {
      if (!r.ok) throw new Error('kosong');
      return r.json();
    });
    berkas.catch(() => (berkas = null));
  }
  return berkas;
}

async function dekripsi(kunci, f) {
  const teks = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: dariB64(f.iv) }, kunci, dariB64(f.ct));
  rahasia.data = JSON.parse(new TextDecoder().decode(teks));
}

/** Membuka narasi internal. Melempar 'kosong' bila belum ada data, 'salah' bila password salah. */
export async function buka(pw) {
  const f = await ambil();
  const bahan = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const kunci = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: dariB64(f.salt), iterations: f.iter },
    bahan, { name: 'AES-GCM', length: 256 }, true, ['decrypt'],
  );
  try {
    await dekripsi(kunci, f);
  } catch {
    throw new Error('salah');
  }
  // Kunci turunan (bukan password) disimpan selama tab terbuka agar tidak perlu mengetik ulang saat dimuat ulang
  try { sessionStorage.setItem(SIMPAN, keB64(new Uint8Array(await crypto.subtle.exportKey('raw', kunci)))); } catch {}
}

export function kunci() {
  rahasia.data = null;
  try { sessionStorage.removeItem(SIMPAN); } catch {}
}

/** Narasi internal untuk butir, dicari dengan nomor lalu kode. */
export function narasiInternal(jenjang, butir) {
  const d = rahasia.data?.[jenjang.id];
  return d?.[butir.no] ?? d?.[butir.kode] ?? null;
}

// Pulihkan sesi yang masih terbuka
(async () => {
  let k;
  try { k = sessionStorage.getItem(SIMPAN); } catch {}
  if (!k) return;
  try {
    const kunciTersimpan = await crypto.subtle.importKey('raw', dariB64(k), 'AES-GCM', false, ['decrypt']);
    await dekripsi(kunciTersimpan, await ambil());
  } catch {
    kunci();
  }
})();
