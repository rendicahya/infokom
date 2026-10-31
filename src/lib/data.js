import matriksSarjana from '../../dokumen/Matriks Penilaian Sarjana Unggul.md?raw';
import matriksMagister from '../../dokumen/Matriks Penilaian Magister Unggul.md?raw';
import matriksDoktor from '../../dokumen/Matriks Penilaian Doktor Unggul.md?raw';
import ledSarjana from '../../dokumen/Instrumen LED Sarjana Unggul.md?raw';
import ledMagister from '../../dokumen/Instrumen LED Magister Unggul.md?raw';
import ledDoktor from '../../dokumen/Instrumen LED Doktor Unggul.md?raw';
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

// Alur PPEPP: butir dengan kriteria & huruf yang sama membentuk satu siklus (mis. 2.1 A → 2.2 A → … → 2.5 A).
// Topiknya identik di ketiga jenjang.
const ALUR_JUDUL = {
  '1A': 'Tata kelola internal & SOP',
  '1B': 'Fungsi SPMI & SDM pelaksana',
  '2A': 'Sarpras, DTPR, pembiayaan & penerimaan mahasiswa',
  '2B': 'Isi pembelajaran & kurikulum OBE',
  '2C': 'Fleksibilitas proses pembelajaran',
  '2D': 'Prestasi mahasiswa & kompetensi lulusan',
  '3A': 'Sarpras, DTPR, pembiayaan & peta jalan penelitian',
  '3B': 'Implementasi peta jalan & pelibatan mahasiswa',
  '3C': 'Hibah, kerja sama, publikasi & HKI',
  '4A': 'Sarpras, DTPR, pembiayaan & peta jalan PkM',
  '4B': 'Implementasi peta jalan PkM & pelibatan mahasiswa',
  '4C': 'Hibah, kerja sama, diseminasi & HKI',
  '5A': 'Tata kelola otonom, transparan & akuntabel',
  '5B': 'Audit mutu tupoksi, sarpras & SDM',
  '6': 'Tridarma, VMTS & rencana strategis',
};

// Konteks yang dipakai contoh narasi agar sesuai jenjang.
const KONTEKS = {
  sarjana: {
    jenjang: 'Sarjana', ps: 'PS Sarjana Teknik Informatika', kkni: 6, tugasAkhir: 'skripsi',
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

  const alur = [];
  for (const b of butir) {
    if (!b.tahapNo || b.kriteria === 'suplemen') continue;
    const aid = `${b.kriteriaNo}${b.huruf}`;
    let a = alur.find((x) => x.id === aid);
    if (!a) {
      a = { id: aid, label: b.huruf ? `${b.kriteriaNo}.x ${b.huruf}` : `${b.kriteriaNo}.x`, kriteria: b.kriteria, huruf: b.huruf, judul: ALUR_JUDUL[aid] || '', butir: [], bobot: 0 };
      alur.push(a);
    }
    a.butir[b.tahapNo - 1] = b;
    a.bobot += b.bobot;
    b.alur = a;
  }

  const totalBobot = butir.reduce((a, b) => a + b.bobot, 0);
  const kriteria = KRITERIA.map((k) => {
    const list = butir.filter((b) => b.kriteria === k.id);
    return { ...k, butir: list, alur: alur.filter((a) => a.kriteria === k.id), bobot: list.reduce((a, b) => a + b.bobot, 0) };
  }).filter((k) => k.butir.length);

  return { id, nama, butir, kriteria, alur, led, totalBobot, konteks: KONTEKS[id] };
}

export const JENJANG = [
  build('sarjana', 'Sarjana', matriksSarjana, ledSarjana),
  build('magister', 'Magister', matriksMagister, ledMagister),
  build('doktor', 'Doktor', matriksDoktor, ledDoktor),
];

export const getJenjang = (id) => JENJANG.find((j) => j.id === id);

export const fmt = (n, d = 2) =>
  Number(n).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: d });
