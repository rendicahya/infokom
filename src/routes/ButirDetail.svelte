<script>
  import Md from '../lib/Md.svelte';
  import { fmt } from '../lib/data.js';
  import { JENIS, TAHAP } from '../lib/parse.js';
  import { getNarasi } from '../lib/narasi.js';

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

<article class="card">
  <div class="head">
    <div>
      <div class="muted small">{kriteriaNama}{butir.tahapNo ? ` · ${TAHAP[butir.tahapNo - 1]}` : ''} · Butir {butir.no}</div>
      <h2>{butir.kode}</h2>
    </div>
    <div class="weight">
      <span class="chip {butir.jenis}">{JENIS[butir.jenis]}</span>
      <div class="big">{fmt(butir.bobot)}</div>
      <div class="muted small">bobot · {fmt(persen, 1)}% dari {fmt(jenjang.totalBobot)}</div>
      <div class="muted small">skor 4 = +{fmt(butir.bobot)}, skor 3 = +{fmt(butir.bobot * 0.75)}</div>
    </div>
  </div>

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
          <div class="focus"><b>{butir.huruf}.</b> <Md text={butir.panduan.item} /></div>
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
    <div class="unggul"><b>Syarat Unggul (minimal skor 3,00):</b> {butir.syaratUnggul}</div>
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
            <div class="lh"><b>{l.s}</b> {l.label}</div>
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
        <button class="btn small no-print" onclick={salin}>{copied ? 'Tersalin ✓' : 'Salin'}</button>
      </div>
      <p class="muted small">
        Ilustrasi untuk {jenjang.konteks.ps} di institusi fiktif (FIK-UN). Ganti semua angka, nomor dokumen, dan nama dengan
        data PS Anda; pastikan konsisten dengan LKPS.
      </p>
      <div class="ntext"><Md text={narasi} /></div>
    </section>
  {/if}
</article>

<style>
  section { margin-top: 22px; }
  .head { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .head h2 { font-size: 1.8rem; margin: 2px 0 0; }
  .weight { text-align: right; }
  .big { font-size: 2rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
  .panduan { background: var(--accent-soft); border-radius: 10px; padding: 14px 16px; }
  .panduan h3 { margin-bottom: 2px; }
  .focus { background: var(--surface); border-radius: 8px; padding: 10px 12px; margin: 10px 0; }
  .focus :global(.prose) { display: inline; }
  .unggul { margin-top: 18px; padding: 10px 14px; border-left: 4px solid var(--ok); background: var(--o-soft); border-radius: 6px; }
  .rubrik { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
  .lvl { border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; font-size: 0.9rem; }
  .lvl.s4 { border-top: 4px solid var(--ok); }
  .lvl.s3 { border-top: 4px solid var(--i); }
  .lvl.s2 { border-top: 4px solid var(--p); }
  .lvl.s1 { border-top: 4px solid var(--danger); }
  .lh { margin-bottom: 6px; }
  .lh b { font-size: 1.2rem; margin-right: 4px; }
  .narasi .nh { display: flex; justify-content: space-between; align-items: center; }
  .ntext { border: 1px dashed var(--border); border-radius: 10px; padding: 14px 16px; background: var(--surface-2); }
  select { padding: 4px 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); margin-left: 6px; }
</style>
