<script>
  import { href } from '../lib/router.svelte.js';
  import { fmt } from '../lib/data.js';
  import { TAHAP } from '../lib/parse.js';
  import ButirDetail from './ButirDetail.svelte';

  let { jenjang, selected } = $props();

  let q = $state('');
  let jenis = $state('');
  let tahap = $state('');
  // 'tahap' = urutan dokumen (1.1 A, 1.1 B, 1.2 A, …); 'alur' = per siklus PPEPP (1.1 A → 1.5 A, lalu 1.1 B → …)
  let urut = $state('tahap');

  const cocok = (b) => {
    if (jenis && b.jenis !== jenis) return false;
    if (tahap && b.tahapNo !== +tahap) return false;
    if (q) {
      const s = q.toLowerCase();
      return (b.kode + ' ' + b.elemen + ' ' + b.deskriptor + ' ' + (b.alur?.judul || '')).toLowerCase().includes(s);
    }
    return true;
  };

  // Susunan bab mengikuti LED: A, B, lalu C. Kriteria dengan anak C.1–C.6, lalu D. Suplemen
  const bab = (k) => {
    if (k.id === 'profil')
      return k.butir.map((b) => ({
        ...k, id: `profil-${b.kode}`, nama: b.kode === 'A' ? 'A. Kondisi Eksternal' : 'B. Profil UPPS', butir: [b], alur: [], bobot: b.bobot,
      }));
    if (k.id === 'suplemen') return [{ ...k, nama: `D. ${k.nama}` }];
    return [{ ...k, nama: `C.${k.id.slice(1)} ${k.nama}`, anak: true }];
  };
  let bobotC = $derived(jenjang.kriteria.filter((k) => /^k\d$/.test(k.id)).reduce((t, k) => t + k.bobot, 0));

  let groups = $derived(
    jenjang.kriteria
      .flatMap(bab)
      .map((k) => {
        const sub =
          urut === 'alur' && k.alur.length
            ? k.alur.map((a) => ({ judul: `${a.label} · ${a.judul}`, list: a.butir.filter((b) => b && cocok(b)) }))
            : [{ judul: '', list: k.butir.filter(cocok) }];
        return { ...k, sub: sub.filter((s) => s.list.length) };
      })
      .filter((k) => k.sub.length),
  );
  let current = $derived(jenjang.butir.find((b) => b.no === selected) || null);
  let idx = $derived(current ? jenjang.butir.indexOf(current) : -1);

  // Di HP daftar dan detail bergantian; saat kembali ke daftar, gulir ke butir yang terakhir dibuka
  let terakhir = null;
  $effect(() => {
    if (selected) { terakhir = selected; return; }
    if (!terakhir || !matchMedia('(max-width: 860px)').matches) return;
    const no = terakhir;
    requestAnimationFrame(() => document.querySelector(`.item[data-no="${no}"]`)?.scrollIntoView({ block: 'center' }));
  });

  // ← → pindah butir
  function onkeydown(e) {
    if (!current || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest?.('input, select, textarea, [contenteditable]')) return;
    const to = e.key === 'ArrowRight' ? idx + 1 : e.key === 'ArrowLeft' ? idx - 1 : -1;
    if (to < 0 || to >= jenjang.butir.length) return;
    e.preventDefault();
    location.hash = href(jenjang.id, 'butir', jenjang.butir[to].no);
  }

  const ringkas = (b) => b.elemen.replace(/^\d\.\d\.?\s*\[[A-Z]+\]\s*/, '').replace(/^[A-D]\.\s*/, '').replace(/^\d\.\d\s*/, '');
</script>

<svelte:window {onkeydown} />

<div class="layout" class:has-detail={!!current}>
  <aside class="list no-print">
    <div class="filters">
      <input type="search" placeholder="Cari kode atau kata kunci" bind:value={q} />
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
      <div class="seg" role="group" aria-label="Urutan">
        <span class="label">Urutkan</span>
        <button class:on={urut === 'tahap'} onclick={() => (urut = 'tahap')}>Per tahap</button>
        <button class:on={urut === 'alur'} onclick={() => (urut = 'alur')}>Per alur PPEPP</button>
      </div>
    </div>
    {#each groups as k, i}
      {#if k.anak && !groups[i - 1]?.anak}
        <div class="ghead induk"><span>C. Kriteria</span><span class="mono">{fmt(bobotC)}</span></div>
      {/if}
      <div class="group" class:anak={k.anak}>
        <div class="ghead"><span>{k.nama}</span><span class="mono">{fmt(k.bobot)}</span></div>
        {#each k.sub as s}
          {#if s.judul}<div class="shead">{s.judul}</div>{/if}
          {#each s.list as b}
            <a class="item" class:active={b.no === selected} class:inalur={!!s.judul} data-no={b.no} href={href(jenjang.id, 'butir', b.no)}>
              <span class="kode">{b.kode}</span>
              {#if s.judul}
                <span class="txt tahap" style="--c: var(--t{b.tahapNo})">{TAHAP[b.tahapNo - 1]}</span>
              {:else}
                <span class="txt">{ringkas(b)}</span>
              {/if}
              <span class="meta"><span class="jenis {b.jenis}">{b.jenis}</span><span>{fmt(b.bobot)}</span></span>
            </a>
          {/each}
        {/each}
      </div>
    {:else}
      <p class="muted small empty">Tidak ada butir yang cocok.</p>
    {/each}
  </aside>

  <section class="detail">
    {#if current}
      <a class="back no-print" href={href(jenjang.id, 'butir')}>← Daftar butir</a>
      <ButirDetail {jenjang} butir={current} />
      <nav class="pager no-print">
        {#if idx > 0}
          <a href={href(jenjang.id, 'butir', jenjang.butir[idx - 1].no)}><span class="label">Sebelumnya</span>{jenjang.butir[idx - 1].kode}</a>
        {:else}<span></span>{/if}
        {#if idx < jenjang.butir.length - 1}
          <a class="next" href={href(jenjang.id, 'butir', jenjang.butir[idx + 1].no)}><span class="label">Berikutnya</span>{jenjang.butir[idx + 1].kode}</a>
        {/if}
      </nav>
    {:else}
      <div class="intro">
        <div class="label">Program {jenjang.nama}</div>
        <h1>Butir penilaian</h1>
        <p>
          {jenjang.butir.length} butir dengan total bobot <b>{fmt(jenjang.totalBobot)}</b>. Pilih butir untuk melihat panduan
          penulisan, rubrik skor, syarat Unggul, posisinya dalam alur PPEPP, dan contoh narasi.
        </p>
        <h3>Jenis butir</h3>
        <dl class="legend">
          <dt><span class="jenis I">I</span></dt><dd>Input: kebijakan, standar, dan sumber daya (umumnya tahap Penetapan)</dd>
          <dt><span class="jenis P">P</span></dt><dd>Proses: pelaksanaan dan pengendalian</dd>
          <dt><span class="jenis O">O</span></dt><dd>Output: hasil, evaluasi, dan peningkatan</dd>
        </dl>
        <h3>Bobot terbesar</h3>
        <table>
          <tbody>
            {#each [...jenjang.butir].sort((a, b) => b.bobot - a.bobot).slice(0, 5) as b}
              <tr>
                <td class="mono"><a href={href(jenjang.id, 'butir', b.no)}>{b.kode}</a></td>
                <td>{ringkas(b).slice(0, 110)}…</td>
                <td class="num"><b>{fmt(b.bobot)}</b></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </section>
</div>

<style>
  .layout { display: grid; grid-template-columns: 340px 1fr; gap: 36px; align-items: start; }
  .layout > * { min-width: 0; }
  .list {
    position: sticky; top: calc(var(--head, 92px) + 16px); max-height: calc(100vh - var(--head, 92px) - 32px); overflow-y: auto;
    border-right: 1px solid var(--border); padding-right: 4px;
  }
  .filters { position: sticky; top: 0; background: var(--bg); padding: 0 8px 12px 0; border-bottom: 1px solid var(--border-strong); z-index: 1; }
  .filters input, .filters select { width: 100%; padding: 6px 9px; }
  .row { display: flex; gap: 6px; margin-top: 6px; }
  .seg { display: flex; align-items: center; gap: 4px; margin-top: 8px; }
  .seg .label { margin-right: 4px; }
  .seg button {
    border: 1px solid var(--border); background: transparent; padding: 2px 8px; font-size: 0.8rem;
    border-radius: var(--radius); cursor: pointer; color: var(--muted);
  }
  .seg button.on { border-color: var(--text); color: var(--text); font-weight: 600; }
  .ghead {
    display: flex; justify-content: space-between; padding: 16px 8px 4px 0;
    font-weight: 700; font-size: 0.92rem; border-bottom: 1px solid var(--border);
  }
  .ghead .mono { font-size: 0.8rem; color: var(--muted); font-weight: 400; }
  .ghead.induk { border-bottom-color: var(--border-strong); }
  .group.anak { margin-left: 12px; padding-left: 10px; border-left: 1px solid var(--border); }
  .group.anak .ghead { font-size: 0.95rem; padding-top: 12px; }
  .shead { font-size: 0.78rem; color: var(--muted); padding: 10px 8px 2px 0; }
  .item {
    display: grid; grid-template-columns: 52px 1fr auto; gap: 8px; align-items: start;
    padding: 7px 8px 7px 6px; color: var(--text); font-size: 0.86rem; text-decoration: none;
    border-left: 2px solid transparent;
  }
  .item.inalur { padding-top: 3px; padding-bottom: 3px; }
  .item { border-radius: 0 var(--radius) var(--radius) 0; }
  .item:hover { background: var(--surface-2); }
  .item.active { background: var(--accent-soft); border-left-color: var(--accent); }
  .kode { font-family: var(--mono); font-weight: 600; white-space: nowrap; }
  .txt { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--muted); }
  .item.active .txt { color: var(--text); }
  .txt.tahap, .item.active .txt.tahap { color: var(--c); font-weight: 600; }
  .meta { display: flex; gap: 8px; align-items: baseline; font-variant-numeric: tabular-nums; }
  .empty { padding: 12px 0; }
  .back { display: none; margin-bottom: 12px; }
  .pager { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 12px; border-top: 1px solid var(--border-strong); }
  .pager a { display: flex; flex-direction: column; font-family: var(--mono); font-weight: 600; text-decoration: none; color: var(--text); }
  .pager a:hover { color: var(--accent); }
  .pager .next { text-align: right; }
  .intro { max-width: 760px; }
  .intro h3 { margin-top: 24px; }
  .legend { display: grid; grid-template-columns: 40px 1fr; gap: 4px 8px; margin: 0; }
  .legend dd { margin: 0; }
  @media (max-width: 860px) {
    .layout { grid-template-columns: 1fr; }
    /* Daftar ikut menggulir halaman; kotak filter menempel tepat di bawah header */
    .list { position: static; max-height: none; overflow: visible; border-right: 0; padding-right: 0; }
    .filters { top: var(--head, 92px); padding: 10px 0 12px; margin-top: -10px; }
    .layout.has-detail .list { display: none; }
    .layout:not(.has-detail) .detail { display: none; }
    .back {
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px 6px 8px; font-weight: 500;
      text-decoration: none; border: 1px solid var(--border-strong); border-radius: 999px; background: var(--surface);
    }
    .item { padding-top: 10px; padding-bottom: 10px; grid-template-columns: 56px 1fr auto; }
    .item.inalur { padding-top: 7px; padding-bottom: 7px; }
    .seg button { padding: 5px 10px; }
    .pager a { padding: 6px 0; }
  }
</style>
