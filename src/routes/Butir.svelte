<script>
  import { href } from '../lib/router.svelte.js';
  import { fmt } from '../lib/data.js';
  import { TAHAP } from '../lib/parse.js';
  import ButirDetail from './ButirDetail.svelte';

  let { jenjang, selected } = $props();

  let q = $state('');
  let jenis = $state('');
  let tahap = $state('');

  const cocok = (b) => {
    if (jenis && b.jenis !== jenis) return false;
    if (tahap && b.tahapNo !== +tahap) return false;
    if (q) {
      const s = q.toLowerCase();
      return (b.kode + ' ' + b.elemen + ' ' + b.deskriptor).toLowerCase().includes(s);
    }
    return true;
  };

  let groups = $derived(jenjang.kriteria.map((k) => ({ ...k, list: k.butir.filter(cocok) })).filter((k) => k.list.length));
  let current = $derived(jenjang.butir.find((b) => b.no === selected) || null);
  let idx = $derived(current ? jenjang.butir.indexOf(current) : -1);

  const ringkas = (b) => b.elemen.replace(/^\d\.\d\.?\s*\[[A-Z]+\]\s*/, '').replace(/^[A-D]\.\s*/, '').replace(/^\d\.\d\s*/, '');
</script>

<div class="layout" class:has-detail={!!current}>
  <aside class="list no-print">
    <div class="filters">
      <input type="search" placeholder="Cari butir…" bind:value={q} />
      <div class="row">
        <select bind:value={jenis} aria-label="Jenis">
          <option value="">Semua jenis</option>
          <option value="I">Input</option>
          <option value="P">Proses</option>
          <option value="O">Output</option>
        </select>
        <select bind:value={tahap} aria-label="Tahap PPEPP">
          <option value="">Semua tahap</option>
          {#each TAHAP as t, i}<option value={i + 1}>{t}</option>{/each}
        </select>
      </div>
    </div>
    {#each groups as k}
      <div class="group">
        <div class="ghead"><span>{k.nama}</span><span class="muted small">{fmt(k.bobot)}</span></div>
        {#each k.list as b}
          <a class="item" class:active={b.no === selected} href={href(jenjang.id, 'butir', b.no)}>
            <span class="kode">{b.kode}</span>
            <span class="txt">{ringkas(b)}</span>
            <span class="meta"><span class="chip {b.jenis}">{b.jenis}</span><b>{fmt(b.bobot)}</b></span>
          </a>
        {/each}
      </div>
    {:else}
      <p class="muted small">Tidak ada butir yang cocok.</p>
    {/each}
  </aside>

  <section class="detail">
    {#if current}
      <a class="back no-print" href={href(jenjang.id, 'butir')}>← Daftar butir</a>
      <ButirDetail {jenjang} butir={current} />
      <div class="pager no-print">
        {#if idx > 0}
          <a class="btn" href={href(jenjang.id, 'butir', jenjang.butir[idx - 1].no)}>← {jenjang.butir[idx - 1].kode}</a>
        {:else}<span></span>{/if}
        {#if idx < jenjang.butir.length - 1}
          <a class="btn" href={href(jenjang.id, 'butir', jenjang.butir[idx + 1].no)}>{jenjang.butir[idx + 1].kode} →</a>
        {/if}
      </div>
    {:else}
      <div class="card intro">
        <h2>Butir Penilaian {jenjang.nama}</h2>
        <p>
          {jenjang.butir.length} butir dengan total bobot <b>{fmt(jenjang.totalBobot)}</b>. Pilih butir di daftar untuk melihat
          panduan penulisan LED, rubrik skor, syarat Unggul, dan contoh narasi.
        </p>
        <div class="legend">
          <span><span class="chip I">I</span> Input — sumber daya & kebijakan (Penetapan)</span>
          <span><span class="chip P">P</span> Proses — pelaksanaan & pengendalian</span>
          <span><span class="chip O">O</span> Output — hasil, evaluasi & peningkatan</span>
        </div>
        <h3>Butir dengan bobot terbesar</h3>
        <ol class="top">
          {#each [...jenjang.butir].sort((a, b) => b.bobot - a.bobot).slice(0, 5) as b}
            <li><a href={href(jenjang.id, 'butir', b.no)}>{b.kode}</a> — {ringkas(b).slice(0, 90)}… <b>({fmt(b.bobot)})</b></li>
          {/each}
        </ol>
      </div>
    {/if}
  </section>
</div>

<style>
  .layout { display: grid; grid-template-columns: 340px 1fr; gap: 20px; align-items: start; }
  .list {
    position: sticky; top: 112px; max-height: calc(100vh - 130px); overflow-y: auto;
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  }
  .filters { position: sticky; top: 0; background: var(--surface); padding: 12px; border-bottom: 1px solid var(--border); z-index: 1; }
  .filters input, .filters select {
    width: 100%; padding: 7px 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface-2);
  }
  .row { display: flex; gap: 6px; margin-top: 6px; }
  .ghead {
    display: flex; justify-content: space-between; padding: 10px 12px 4px; font-weight: 700; font-size: 0.82rem;
    text-transform: uppercase; letter-spacing: 0.03em; color: var(--muted);
  }
  .item {
    display: grid; grid-template-columns: 46px 1fr auto; gap: 8px; align-items: start;
    padding: 8px 12px; color: var(--text); font-size: 0.86rem; border-left: 3px solid transparent;
  }
  .item:hover { background: var(--surface-2); text-decoration: none; }
  .item.active { background: var(--accent-soft); border-left-color: var(--accent); }
  .kode { font-weight: 700; color: var(--accent); white-space: nowrap; }
  .txt { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .meta { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
  .back { display: none; margin-bottom: 12px; }
  .pager { display: flex; justify-content: space-between; margin-top: 16px; }
  .legend { display: flex; flex-direction: column; gap: 6px; margin: 12px 0 20px; }
  .top li { margin: 4px 0; }
  @media (max-width: 860px) {
    .layout { grid-template-columns: 1fr; }
    .list { position: static; max-height: none; }
    .layout.has-detail .list { display: none; }
    .layout:not(.has-detail) .detail { display: none; }
    .back { display: inline-block; }
  }
</style>
