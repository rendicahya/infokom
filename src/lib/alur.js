import { href } from './router.svelte.js';

// Penjelasan keterkaitan satu butir dengan butir lain di alur PPEPP yang sama (markdown, berisi tautan).
export function kesinambungan(jenjangId, b) {
  if (!b.alur) return '';
  const t = b.alur.butir;
  const L = (i) => (t[i] ? `[${t[i].kode}](${href(jenjangId, 'butir', t[i].no)})` : `tahap ${i + 1}`);
  switch (b.tahapNo) {
    case 1:
      return `Titik awal alur. Standar dan indikator yang ditetapkan di sini menjadi acuan pelaksanaan di ${L(1)}, diukur ketercapaiannya di ${L(2)}, ditindaklanjuti di ${L(3)}, dan dinaikkan di ${L(4)}. Tulis indikator yang terukur dan bertarget agar keempat butir berikutnya bisa merujuknya.`;
    case 2:
      return `Laksanakan standar yang ditetapkan di ${L(0)}. Sebut nama/nomor standar dan indikatornya, lalu tunjukkan bukti pelaksanaan. Data pelaksanaan ini menjadi bahan evaluasi di ${L(2)}.`;
    case 3:
      return `Ukur ketercapaian indikator dari ${L(0)} atas pelaksanaan di ${L(1)}: target vs realisasi, kecenderungan beberapa tahun, dan kesenjangannya. Kesenjangan yang ditemukan diteruskan ke ${L(3)}.`;
    case 4:
      return `Tindak lanjuti kesenjangan hasil evaluasi di ${L(2)}: akar masalah, rencana tindak lanjut, penanggung jawab, dan bukti penyelesaiannya. Hasilnya menjadi dasar peningkatan di ${L(4)}.`;
    case 5:
      return `Tutup siklus: naikkan standar/indikator di ${L(0)} berdasarkan hasil ${L(2)} dan ${L(3)}, sehingga siklus berikutnya dimulai dari standar yang lebih tinggi.`;
  }
  return '';
}
