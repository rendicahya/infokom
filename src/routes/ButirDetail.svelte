<script>
  import Md from '../lib/Md.svelte';
  import AlurRail from '../lib/AlurRail.svelte';
  import { fmt } from '../lib/data.js';
  import { JENIS, TAHAP } from '../lib/parse.js';
  import { getNarasi } from '../lib/narasi.js';
  import { kesinambungan } from '../lib/alur.js';

  let { jenjang, butir } = $props();

  let persen = $derived((butir.bobot / jenjang.totalBobot) * 100);
  let narasi = $derived(getNarasi(jenjang, butir));
  let kriteriaNama = $derived(jenjang.kriteria.find((k) => k.id === butir.kriteria)?.nama);
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
      <div class="label">{kriteriaNama}{butir.tahapNo ? ` · ${TAHAP[butir.tahapNo - 1]}` : ''} · butir {butir.no}</div>
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
    <Md text={butir.elemen} />
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
          <div class="focus"><Md text={`**${butir.huruf}.** ${butir.panduan.item}`} /></div>
        {/if}
        <Md text={butir.panduan.intro} />
      {/if}
    </section>
  {/if}

  {#if butir.deskriptor}
    <section>
      <h3>Deskriptor</h3>
      <Md text={butir.deskriptor} />
    </section>
  {/if}

  {#if butir.syaratUnggul}
    <div class="unggul"><span class="label">Syarat Unggul · minimal skor 3,00</span><p>{butir.syaratUnggul}</p></div>
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

  {#if narasi}
    <section class="narasi">
      <div class="nh">
        <h3>Contoh narasi</h3>
        <button class="btn small no-print" onclick={salin}>{copied ? 'Tersalin' : 'Salin teks'}</button>
      </div>
      <p class="muted small">
        Ilustrasi untuk {jenjang.konteks.ps} FILKOM UB. Angka, nomor dokumen, dan nama mitra bersifat ilustratif, bukan data
        resmi; ganti dengan data PS dan pastikan konsisten dengan LKPS.
      </p>
      <div class="ntext"><Md text={narasi} /></div>
    </section>
  {/if}
</article>

<style>
  section { margin-top: 28px; }
  h3 { border-bottom: 1px solid var(--border); padding-bottom: 4px; }
  .head { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding-bottom: 16px; border-bottom: 1px solid var(--text); }
  .head h2 { font-family: var(--mono); font-size: 2.1rem; font-weight: 600; margin: 4px 0 2px; letter-spacing: -0.02em; }
  .weight { display: flex; gap: 22px; margin: 0; align-items: flex-end; }
  .weight dt { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
  .weight dd { margin: 0; font-variant-numeric: tabular-nums; }
  .weight .big { font-family: var(--serif); font-size: 2rem; font-weight: 700; line-height: 1.1; }
  .alur { margin-top: 20px; padding: 14px 16px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); }
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
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
    background: var(--border); border: 1px solid var(--border); border-radius: var(--radius);
  }
  .lvl { padding: 10px 14px; font-size: 0.9rem; background: var(--surface); }
  .lh { margin-bottom: 6px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .sk { font-family: var(--mono); width: 24px; height: 24px; display: grid; place-items: center; border: 1px solid currentColor; }
  .s4 .sk { color: var(--ok); }
  .s3 .sk { color: var(--i); }
  .s2 .sk { color: var(--p); }
  .s1 .sk { color: var(--danger); }
  .narasi .nh { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); margin-bottom: 6px; }
  .narasi .nh h3 { border: 0; margin: 0; }
  .ntext { font-family: var(--serif); font-size: 1.02rem; line-height: 1.65; padding: 4px 0 0 16px; border-left: 1px solid var(--border); }
  select { padding: 3px 8px; margin-left: 6px; }
  @media (max-width: 600px) { .rubrik { grid-template-columns: 1fr; } }
</style>
