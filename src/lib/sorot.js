// Menyorot bagian kalimat yang sama pada butir berhuruf sama di kelima tahap PPEPP
// (mis. C.1 A di Penetapan, Pelaksanaan, Evaluasi, Pengendalian, Peningkatan).
// Kata dianggap "sama" bila termasuk rangkaian 3 kata yang muncul di semua tahap lain (toleransi satu tahap).

const N = 3;
// Kata yang tidak dijadikan awal/akhir sorotan: kata sambung dan frasa khas tahap.
const PINGGIR = new Set([
  'dan', 'atau', 'dan/atau', 'yang', 'di', 'dengan', 'serta', 'untuk', 'dalam', 'pada', 'oleh', 'dari', 'ke', 'terkait',
  'tentang', 'mengenai', 'kebijakan', 'standar', 'indikator', 'kegiatan', 'pelaksanaan', 'evaluasi', 'ketercapaian',
  'tindak', 'lanjut', 'hasil', 'peningkatan', 'optimalisasi', 'peningkatan/optimalisasi', 'menunjukkan', 'berfungsinya',
  'mencakup', 'yaitu', 'misalnya',
]);

const tokens = (teks) => [...String(teks).matchAll(/[\p{L}\p{N}]+(?:[\/-][\p{L}\p{N}]+)*/gu)].map((m) => ({
  w: m[0].toLowerCase(), a: m.index, b: m.index + m[0].length,
}));

const ngram = (tk, i) => tk.slice(i, i + N).map((t) => t.w).join(' ');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Rentang [awal, akhir) karakter dalam `teks` yang sama dengan semua teks `lain`. */
function rentangSama(teks, lain) {
  const tk = tokens(teks);
  const himpunan = lain.map((s) => {
    const t = tokens(s);
    return new Set(t.slice(0, Math.max(0, t.length - N + 1)).map((_, i) => ngram(t, i)));
  });
  // Boleh absen di satu tahap saja bila pembandingnya ≥ 3, agar beda redaksi kecil di satu tahap tidak memutus sorotan.
  const minimal = himpunan.length >= 3 ? himpunan.length - 1 : himpunan.length;
  const tanda = new Array(tk.length).fill(false);
  const sambung = new Array(tk.length).fill(false); // sambung[i]: kata i dan i+1 berada dalam satu rangkaian yang cocok
  for (let i = 0; i + N <= tk.length; i++) {
    const g = ngram(tk, i);
    if (himpunan.filter((h) => h.has(g)).length >= minimal) {
      for (let j = i; j < i + N; j++) tanda[j] = true;
      for (let j = i; j < i + N - 1; j++) sambung[j] = true;
    }
  }
  const hasil = [];
  for (let i = 0; i < tk.length; ) {
    if (!tanda[i]) { i++; continue; }
    let j = i;
    while (j + 1 < tk.length && sambung[j]) j++;
    let a = i, b = j;
    while (a <= b && PINGGIR.has(tk[a].w)) a++;
    while (b >= a && PINGGIR.has(tk[b].w)) b--;
    if (b - a + 1 >= N) hasil.push([tk[a].a, tk[b].b]);
    i = j + 1;
  }
  return hasil;
}

/** HTML ber-<mark> untuk butir `huruf` di tahap ke-`idx` dari kriteria `k`. */
export function sorotButir(k, idx, huruf) {
  const teks = k.tahap[idx]?.items[huruf] || '';
  // Dibandingkan dengan semua tahap lain yang memiliki butir berhuruf sama.
  const lain = k.tahap.filter((t, i) => i !== idx).map((t) => t.items[huruf]);
  return sorot(teks, lain, huruf);
}

/**
 * Menyisipkan <mark> pada bagian `teks` yang sama dengan teks-teks `lain`.
 * md=false: hasil berupa HTML (teks di-escape). md=true: hasil tetap markdown, sorotan dipecah per baris
 * dan tidak mencakup penanda daftar/kutipan di awal baris, agar struktur markdown tidak rusak.
 */
export function sorot(teks, lain, huruf, md = false) {
  teks = teks || '';
  lain = lain.filter(Boolean);
  const e = md ? (s) => s : esc;
  if (!teks || !lain.length || !huruf) return e(teks);
  // Warna dibedakan per huruf butir (A, B, C, …); berulang setelah 6 warna.
  const buka = `<mark class="sama w${(((huruf.charCodeAt(0) - 65) % 6) + 6) % 6}">`;
  const bungkus = (s) =>
    md
      ? s.split('\n').map((baris) => baris.replace(/^(\s*(?:[-*+>]\s+|\d+[.)]\s+)*)(.*?)(\s*)$/, (_, p, isi, q) => (isi ? p + buka + isi + '</mark>' + q : p + q))).join('\n')
      : buka + esc(s) + '</mark>';
  let out = '', pos = 0;
  for (const [a, b] of rentangSama(teks, lain)) {
    out += e(teks.slice(pos, a)) + bungkus(teks.slice(a, b));
    pos = b;
  }
  return out + e(teks.slice(pos));
}

/** Butir lain dalam kriteria yang sama, berhuruf sama, di tahap PPEPP lain (satu per tahap). */
export function saudara(semua, b) {
  if (!b.kriteriaNo || !b.huruf || !b.tahapNo || b.kriteria === 'suplemen' || b.kriteria === 'profil') return [];
  const perTahap = new Map();
  for (const x of semua)
    if (x !== b && x.kriteria === b.kriteria && x.huruf === b.huruf && x.tahapNo !== b.tahapNo && !perTahap.has(x.tahapNo))
      perTahap.set(x.tahapNo, x);
  return [...perTahap.values()];
}
