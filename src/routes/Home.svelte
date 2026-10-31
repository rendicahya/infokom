<script>
  import { JENJANG, fmt } from '../lib/data.js';
  import { href } from '../lib/router.svelte.js';
  import AlurMatrix from '../lib/AlurMatrix.svelte';

  const contoh = JENJANG[0];
  const k2 = contoh.kriteria.find((k) => k.id === 'k2');
</script>

<header class="intro">
  <div class="label">LAM INFOKOM · Instrumen Akreditasi 2.1 (2025)</div>
  <h1>Panduan Laporan Evaluasi Diri</h1>
  <p>
    Ringkasan Instrumen LED dan Matriks Penilaian untuk program Sarjana, Magister, dan Doktor. Setiap butir dilengkapi bobot,
    panduan penulisan, rubrik skor, syarat Unggul, posisinya dalam siklus PPEPP, dan contoh narasi.
  </p>
</header>

<div class="table-wrap">
  <table class="jj">
    <thead>
      <tr><th>Jenjang</th><th class="num">Butir</th><th class="num">Total bobot</th><th>Suplemen</th><th></th></tr>
    </thead>
    <tbody>
      {#each JENJANG as j}
        <tr>
          <td><a class="nama" href={href(j.id, 'butir')}>{j.nama}</a></td>
          <td class="num">{j.butir.length}</td>
          <td class="num">{fmt(j.totalBobot)}</td>
          <td class="muted">{j.kriteria.some((k) => k.id === 'suplemen') ? 'Ada' : 'Tidak ada'}</td>
          <td>
            <div class="go">
              <a href={href(j.id, 'butir')}>Butir</a>
              <a href={href(j.id, 'panduan')}>Panduan</a>
              <a href={href(j.id, 'kalkulator')}>Kalkulator</a>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="cols">
  <section>
    <h2>Struktur LED</h2>
    <dl>
      <dt>A–B</dt>
      <dd><b>Kondisi eksternal dan profil UPPS.</b> Analisis lingkungan makro/mikro dan profil ringkas.</dd>
      <dt>C.1–C.6</dt>
      <dd>
        <b>Enam kriteria:</b> Budaya Mutu, Relevansi Pendidikan, Relevansi Penelitian, Relevansi PkM, Akuntabilitas, dan
        Diferensiasi Misi. Semuanya ditulis mengikuti siklus PPEPP.
      </dd>
      <dt>D</dt>
      <dd><b>Suplemen program studi</b> (Sarjana dan Magister): muatan kurikulum khas bidang.</dd>
    </dl>
  </section>

  <section>
    <h2>Nilai akhir</h2>
    <p class="formula">NA = Σ (bobot × skor) ÷ 4</p>
    <p>
      Terakreditasi bila NA ≥ 200. Unggul bila NA ≥ 321 <i>dan</i> setiap butir Budaya Mutu, Relevansi Pendidikan, dan Relevansi
      Penelitian ≥ 3,00 dengan rerata tiap kriteria tersebut ≥ 3,20. Unggul berlaku lima tahun bila NA ≥ 361.
    </p>
  </section>
</div>

<section class="ppepp">
  <h2>Siklus PPEPP: membaca butir sebagai satu alur</h2>
  <p>
    Butir dalam satu kriteria bukan daftar lepas. Butir berhuruf sama membentuk satu siklus penjaminan mutu: standar yang
    <b>ditetapkan</b> di 2.1 A <b>dilaksanakan</b> di 2.2 A, <b>dievaluasi</b> di 2.3 A, <b>dikendalikan</b> (ditindaklanjuti)
    di 2.4 A, lalu <b>ditingkatkan</b> di 2.5 A. Peningkatan itu menjadi penetapan baru untuk siklus berikutnya.
  </p>
  <p>
    Konsekuensinya, narasi tiap butir harus merujuk butir sebelumnya. Indikator yang dievaluasi harus sama dengan yang
    ditetapkan, dan tindak lanjut harus menjawab temuan evaluasi.
  </p>
  <div class="label">Contoh: Kriteria 2 Relevansi Pendidikan ({contoh.nama})</div>
  <AlurMatrix jenjang={contoh} alur={k2.alur} />
  <p class="muted small">Baca setiap baris dari kiri ke kanan. Klik butir untuk membuka rubrik dan contoh narasinya.</p>
</section>

<style>
  .intro { max-width: 720px; margin: 8px 0 28px; }
  .intro h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); margin: 6px 0 12px; }
  .intro p { font-size: 1.05rem; margin: 0; }
  .jj { margin-bottom: 36px; }
  .jj td { padding: 11px 10px; vertical-align: middle; }
  .nama { font-size: 1.08rem; font-weight: 700; color: var(--text); text-decoration: none; }
  .nama:hover { color: var(--accent); }
  .go { display: flex; gap: 14px; justify-content: flex-end; flex-wrap: wrap; }
  .cols { display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; margin-bottom: 36px; }
  dl { display: grid; grid-template-columns: 76px 1fr; gap: 8px 12px; margin: 0; }
  dt { font-family: var(--mono); font-size: 0.85rem; color: var(--accent); padding-top: 2px; }
  dd { margin: 0; }
  .formula { font-size: 1.1rem; font-weight: 600; border-left: 3px solid var(--accent); padding: 8px 14px; background: var(--surface); border-radius: 0 var(--radius) var(--radius) 0; }
  dt { font-weight: 700; }
  .ppepp { border-top: 1px solid var(--border-strong); padding-top: 20px; }
  .ppepp > p { max-width: 75ch; }
  .ppepp .label { margin: 18px 0 6px; }
  @media (max-width: 760px) { .cols { grid-template-columns: 1fr; gap: 20px; } }
</style>
