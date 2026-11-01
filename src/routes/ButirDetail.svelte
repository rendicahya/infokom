<script>
  import Md from '../lib/Md.svelte';
  import AlurRail from '../lib/AlurRail.svelte';
  import { fmt } from '../lib/data.js';
  import { JENIS, TAHAP } from '../lib/parse.js';
  import { getNarasi } from '../lib/narasi.js';
  import { kesinambungan } from '../lib/alur.js';
  import { sorot, saudara } from '../lib/sorot.js';
  import { rahasia, narasiInternal } from '../lib/rahasia.svelte.js';

  let { jenjang, butir } = $props();

  let persen = $derived((butir.bobot / jenjang.totalBobot) * 100);
  // Contoh narasi hanya tampil setelah password dimasukkan; data internal didahulukan, ilustrasi sebagai cadangan
  let terbuka = $derived(!!rahasia.data);
  let internal = $derived(terbuka ? narasiInternal(jenjang, butir) : null);
  let narasi = $derived(terbuka ? internal ?? getNarasi(jenjang, butir) : null);
  let kriteriaNama = $derived(jenjang.kriteria.find((k) => k.id === butir.kriteria)?.nama);
  // Butir berhuruf sama di tahap PPEPP lain, untuk menyorot bagian kalimat yang sama
  let sdr = $derived(saudara(jenjang.butir, butir));
  let bidang = $state(0);
  let copied = $state(false);

  const LEVEL = [
    { s: 4, label: 'Sangat Baik' },
    { s: 3, label: 'Baik' },
    { s: 2, label: 'Cukup' },
    { s: 1, label: 'Kurang' },
  ];

  async function salin() {
    await navigator.clipboard.writeText(narasi);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }
</script>

<article>
  <div class="head">
    <div>
      <div class="label">
        {kriteriaNama}
        {#if butir.tahapNo}<span class="tahap" style="--c: var(--t{butir.tahapNo})">{TAHAP[butir.tahapNo - 1]}</span>{/if}
      </div>
      <h2>{butir.kode}</h2>
      <span class="jenis {butir.jenis}">{JENIS[butir.jenis]}</span>
    </div>
    <dl class="weight">
      <div><dt>Bobot</dt><dd class="big">{fmt(butir.bobot)}</dd></div>
      <div><dt>Porsi</dt><dd>{fmt(persen, 1)}%</dd></div>
      <div><dt>Skor 4 / 3</dt><dd>+{fmt(butir.bobot)} / +{fmt(butir.bobot * 0.75)}</dd></div>
    </dl>
  </div>

  {#if butir.alur}
    <section class="alur">
      <div class="label">Alur PPEPP {butir.alur.label} · {butir.alur.judul} · bobot alur {fmt(butir.alur.bobot)}</div>
      <AlurRail {jenjang} alur={butir.alur} current={butir.no} />
      <div class="sambung"><Md text={kesinambungan(jenjang.id, butir)} /></div>
    </section>
  {/if}

  <section>
    <h3>Elemen penilaian</h3>
    <Md text={sorot(butir.elemen, sdr.map((x) => x.elemen), butir.huruf, true)} />
  </section>

  {#if butir.panduan}
    <section class="panduan">
      <h3>Apa yang harus ditulis di LED</h3>
      <div class="muted small">{butir.panduan.judul}</div>
      {#if butir.panduan.suplemen}
        <Md text={butir.panduan.intro} />
        {#if butir.panduan.suplemen.length > 1}
          <label class="small">Bidang PS:
            <select bind:value={bidang}>
              {#each butir.panduan.suplemen as s, i}<option value={i}>{s.nama}</option>{/each}
            </select>
          </label>
        {/if}
        {@const s = butir.panduan.suplemen[bidang] || butir.panduan.suplemen[0]}
        {#if s}
          <div class="focus"><b>{s.item.judul}</b><Md text={s.item.isi} /></div>
        {/if}
      {:else}
        {#if butir.panduan.item}
          <div class="focus"><Md text={`**${butir.huruf}.** ${sorot(butir.panduan.item, sdr.map((x) => x.panduan?.item), butir.huruf, true)}`} /></div>
        {/if}
        <Md text={butir.panduan.intro} />
      {/if}
    </section>
  {/if}

  {#if butir.deskriptor}
    <section>
      <h3>Deskriptor</h3>
      <Md text={sorot(butir.deskriptor, sdr.map((x) => x.deskriptor), butir.huruf, true)} />
    </section>
  {/if}

  {#if butir.syaratUnggul}
    <div class="unggul"><span class="label">Syarat Unggul · minimal skor 3,00</span><p>{butir.syaratUnggul}</p></div>
  {/if}

  {#if narasi}
    <section class="narasi">
      <div class="nh">
        <h3>Contoh narasi</h3>
        <button class="btn small no-print" onclick={salin}>{copied ? 'Tersalin' : 'Salin teks'}</button>
      </div>
      {#if internal}
        <p class="muted small">Berisi data internal. Jangan disebarkan di luar pihak yang berwenang.</p>
      {:else}
        <p class="muted small">
          Ilustrasi untuk {jenjang.konteks.ps} FILKOM UB. Angka, nomor dokumen, dan nama mitra bersifat ilustratif, bukan data
          resmi; ganti dengan data PS dan pastikan konsisten dengan LKPS.
        </p>
      {/if}
      <div class="ntext"><Md text={narasi} /></div>
    </section>
  {:else if !terbuka}
    <p class="muted small terkunci no-print">Contoh narasi tersedia setelah memasukkan password melalui tombol gembok di kanan atas.</p>
  {/if}

  <section>
    <h3>Rubrik skor</h3>
    {#if butir.tanpaRubrik}
      <p class="muted">
        Matriks Penilaian tidak memuat rubrik untuk butir Suplemen ini; bobotnya diambil dari Rekap Hasil Hitung. Gunakan skala
        umum: 4 = sangat lengkap dan sangat relevan, 3 = lengkap, 2 = cukup, 1 = kurang.
      </p>
    {:else}
      <div class="rubrik">
        {#each LEVEL as l}
          <div class="lvl s{l.s}">
            <div class="lh"><span class="sk">{l.s}</span> {l.label}</div>
            <Md text={butir.rubrik[l.s]} />
          </div>
        {/each}
      </div>
    {/if}
  </section>
</article>

<style>
  section { margin-top: 28px; }
  h3 { border-bottom: 1px solid var(--border); padding-bottom: 4px; }
  .head { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
  .head .label { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .tahap {
    color: var(--c); background: color-mix(in srgb, var(--c) 12%, transparent);
    padding: 1px 9px; border-radius: 999px; font-weight: 600; font-size: 0.78rem;
  }
  .head h2 { font-size: 2.3rem; font-weight: 700; margin: 6px 0 4px; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
  .weight { display: flex; gap: 26px; margin: 0; align-items: flex-end; }
  .weight dt { font-size: 0.78rem; color: var(--muted); }
  .weight dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
  .weight .big { font-size: 2.1rem; font-weight: 700; line-height: 1.1; color: var(--accent); }
  .alur { margin-top: 22px; padding: 16px 18px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .alur .label { margin-bottom: 12px; }
  .sambung { margin-top: 12px; padding-top: 10px; border-top: 1px dashed var(--border); font-size: 0.92rem; }
  .panduan { border-left: 3px solid var(--accent); padding: 2px 0 2px 16px; }
  .panduan h3 { border: 0; margin-bottom: 0; }
  .focus { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 12px; margin: 10px 0; }
  .unggul { margin-top: 24px; padding: 10px 14px; border: 1px solid var(--ok); border-radius: var(--radius); }
  .unggul .label { color: var(--ok); }
  .unggul p { margin: 4px 0 0; }
  /* Garis antarsel dibentuk oleh gap 1px di atas latar warna border */
  .rubrik {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; overflow: hidden;
    background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-lg);
  }
  .lvl { padding: 12px 16px; font-size: 0.9rem; background: var(--surface); }
  .lh { margin-bottom: 6px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .sk { width: 26px; height: 26px; display: grid; place-items: center; border-radius: var(--radius); font-weight: 700; color: var(--surface) !important; background: var(--c); }
  .s4 { --c: var(--ok); } .s3 { --c: var(--i); } .s2 { --c: var(--p); } .s1 { --c: var(--danger); }
  .s4 .sk { color: var(--ok); }
  .s3 .sk { color: var(--i); }
  .s2 .sk { color: var(--p); }
  .s1 .sk { color: var(--danger); }
  .narasi .nh { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); margin-bottom: 6px; }
  .narasi .nh h3 { border: 0; margin: 0; }
  /* Contoh narasi diset seperti dokumen LED: serif bacaan, baris lebih lega */
  .ntext {
    font-family: var(--read); font-size: 0.98rem; line-height: 1.75; max-width: 72ch;
    padding: 18px 22px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg);
  }
  select { padding: 3px 8px; margin-left: 6px; }
  .terkunci { margin-top: 28px; padding: 10px 14px; border: 1px dashed var(--border-strong); border-radius: var(--radius); }
  @media (max-width: 600px) {
    section { margin-top: 24px; }
    .rubrik { grid-template-columns: 1fr; }
    .head { gap: 12px; padding-bottom: 14px; }
    .head h2 { font-size: 2rem; }
    .weight { gap: 20px; width: 100%; }
    .weight .big { font-size: 1.7rem; }
    .alur { padding: 14px 14px 12px; margin-left: -4px; margin-right: -4px; }
    .panduan { padding-left: 12px; }
    .ntext { padding: 14px 16px; font-size: 0.95rem; line-height: 1.7; }
    .lvl { padding: 12px 14px; }
    .narasi .nh { gap: 8px; }
  }
</style>
