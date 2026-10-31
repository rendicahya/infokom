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
      <span class="logo">L</span>
      <span>Panduan LED <b>LAM INFOKOM</b></span>
    </a>
    <nav class="jenjang">
      {#each JENJANG as j}
        <a href={href(j.id, page || 'butir')} class:active={jenjang?.id === j.id}>{j.nama}</a>
      {/each}
    </nav>
  </div>
  {#if jenjang}
    <div class="container tabs">
      {#each PAGES as p}
        <a href={href(jenjang.id, p.id)} class:active={page === p.id}>{p.label}</a>
      {/each}
    </div>
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

<footer class="container muted small no-print">
  Disusun dari Instrumen LED dan Matriks Penilaian Kinerja Program Studi LAM INFOKOM 2.1 (2025). Contoh narasi bersifat ilustratif.
  Bukan situs resmi LAM INFOKOM; selalu rujuk dokumen asli.
</footer>

<style>
  header {
    position: sticky; top: 0; z-index: 10;
    background: color-mix(in srgb, var(--surface) 92%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 56px; }
  .brand { display: flex; align-items: center; gap: 10px; color: var(--text); font-size: 1rem; }
  .brand:hover { text-decoration: none; }
  .logo {
    display: grid; place-items: center; width: 30px; height: 30px; border-radius: 8px;
    background: var(--accent); color: #fff; font-weight: 800;
  }
  .jenjang { display: flex; gap: 4px; background: var(--surface-2); padding: 3px; border-radius: 10px; }
  .jenjang a { padding: 4px 12px; border-radius: 8px; color: var(--muted); font-weight: 600; font-size: 0.9rem; }
  .jenjang a:hover { text-decoration: none; color: var(--text); }
  .jenjang a.active { background: var(--surface); color: var(--accent); box-shadow: var(--shadow); }
  .tabs { display: flex; gap: 4px; overflow-x: auto; }
  .tabs a {
    padding: 10px 14px; color: var(--muted); border-bottom: 2px solid transparent;
    white-space: nowrap; font-weight: 500;
  }
  .tabs a:hover { text-decoration: none; color: var(--text); }
  .tabs a.active { color: var(--accent); border-bottom-color: var(--accent); }
  main { padding-top: 24px; padding-bottom: 40px; min-height: 70vh; }
  footer { padding-bottom: 32px; border-top: 1px solid var(--border); padding-top: 16px; }
  @media (max-width: 640px) {
    .brand span:last-child { display: none; }
  }
</style>
