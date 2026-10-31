import matriksSarjana from '../../Matriks Penilaian Sarjana Unggul.md?raw';
import matriksMagister from '../../Matriks Penilaian Magister Unggul.md?raw';
import matriksDoktor from '../../Matriks Penilaian Doktor Unggul.md?raw';
import ledSarjana from '../../Instrumen LED Sarjana Unggul.md?raw';
import ledMagister from '../../Instrumen LED Magister Unggul.md?raw';
import ledDoktor from '../../Instrumen LED Doktor Unggul.md?raw';
import { parseMatriks, parseLED, panduanUntukButir } from './parse.js';

export const KRITERIA = [
  { id: 'profil', nama: 'Kondisi Eksternal & Profil UPPS', singkat: 'Profil', syaratUnggul: false },
  { id: 'k1', nama: 'Budaya Mutu', singkat: 'Budaya Mutu', syaratUnggul: true },
  { id: 'k2', nama: 'Relevansi Pendidikan', singkat: 'Pendidikan', syaratUnggul: true },
  { id: 'k3', nama: 'Relevansi Penelitian', singkat: 'Penelitian', syaratUnggul: true },
  { id: 'k4', nama: 'Relevansi PkM', singkat: 'PkM', syaratUnggul: false },
  { id: 'k5', nama: 'Akuntabilitas', singkat: 'Akuntabilitas', syaratUnggul: false },
  { id: 'k6', nama: 'Diferensiasi Misi', singkat: 'Diferensiasi Misi', syaratUnggul: false },
  { id: 'suplemen', nama: 'Suplemen Program Studi', singkat: 'Suplemen', syaratUnggul: false },
];

// Konteks yang dipakai contoh narasi agar sesuai jenjang.
const KONTEKS = {
  sarjana: {
    jenjang: 'Sarjana', ps: 'PS Sarjana Informatika', kkni: 6, tugasAkhir: 'skripsi',
    mhsRiset: 'mahasiswa tingkat akhir', masaStudi: '4 tahun', skala: 1,
  },
  magister: {
    jenjang: 'Magister', ps: 'PS Magister Ilmu Komputer', kkni: 8, tugasAkhir: 'tesis',
    mhsRiset: 'mahasiswa magister', masaStudi: '2 tahun', skala: 0.5,
  },
  doktor: {
    jenjang: 'Doktor', ps: 'PS Doktor Ilmu Komputer', kkni: 9, tugasAkhir: 'disertasi',
    mhsRiset: 'mahasiswa doktor', masaStudi: '3 tahun', skala: 0.25,
  },
};

function build(id, nama, matriksMd, ledMd) {
  const { butir, suplemenRekap } = parseMatriks(matriksMd);
  const led = parseLED(ledMd);

  // Sarjana: butir Suplemen tidak ada di Matriks; bobotnya diambil dari tabel Rekap Hasil Hitung.
  if (!butir.some((b) => b.kriteria === 'suplemen') && suplemenRekap.length) {
    let no = butir.length;
    suplemenRekap.forEach((s, i) => {
      butir.push({
        no: ++no, kodeAsli: `D${i + 1}`, kode: `D${i + 1}`, kriteriaNo: 0, tahapNo: 0, huruf: '',
        kriteria: 'suplemen', suplemenIndex: i, jenis: 'O', bobot: s.bobot,
        elemen: s.nama, deskriptor: '', syaratUnggul: '', rubrik: {}, tanpaRubrik: true,
      });
    });
  }

  for (const b of butir) b.panduan = panduanUntukButir(led, b);

  const totalBobot = butir.reduce((a, b) => a + b.bobot, 0);
  const kriteria = KRITERIA.map((k) => {
    const list = butir.filter((b) => b.kriteria === k.id);
    return { ...k, butir: list, bobot: list.reduce((a, b) => a + b.bobot, 0) };
  }).filter((k) => k.butir.length);

  return { id, nama, butir, kriteria, led, totalBobot, konteks: KONTEKS[id] };
}

export const JENJANG = [
  build('sarjana', 'Sarjana', matriksSarjana, ledSarjana),
  build('magister', 'Magister', matriksMagister, ledMagister),
  build('doktor', 'Doktor', matriksDoktor, ledDoktor),
];

export const getJenjang = (id) => JENJANG.find((j) => j.id === id);

export const fmt = (n, d = 2) =>
  Number(n).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: d });
