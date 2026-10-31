<script>
  import Md from '../lib/Md.svelte';
  import { sectionMarkdown } from '../lib/parse.js';
  import { href } from '../lib/router.svelte.js';
  import { fmt } from '../lib/data.js';

  let { jenjang } = $props();
  let led = $derived(jenjang.led);

  const butirKriteria = (no) => jenjang.butir.filter((b) => b.kriteriaNo === no && b.kriteria !== 'suplemen');
  const butirTahap = (kNo, tNo) => butirKriteria(kNo).filter((b) => b.tahapNo === tNo);
</script>

<div class="wrap">
  <h1>Panduan Penyusunan LED — {jenjang.nama}</h1>
  <p class="muted">Isi Instrumen LED disajikan per bagian. Klik judul untuk membuka. Pada bagian kriteria, setiap tahap PPEPP ditautkan ke butir penilaian beserta bobotnya.</p>

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

  {#each [led.kondisiEksternal, led.profil] as node, i}
    {@const b = jenjang.butir[i]}
    <details class="card">
      <summary>{node.title} <a class="tag" href={href(jenjang.id, 'butir', b.no)}>Butir {b.kode} · bobot {fmt(b.bobot)}</a></summary>
      <Md text={sectionMarkdown(node)} />
    </details>
  {/each}

  <div class="card plain"><Md text={led.kriteriaIntro} /></div>

  {#each led.kriteria as k}
    {@const total = butirKriteria(k.no).reduce((a, b) => a + b.bobot, 0)}
    <details class="card">
      <summary>C.{k.no} {k.judul} <span class="tag">bobot {fmt(total)}</span></summary>
      <Md text={k.intro} />
      {#each k.tahap as t}
        <div class="tahap">
          <h4>{t.judul}</h4>
          <Md text={t.intro} />
          {#each butirTahap(k.no, t.no) as b}
            <a class="link" href={href(jenjang.id, 'butir', b.no)}>
              <span class="chip {b.jenis}">{b.jenis}</span>
              <b>{b.kode}</b>
              <span class="t">{t.items[b.huruf] || ''}</span>
              <span class="w">{fmt(b.bobot)}</span>
            </a>
          {/each}
        </div>
      {/each}
    </details>
  {/each}

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
  .wrap { max-width: 900px; }
  .part { margin: 28px 0 12px; }
  details { margin-bottom: 10px; padding: 0; }
  details > :global(*:not(summary)) { margin-left: 20px; margin-right: 20px; }
  details[open] { padding-bottom: 16px; }
  summary { cursor: pointer; padding: 14px 20px; font-weight: 600; list-style-position: inside; }
  summary:hover { color: var(--accent); }
  .plain { margin: 12px 0; }
  .tag { font-size: 0.78rem; font-weight: 500; background: var(--surface-2); color: var(--muted); padding: 2px 8px; border-radius: 999px; margin-left: 8px; }
  a.tag { color: var(--accent); }
  .tahap { border-top: 1px solid var(--border); padding-top: 12px; margin-top: 12px; }
  .tahap h4 { margin-bottom: 4px; }
  .link {
    display: grid; grid-template-columns: auto auto 1fr auto; gap: 8px; align-items: start;
    padding: 8px 10px; border-radius: 8px; background: var(--surface-2); margin: 6px 0; color: var(--text); font-size: 0.9rem;
  }
  .link:hover { text-decoration: none; outline: 1px solid var(--accent); }
  .w { font-weight: 700; }
  @media (max-width: 600px) { .link { grid-template-columns: auto 1fr auto; } .link .t { grid-column: 1 / -1; grid-row: 2; } }
</style>
