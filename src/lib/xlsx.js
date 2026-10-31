// Ekspor hasil kalkulator ke .xlsx. Semua nilai turunan ditulis sebagai rumus agar ikut berubah
// bila skor diubah di Excel. ExcelJS dimuat saat dibutuhkan saja supaya bundel utama tetap ringan.
import { AMBANG, MIN_BUTIR, MIN_RERATA } from './score.js';
import { TAHAP } from './parse.js';

const FONT = { name: 'Arial', size: 10 };
const BIRU = { ...FONT, color: { argb: 'FF0000FF' } };
const TEBAL = { ...FONT, bold: true };
const KEPALA = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE7E5E0' } };
const GARIS = { bottom: { style: 'thin', color: { argb: 'FF8A857C' } } };

const labelKriteria = (k) =>
  k.id === 'profil' ? `A–B. ${k.nama}` : k.id === 'suplemen' ? `D. ${k.nama}` : `C.${k.id.slice(1)} ${k.nama}`;
const ringkas = (b) => b.elemen.replace(/^\d\.\d\.?\s*\[[A-Z]+\]\s*/, '').replace(/^\d\.\d\s*/, '');

export async function eksporXlsx(jenjang, skor, { nama = '', normalisasi = false } = {}) {
  const { default: ExcelJS } = await import('exceljs');
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Panduan LED LAM INFOKOM';
  wb.created = new Date();
  wb.calcProperties.fullCalcOnLoad = true;

  const ws = wb.addWorksheet('Ringkasan');
  const sk = wb.addWorksheet('Skor');

  // Lembar Skor: satu baris per butir
  const n = jenjang.butir.length;
  const akhir = n + 1;
  const kol = (c) => `Skor!$${c}$2:$${c}$${akhir}`;
  sk.columns = [
    { header: 'No', width: 5 },
    { header: 'Kode', width: 9 },
    { header: 'Kriteria', width: 34 },
    { header: 'Tahap', width: 13 },
    { header: 'Jenis', width: 7 },
    { header: 'Elemen penilaian', width: 70 },
    { header: 'Bobot', width: 9 },
    { header: 'Skor (0–4)', width: 11 },
    { header: 'Nilai', width: 9 },
  ];
  const label = new Map(jenjang.kriteria.map((k) => [k.id, labelKriteria(k)]));
  jenjang.butir.forEach((b, i) => {
    const r = i + 2;
    sk.addRow([
      b.no, b.kode, label.get(b.kriteria), b.tahapNo ? TAHAP[b.tahapNo - 1] : '', b.jenis, ringkas(b), b.bobot,
      skor[b.no] ?? null, { formula: `G${r}*H${r}/4` },
    ]);
  });
  sk.eachRow((row, r) => {
    row.eachCell({ includeEmpty: true }, (c) => (c.font = r === 1 ? TEBAL : FONT));
    row.alignment = { vertical: 'top' };
    if (r === 1) {
      row.eachCell((c) => ((c.fill = KEPALA), (c.border = GARIS)));
      return;
    }
    row.getCell(6).alignment = { vertical: 'top', wrapText: true };
    row.getCell(8).font = BIRU;
    for (const c of [7, 8, 9]) row.getCell(c).numFmt = '0.00';
  });
  sk.views = [{ state: 'frozen', ySplit: 1 }];
  sk.dataValidations.add(`H2:H${akhir}`, {
    type: 'decimal', operator: 'between', allowBlank: true, formulae: [0, 4],
    showErrorMessage: true, errorTitle: 'Skor tidak valid', error: 'Skor harus antara 0 dan 4.',
  });
  sk.autoFilter = `A1:I${akhir}`;

  // Lembar Ringkasan
  ws.columns = [{ width: 44 }, { width: 14 }, { width: 10 }, { width: 12 }, { width: 12 }, { width: 13 }, { width: 14 }, { width: 13 }];
  const isi = (alamat, v, font = FONT, fmt) => {
    const c = ws.getCell(alamat);
    c.value = v;
    c.font = font;
    if (fmt) c.numFmt = fmt;
    return c;
  };
  const sumber = 'Sumber: Instrumen LED / Matriks Penilaian LAM INFOKOM 2.1 (2025)';

  isi('A1', `Hasil perhitungan nilai akhir LED · Program ${jenjang.nama}`, { ...TEBAL, size: 14 });
  isi('A2', 'Nama perhitungan'); isi('B2', nama || '–');
  isi('A3', 'Diekspor'); isi('B3', new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }));

  isi('A5', 'Total bobot'); isi('B5', { formula: `SUM(${kol('G')})` }, FONT, '0.00');
  isi('A6', 'Σ (bobot × skor) ÷ 4'); isi('B6', { formula: `SUM(${kol('I')})` }, FONT, '0.00');
  isi('A7', 'Skalakan ke 400 (Ya/Tidak)'); isi('B7', normalisasi ? 'Ya' : 'Tidak', BIRU);
  ws.getCell('C7').value = 'Ya = nilai dikalikan 400 ÷ total bobot';
  ws.getCell('C7').font = { ...FONT, italic: true };
  ws.getCell('B7').dataValidation = { type: 'list', allowBlank: false, formulae: ['"Ya,Tidak"'] };
  isi('A8', 'Nilai akhir', TEBAL); isi('B8', { formula: 'IF(B7="Ya",B6*400/B5,B6)' }, { ...TEBAL, size: 12 }, '0.00');

  const konstanta = [
    ['A9', 'Ambang Terakreditasi', AMBANG.terakreditasi],
    ['A10', 'Ambang Unggul (tiga tahun)', AMBANG.unggul],
    ['A11', 'Ambang Unggul (lima tahun)', AMBANG.unggul5],
    ['A12', 'Skor minimal per butir (syarat Unggul)', MIN_BUTIR],
    ['A13', 'Rerata minimal per kriteria (syarat Unggul)', MIN_RERATA],
  ];
  for (const [a, teks, v] of konstanta) {
    isi(a, teks);
    const c = isi(a.replace('A', 'B'), v, BIRU, '0.00');
    c.note = sumber;
  }

  isi('A14', 'Butir terisi'); isi('B14', { formula: `COUNT(${kol('H')})&" dari ${n}"` });

  // Tabel per kriteria
  const t0 = 20;
  ['Kriteria', 'Jumlah butir', 'Terisi', 'Bobot', 'Nilai', 'Rerata skor', 'Syarat Unggul', 'Memenuhi'].forEach((h, i) => {
    const c = ws.getRow(t0).getCell(i + 1);
    c.value = h;
    c.font = TEBAL;
    c.fill = KEPALA;
    c.border = GARIS;
  });
  const syaratRows = [];
  jenjang.kriteria.forEach((k, i) => {
    const r = t0 + 1 + i;
    const nm = `$A${r}`;
    const row = ws.getRow(r);
    row.values = [
      label.get(k.id),
      { formula: `COUNTIF(${kol('C')},${nm})` },
      { formula: `COUNTIFS(${kol('C')},${nm},${kol('H')},"<>")` },
      { formula: `SUMIF(${kol('C')},${nm},${kol('G')})` },
      { formula: `SUMIF(${kol('C')},${nm},${kol('I')})` },
      { formula: `IF(C${r}=0,"–",AVERAGEIF(${kol('C')},${nm},${kol('H')}))` },
      k.syaratUnggul ? 'Ya' : 'Tidak',
      k.syaratUnggul
        ? { formula: `IF(AND(C${r}=B${r},COUNTIFS(${kol('C')},${nm},${kol('H')},"<"&$B$12)=0,IFERROR(AVERAGEIF(${kol('C')},${nm},${kol('H')}),0)>=$B$13),"Ya","Belum")` }
        : '–',
    ];
    row.eachCell({ includeEmpty: true }, (c) => (c.font = FONT));
    for (const c of [4, 5, 6]) row.getCell(c).numFmt = '0.00';
    if (k.syaratUnggul) syaratRows.push(r);
  });
  const tN = t0 + jenjang.kriteria.length;
  const total = ws.getRow(tN + 1);
  total.values = [
    'Total', { formula: `SUM(B${t0 + 1}:B${tN})` }, { formula: `SUM(C${t0 + 1}:C${tN})` },
    { formula: `SUM(D${t0 + 1}:D${tN})` }, { formula: `SUM(E${t0 + 1}:E${tN})` },
  ];
  total.eachCell((c) => ((c.font = TEBAL), (c.border = { top: { style: 'thin' } })));
  for (const c of [4, 5]) total.getCell(c).numFmt = '0.00';

  const memenuhi = syaratRows.map((r) => `H${r}="Ya"`).join(',');
  isi('A15', 'Syarat Unggul terpenuhi');
  isi('B15', { formula: syaratRows.length ? `IF(AND(${memenuhi}),"Ya","Tidak")` : '"Ya"' });
  isi('A16', 'Status', TEBAL);
  isi(
    'B16',
    { formula: 'IF(B8<B9,"Tidak Terakreditasi",IF(OR(B8<B10,B15<>"Ya"),"Terakreditasi",IF(B8<B11,"Unggul (berlaku tiga tahun)","Unggul (berlaku lima tahun)")))' },
    { ...TEBAL, size: 12 },
  );
  isi('A18', 'Ubah skor di lembar Skor (kolom H, teks biru); semua nilai lain dihitung ulang otomatis. Skor kosong dihitung 0.', { ...FONT, italic: true });
  ws.getCell(`E${t0}`).note ='Nilai per kriteria pada tabel di bawah belum diskalakan ke 400.';

  const buf = await wb.xlsx.writeBuffer();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  const slug = (nama || 'hasil').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  a.download = `kalkulator-led-${jenjang.id}-${slug || 'hasil'}.xlsx`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
