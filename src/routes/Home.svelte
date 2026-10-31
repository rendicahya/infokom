<script>
  import { JENJANG, fmt } from '../lib/data.js';
  import { href } from '../lib/router.svelte.js';
</script>

<section class="hero">
  <h1>Pahami LED LAM INFOKOM tanpa membaca PDF ratusan halaman</h1>
  <p class="muted">
    Setiap butir penilaian disajikan ringkas: bobot, jenis (Input/Proses/Output), panduan penulisan dari Instrumen LED,
    rubrik skor 1–4, syarat Unggul, dan contoh narasi. Hitung juga perkiraan nilai akhir dan status akreditasi.
  </p>
</section>

<div class="grid">
  {#each JENJANG as j}
    <div class="card jenjang">
      <h2>Program {j.nama}</h2>
      <div class="stats">
        <div><b>{j.butir.length}</b><span>butir</span></div>
        <div><b>{fmt(j.totalBobot)}</b><span>total bobot</span></div>
        <div><b>{j.kriteria.length}</b><span>kelompok</span></div>
      </div>
      <div class="links">
        <a class="btn primary" href={href(j.id, 'butir')}>Pelajari butir</a>
        <a class="btn" href={href(j.id, 'kalkulator')}>Kalkulator</a>
        <a class="btn" href={href(j.id, 'panduan')}>Panduan LED</a>
      </div>
    </div>
  {/each}
</div>

<section class="card how">
  <h2>Cara membaca LED dalam 1 menit</h2>
  <ol>
    <li><b>Kondisi Eksternal & Profil UPPS</b> (butir A–B): analisis lingkungan makro/mikro dan profil ringkas.</li>
    <li>
      <b>Enam kriteria</b> — Budaya Mutu, Relevansi Pendidikan, Relevansi Penelitian, Relevansi PkM, Akuntabilitas,
      Diferensiasi Misi — masing-masing ditulis mengikuti siklus <b>PPEPP</b>:
      <span class="ppepp">
        <span>Penetapan</span><span>Pelaksanaan</span><span>Evaluasi</span><span>Pengendalian</span><span>Peningkatan</span>
      </span>
    </li>
    <li><b>Suplemen Program Studi</b> (Sarjana & Magister): muatan kurikulum khas bidang.</li>
    <li>
      <b>Nilai akhir</b> = Σ(bobot × skor) ÷ 4. Unggul bila nilai ≥ 321 <i>dan</i> setiap butir Budaya Mutu, Relevansi
      Pendidikan, Relevansi Penelitian ≥ 3,00 dengan rerata tiap kriteria tersebut ≥ 3,20.
    </li>
  </ol>
</section>

<style>
  .hero { max-width: 760px; margin: 12px 0 28px; }
  .hero h1 { font-size: clamp(1.5rem, 3.5vw, 2.2rem); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stats { display: flex; gap: 20px; margin: 12px 0 18px; }
  .stats div { display: flex; flex-direction: column; }
  .stats b { font-size: 1.5rem; }
  .stats span { color: var(--muted); font-size: 0.82rem; }
  .links { display: flex; gap: 8px; flex-wrap: wrap; }
  .how ol { padding-left: 1.3em; margin: 0; }
  .how li { margin: 0.5em 0; }
  .ppepp { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .ppepp span { background: var(--accent-soft); color: var(--accent); padding: 2px 10px; border-radius: 999px; font-size: 0.82rem; }
  .ppepp span + span::before { content: '→ '; }
</style>
