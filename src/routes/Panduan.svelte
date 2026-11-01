<script>
  import Md from '../lib/Md.svelte';
  import AlurMatrix from '../lib/AlurMatrix.svelte';
  import { sectionMarkdown } from '../lib/parse.js';
  import { href } from '../lib/router.svelte.js';
  import { fmt } from '../lib/data.js';

  let { jenjang } = $props();
  let led = $derived(jenjang.led);

  const butirKriteria = (no) => jenjang.butir.filter((b) => b.kriteriaNo === no && b.kriteria !== 'suplemen');
  const butirTahap = (kNo, tNo) => butirKriteria(kNo).filter((b) => b.tahapNo === tNo);
</script>

<div class="wrap">
  <div class="label">Program {jenjang.nama}</div>
  <h1>Panduan penyusunan LED</h1>
  <p class="lead">
    Isi Instrumen LED, per bagian. Setiap kriteria dibuka dengan peta alur PPEPP, lalu panduan per tahap yang ditautkan ke
    butir penilaian beserta bobotnya.
  </p>

  <h2 class="part">Bagian Kesatu · Kerangka Konseptual</h2>
  {#each led.bagian1.children as s}
    <details class="card">
      <summary>{s.title}</summary>
      <Md text={sectionMarkdown(s)} />
    </details>
  {/each}

  <h2 class="part">Bagian Kedua · Struktur LED</h2>
  <details class="card">
    <summary>I. Pendahuluan</summary>
    <Md text={sectionMarkdown(led.pendahuluan)} />
  </details>

  <h3 class="sub">II. Laporan Evaluasi Diri</h3>

  {#each [led.kondisiEksternal, led.profil] as node, i}
    {@const b = jenjang.butir[i]}
    <details class="card">
      <summary>{node.title} <a class="tag" href={href(jenjang.id, 'butir', b.no)}>Butir {b.kode} · bobot {fmt(b.bobot)}</a></summary>
      <Md text={sectionMarkdown(node)} />
    </details>
  {/each}

  <!-- C. Kriteria sebagai induk; C.1, C.2, … ditampilkan menjorok di bawahnya -->
  <details class="card">
    <summary>C. KRITERIA <span class="tag">{led.kriteria.length} kriteria · bobot {fmt(led.kriteria.reduce((t, k) => t + butirKriteria(k.no).reduce((a, b) => a + b.bobot, 0), 0))}</span></summary>
    <Md text={led.kriteriaIntro} />
  </details>

  <div class="anak">
  {#each led.kriteria as k}
    {@const total = butirKriteria(k.no).reduce((a, b) => a + b.bobot, 0)}
    {@const alur = jenjang.alur.filter((a) => a.kriteria === 'k' + k.no)}
    <details class="card">
      <summary>C.{k.no} {k.judul} <span class="tag">bobot {fmt(total)}</span></summary>
      <Md text={k.intro} />
      {#if alur.length}
        <div class="peta">
          <div class="label">Peta alur PPEPP · baca per baris</div>
          <AlurMatrix {jenjang} {alur} />
        </div>
      {/if}
      {#each k.tahap as t}
        <div class="tahap">
          <h4>{t.judul}</h4>
          <Md text={t.intro} />
          {#each butirTahap(k.no, t.no) as b}
            <a class="link" href={href(jenjang.id, 'butir', b.no)}>
              <span class="jenis {b.jenis}">{b.jenis}</span>
              <b class="mono">{b.kode}</b>
              <span class="t">{t.items[b.huruf] || ''}</span>
              <span class="w">{fmt(b.bobot)}</span>
            </a>
          {/each}
        </div>
      {/each}
    </details>
  {/each}
  </div>

  {#if led.suplemen}
    <details class="card">
      <summary>D. Suplemen Program Studi</summary>
      <Md text={led.suplemen.intro} />
      {#each led.suplemen.bidang as bd}
        {#if led.suplemen.bidang.length > 1}<h4>Bidang {bd.nama}</h4>{/if}
        <ol>
          {#each bd.items as it}
            <li><b>{it.judul}</b><Md text={it.isi} /></li>
          {/each}
        </ol>
      {/each}
    </details>
  {/if}

  {#if led.penutup}
    <details class="card">
      <summary>{led.penutup.title}</summary>
      <Md text={led.penutup.body} />
    </details>
  {/if}
</div>

<style>
  .wrap { max-width: 57.5rem; }
  .wrap > h1 { margin-top: 4px; }
  .lead { max-width: 70ch; }
  .part { margin: 36px 0 0; padding-bottom: 6px; border-bottom: 1px solid var(--border-strong); }
  /* Bagian-bagian ditampilkan sebagai daftar bergaris, bukan kartu */
  details.card { background: transparent; border: 0; border-bottom: 1px solid var(--border); border-radius: 0; padding: 0; }
  details > :global(*:not(summary)) { margin-left: 26px; }
  details[open] { padding-bottom: 20px; }
  summary { cursor: pointer; padding: 12px 0; font-family: var(--serif); font-size: 1.08rem; font-weight: 600; list-style: none; position: relative; padding-left: 26px; }
  summary::-webkit-details-marker { display: none; }
  summary::before { content: '+'; position: absolute; left: 4px; font-family: var(--mono); color: var(--accent); }
  details[open] > summary::before { content: '−'; }
  summary:hover { color: var(--accent); }
  .sub { margin: 24px 0 0; padding-bottom: 4px; font-size: 1rem; color: var(--muted); border-bottom: 1px solid var(--border); }
  .anak { margin-left: 26px; border-left: 1px solid var(--border); padding-left: 0; }
  .anak > details.card > summary { padding-left: 30px; }
  .anak > details.card > summary::before { left: 10px; }
  .anak > details.card { border-bottom-style: dashed; }
  .tag { font: 400 0.78rem var(--mono); color: var(--muted); margin-left: 8px; }
  a.tag { color: var(--link); }
  .peta { margin: 14px 0 6px; }
  .peta .label { margin-bottom: 6px; }
  .tahap { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 16px; }
  .tahap h4 { margin-bottom: 4px; }
  .link {
    display: grid; grid-template-columns: auto auto 1fr auto; gap: 10px; align-items: start;
    padding: 7px 10px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface);
    margin: 6px 0; color: var(--text); font-size: 0.9rem; text-decoration: none;
  }
  .link:hover { border-color: var(--accent); }
  .w { font-weight: 600; font-variant-numeric: tabular-nums; }
  @media (max-width: 600px) {
    details > :global(*:not(summary)) { margin-left: 0; }
    summary { font-size: 1rem; padding-top: 13px; padding-bottom: 13px; line-height: 1.35; }
    .tag { display: block; margin: 2px 0 0; }
    .part { font-size: 1.15rem; }
    .anak { margin-left: 10px; }
    .link { grid-template-columns: auto 1fr auto; } .link .t { grid-column: 1 / -1; grid-row: 2; }
  }
</style>
