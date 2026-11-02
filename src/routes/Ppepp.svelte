<script>
  import { href } from '../lib/router.svelte.js';
  import { JENJANG } from '../lib/data.js';

  // Satu tahap = analogi pelari (Rizal) + padanannya di program studi + yang perlu ditunjukkan di LED
  const TAHAP = [
    {
      nama: 'Penetapan',
      inti: 'Menetapkan standar: target yang terukur.',
      rizal: 'Rizal ingin ikut maraton. Ia menetapkan target: berlari dengan <b>pace 6 menit/km</b>. Target ini jelas dan bisa diukur, bukan sekadar “ingin lari lebih cepat”.',
      prodi: 'Program studi menetapkan standar beserta indikator dan targetnya, misalnya “persentase lulusan tepat waktu minimal <b>60%</b>”. Standar disahkan dalam dokumen resmi.',
      led: 'Dokumen kebijakan dan standar, indikator yang terukur, target, dan dasar penetapannya.',
    },
    {
      nama: 'Pelaksanaan',
      inti: 'Menjalankan kegiatan untuk mencapai standar.',
      rizal: 'Rizal berlatih sesuai rencana: lari rutin beberapa kali seminggu, latihan interval, dan lari jarak jauh di akhir pekan.',
      prodi: 'Program studi menjalankan kegiatan untuk mencapai standar: pembimbingan akademik, pemantauan studi, dan pendampingan tugas akhir.',
      led: 'Kegiatan nyata yang dijalankan, siapa pelaksananya, kapan, dan bukti pelaksanaannya.',
    },
    {
      nama: 'Evaluasi',
      inti: 'Membandingkan capaian dengan target.',
      rizal: 'Rizal mengukur hasil latihannya: ternyata ia mencapai <b>pace 5 menit/km</b>. Hasil ini lebih cepat dari target 6 menit/km, jadi targetnya terlampaui.',
      prodi: 'Program studi mengukur capaian dan membandingkannya dengan target, misalnya lulusan tepat waktu mencapai <b>72%</b>, di atas target 60%.',
      led: 'Data capaian beserta target pembandingnya, analisis tercapai atau tidak, dan penyebabnya.',
    },
    {
      nama: 'Pengendalian',
      inti: 'Menindaklanjuti hasil evaluasi.',
      rizal: 'Berdasarkan hasil evaluasi, Rizal mengambil tindakan: ia <b>membeli sepatu lari baru</b> agar capaiannya terjaga dan risiko cedera berkurang menjelang lomba.',
      prodi: 'Program studi menindaklanjuti hasil evaluasi: tindakan koreksi bila target tidak tercapai, atau tindakan untuk menjaga capaian bila target tercapai.',
      led: 'Tindak lanjut yang jelas terkait dengan temuan evaluasi, beserta bukti pelaksanaannya.',
    },
    {
      nama: 'Peningkatan',
      inti: 'Menaikkan standar untuk siklus berikutnya.',
      rizal: 'Karena target lama terlampaui, Rizal <b>meningkatkan targetnya menjadi pace 5,5 menit/km</b>. Target baru ini lebih tinggi dari target lama dan menjadi titik awal siklus berikutnya.',
      prodi: 'Program studi menaikkan standar, misalnya target lulusan tepat waktu dinaikkan dari 60% menjadi 70%. Standar baru ini ditetapkan dan siklus dimulai lagi.',
      led: 'Standar yang dinaikkan (lebih tinggi atau lebih luas), alasannya, dan dokumen penetapan standar barunya.',
    },
  ];

  const KELIRU = [
    ['Target tidak terukur', 'Penetapan berisi niat (“meningkatkan kualitas lulusan”) tanpa indikator dan angka target, sehingga tidak bisa dievaluasi.'],
    ['Evaluasi tanpa pembanding', 'Menyajikan data capaian tanpa membandingkannya dengan target yang ditetapkan.'],
    ['Pengendalian lepas dari evaluasi', 'Menulis kegiatan perbaikan yang tidak berasal dari temuan evaluasi.'],
    ['Peningkatan hanya mengulang', 'Menulis “melanjutkan kegiatan” atau sekadar menambah kegiatan, padahal yang ditingkatkan adalah standarnya.'],
  ];
</script>

<div class="label">Panduan umum · berlaku untuk semua jenjang</div>
<h1>Memahami siklus PPEPP</h1>
<p class="lead">
  PPEPP adalah siklus sistem penjaminan mutu internal: <b>Penetapan, Pelaksanaan, Evaluasi, Pengendalian,</b> dan
  <b>Peningkatan</b> standar. Instrumen LED LAM INFOKOM menilai setiap kriteria mengikuti kelima tahap ini, jadi narasi LED
  perlu menunjukkan siklus yang utuh dan saling terhubung.
</p>

<ol class="siklus" aria-label="Urutan tahap PPEPP">
  {#each TAHAP as t, i}
    <li style="--c: var(--t{i + 1})"><span class="n">{i + 1}</span>{t.nama}</li>
  {/each}
  <li class="ulang">kembali ke Penetapan dengan standar yang lebih tinggi</li>
</ol>

<h2>Analogi: Rizal si pelari</h2>
<p class="muted">
  Bayangkan seorang pelari bernama Rizal yang sedang bersiap untuk maraton. Pace adalah waktu tempuh per kilometer, jadi
  angka yang lebih kecil berarti lebih cepat.
</p>

<div class="tahapan">
  {#each TAHAP as t, i}
    <section class="tahap" style="--c: var(--t{i + 1})">
      <header>
        <span class="n">{i + 1}</span>
        <div>
          <h3>{t.nama}</h3>
          <div class="inti">{t.inti}</div>
        </div>
      </header>
      <div class="isi">
        <div class="kol rizal">
          <div class="sub">Rizal</div>
          <p>{@html t.rizal}</p>
        </div>
        <div class="kol">
          <div class="sub">Di program studi <span class="muted">(ilustrasi)</span></div>
          <p>{@html t.prodi}</p>
        </div>
      </div>
      <div class="led"><b>Di LED, tunjukkan:</b> {t.led}</div>
    </section>
  {/each}
</div>

<div class="card ringkas">
  <h2>Ringkasan</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Tahap</th><th>Rizal</th><th>Pertanyaan kunci</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="--c: var(--t1)"></span>Penetapan</td><td>Target pace 6 menit/km</td><td>Apa standarnya, dan berapa targetnya?</td></tr>
        <tr><td><span class="dot" style="--c: var(--t2)"></span>Pelaksanaan</td><td>Berlatih rutin</td><td>Apa yang dikerjakan untuk mencapainya?</td></tr>
        <tr><td><span class="dot" style="--c: var(--t3)"></span>Evaluasi</td><td>Tercapai pace 5 menit/km</td><td>Berapa capaiannya dibandingkan target?</td></tr>
        <tr><td><span class="dot" style="--c: var(--t4)"></span>Pengendalian</td><td>Membeli sepatu baru</td><td>Apa tindak lanjut atas hasil evaluasi?</td></tr>
        <tr><td><span class="dot" style="--c: var(--t5)"></span>Peningkatan</td><td>Target baru pace 5,5 menit/km</td><td>Standar apa yang dinaikkan untuk siklus berikutnya?</td></tr>
      </tbody>
    </table>
  </div>
</div>

<h2>Kesalahan yang sering terjadi</h2>
<dl class="keliru">
  {#each KELIRU as [j, d]}
    <div><dt>{j}</dt><dd>{d}</dd></div>
  {/each}
</dl>

<div class="card lanjut">
  <h2>PPEPP di instrumen ini</h2>
  <p>
    Pada kriteria 1–6, butir dikelompokkan per tahap PPEPP. Butir berhuruf sama di kelima tahap (misalnya A di Penetapan
    sampai A di Peningkatan) membentuk satu <b>alur</b> tentang topik yang sama, seperti perjalanan Rizal dari target
    sampai target baru. Narasi untuk satu alur sebaiknya saling merujuk: target di Penetapan dievaluasi di Evaluasi,
    temuannya ditindaklanjuti di Pengendalian, dan menjadi dasar standar baru di Peningkatan.
  </p>
  <div class="jj">
    {#each JENJANG as j}
      <div class="baris">
        <b>{j.nama}</b>
        <a class="btn" href={href(j.id, 'butir')}>Butir per alur</a>
        <a class="btn" href={href(j.id, 'panduan')}>Panduan LED</a>
      </div>
    {/each}
  </div>
</div>

<style>
  h1 { margin-bottom: 0.4em; }
  h2 { font-size: 1.3rem; margin-top: 36px; }
  .card h2 { margin-top: 0; }
  .lead { max-width: 72ch; font-size: 1rem; }

  /* Urutan tahap sebagai rangkaian chip berpanah */
  .siklus { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 4px; list-style: none; padding: 0; margin: 20px 0 0; }
  .siklus li { display: inline-flex; align-items: center; gap: 7px; padding: 5px 12px 5px 6px; border-radius: 999px; font-weight: 600; font-size: 0.88rem; background: color-mix(in srgb, var(--c) 12%, var(--surface)); color: var(--text); border: 1px solid color-mix(in srgb, var(--c) 35%, transparent); }
  .siklus li:not(.ulang)::after { content: '→'; margin-left: 8px; margin-right: -4px; color: var(--muted); font-weight: 400; }
  .siklus li:nth-last-child(2)::after { content: '↺'; }
  .siklus .ulang { background: none; border: 0; padding: 5px 4px; font-weight: 500; color: var(--muted); }
  .n { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: var(--c); color: var(--surface); font-size: 0.76rem; font-weight: 700; flex: none; }

  .tahapan { display: grid; gap: 14px; margin-top: 16px; }
  .tahap { background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--c); border-radius: var(--radius-lg); padding: 18px 20px; }
  .tahap header { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }
  .tahap header .n { width: 28px; height: 28px; font-size: 0.9rem; margin-top: 1px; }
  .tahap h3 { margin: 0; color: var(--c); }
  .inti { color: var(--muted); font-size: 0.9rem; }
  .isi { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; }
  .kol p { margin: 0; }
  .sub { font-size: 0.78rem; font-weight: 700; color: var(--muted); margin-bottom: 3px; }
  .rizal p { font-family: var(--read); font-size: 1rem; }
  .led { margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border); font-size: 0.88rem; }

  .ringkas { margin-top: 28px; }
  .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--c); margin-right: 8px; vertical-align: 1px; }

  .keliru { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 12px; margin: 12px 0 0; }
  .keliru div { border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 14px 16px; background: var(--surface); }
  .keliru dt { font-weight: 700; margin-bottom: 4px; }
  .keliru dd { margin: 0; color: var(--muted); font-size: 0.9rem; }

  .lanjut { margin-top: 36px; }
  .lanjut p { max-width: 80ch; }
  .jj { display: grid; gap: 8px; }
  .baris { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .baris b { min-width: 90px; }

  @media (max-width: 640px) {
    .isi { grid-template-columns: 1fr; }
    .tahap { padding: 16px; }
    .siklus .ulang { flex-basis: 100%; }
  }
</style>
