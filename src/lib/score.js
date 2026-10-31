// Perhitungan nilai akhir dan status akreditasi.
// Nilai akhir = Σ (bobot × skor) / 4, sehingga skor 4 di semua butir = total bobot (≈ 400).
// Opsi "normalisasi" menskalakan hasil ke 400 bila total bobot jenjang bukan tepat 400.

export const AMBANG = { terakreditasi: 200, unggul: 321, unggul5: 361 };
export const MIN_BUTIR = 3;
export const MIN_RERATA = 3.2;

export function hitung(jenjang, skor, { normalisasi = false } = {}) {
  const faktor = normalisasi ? 400 / jenjang.totalBobot : 1;
  let mentah = 0;
  let terisi = 0;

  const perKriteria = jenjang.kriteria.map((k) => {
    let nilai = 0;
    let jumlahSkor = 0;
    let n = 0;
    for (const b of k.butir) {
      const s = skor[b.no];
      if (s == null || s === '') continue;
      nilai += (b.bobot * s) / 4;
      jumlahSkor += +s;
      n++;
    }
    mentah += nilai;
    terisi += n;
    return {
      ...k,
      nilai: nilai * faktor,
      maks: k.bobot * faktor,
      rerata: n ? jumlahSkor / n : null,
      terisi: n,
    };
  });

  const nilaiAkhir = mentah * faktor;

  // Syarat Unggul: setiap butir Budaya Mutu, Relevansi Pendidikan, dan Relevansi Penelitian ≥ 3,00
  // dan rerata skor tiap kriteria tersebut ≥ 3,20.
  const kunci = perKriteria.filter((k) => k.syaratUnggul);
  const butirGagal = kunci.flatMap((k) =>
    k.butir.filter((b) => !(skor[b.no] >= MIN_BUTIR)).map((b) => ({ ...b, skor: skor[b.no] ?? null, kriteriaNama: k.nama })),
  );
  const kriteriaGagal = kunci.filter((k) => !(k.rerata >= MIN_RERATA) || k.terisi < k.butir.length);
  const syaratUnggul = butirGagal.length === 0 && kriteriaGagal.length === 0;

  let status;
  if (nilaiAkhir < AMBANG.terakreditasi) status = { kode: 'tidak', label: 'Tidak Terakreditasi' };
  else if (nilaiAkhir < AMBANG.unggul || !syaratUnggul) status = { kode: 'terakreditasi', label: 'Terakreditasi' };
  else if (nilaiAkhir < AMBANG.unggul5) status = { kode: 'unggul3', label: 'Unggul (berlaku tiga tahun)' };
  else status = { kode: 'unggul5', label: 'Unggul (berlaku lima tahun)' };

  // Butir dengan potensi kenaikan nilai terbesar bila dinaikkan ke skor 4.
  const potensi = jenjang.butir
    .map((b) => ({ ...b, skor: skor[b.no] ?? 0, gain: ((b.bobot * (4 - (skor[b.no] ?? 0))) / 4) * faktor }))
    .filter((b) => b.gain > 0)
    .sort((a, b) => b.gain - a.gain)
    .slice(0, 8);

  return {
    nilaiAkhir,
    maks: jenjang.totalBobot * faktor,
    terisi,
    total: jenjang.butir.length,
    perKriteria,
    syaratUnggul,
    butirGagal,
    kriteriaGagal,
    status,
    potensi,
  };
}
