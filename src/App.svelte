<script>
  import { route, href } from './lib/router.svelte.js';
  import { JENJANG, getJenjang } from './lib/data.js';
  import Home from './routes/Home.svelte';
  import Panduan from './routes/Panduan.svelte';
  import Butir from './routes/Butir.svelte';
  import Kalkulator from './routes/Kalkulator.svelte';
  import Rekap from './routes/Rekap.svelte';

  const PAGES = [
    { id: 'butir', label: 'Butir & Rubrik' },
    { id: 'panduan', label: 'Panduan LED' },
    { id: 'kalkulator', label: 'Kalkulator' },
    { id: 'rekap', label: 'Rekap Bobot' },
  ];

  let jenjang = $derived(getJenjang(route.jenjang));
  let page = $derived(jenjang ? route.page || 'butir' : null);
</script>

<header class="no-print">
  <div class="container bar">
    <a class="brand" href="#/">
      <b>LED</b><span class="sep">/</span><span>LAM INFOKOM</span>
    </a>
    <nav class="jenjang" aria-label="Jenjang">
      {#each JENJANG as j}
        <a href={href(j.id, page || 'butir')} class:active={jenjang?.id === j.id}>{j.nama}</a>
      {/each}
    </nav>
  </div>
  {#if jenjang}
    <nav class="container tabs" aria-label="Halaman">
      {#each PAGES as p}
        <a href={href(jenjang.id, p.id)} class:active={page === p.id}>{p.label}</a>
      {/each}
    </nav>
  {/if}
</header>

<main class="container">
  {#if !jenjang}
    <Home />
  {:else if page === 'panduan'}
    <Panduan {jenjang} />
  {:else if page === 'kalkulator'}
    {#key jenjang.id}<Kalkulator {jenjang} />{/key}
  {:else if page === 'rekap'}
    <Rekap {jenjang} />
  {:else}
    <Butir {jenjang} selected={route.param ? +route.param : null} />
  {/if}
</main>

<footer class="container no-print">
  <p>
    Disusun dari Instrumen LED dan Matriks Penilaian Kinerja Program Studi LAM INFOKOM 2.1 (2025). Contoh narasi bersifat
    ilustratif. Bukan situs resmi LAM INFOKOM; selalu rujuk dokumen asli.
  </p>
</footer>

<style>
  header {
    position: sticky; top: 0; z-index: 10;
    background: var(--bg);
    border-top: 3px solid var(--text);
    border-bottom: 1px solid var(--text);
  }
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 54px; }
  .brand { display: flex; align-items: baseline; gap: 6px; color: var(--text); font-family: var(--serif); font-size: 1.15rem; text-decoration: none; }
  .brand b { font-weight: 700; }
  .brand .sep { color: var(--accent); }
  .jenjang { display: flex; gap: 2px; }
  .jenjang a { padding: 3px 10px; color: var(--muted); font-size: 0.9rem; text-decoration: none; border: 1px solid transparent; border-radius: var(--radius); }
  .jenjang a:hover { color: var(--text); }
  .jenjang a.active { color: var(--text); border-color: var(--text); font-weight: 600; }
  .tabs { display: flex; gap: 22px; overflow-x: auto; border-top: 1px solid var(--border); }
  .tabs a {
    padding: 9px 0 8px; color: var(--muted); border-bottom: 2px solid transparent; margin-bottom: -1px;
    white-space: nowrap; font-size: 0.92rem; text-decoration: none;
  }
  .tabs a:hover { color: var(--text); }
  .tabs a.active { color: var(--text); border-bottom-color: var(--accent); font-weight: 600; }
  main { padding-top: 28px; padding-bottom: 48px; min-height: 70vh; }
  footer { padding-bottom: 32px; }
  footer p { border-top: 1px solid var(--border); padding-top: 14px; margin: 0; color: var(--muted); font-size: 0.82rem; max-width: 70ch; }
  @media (max-width: 640px) {
    .brand span:last-child { display: none; }
    .jenjang a { padding: 3px 7px; }
  }
</style>
