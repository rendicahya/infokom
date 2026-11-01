<script>
  import { route, href } from './lib/router.svelte.js';
  import { JENJANG, getJenjang } from './lib/data.js';
  import Home from './routes/Home.svelte';
  import Panduan from './routes/Panduan.svelte';
  import Butir from './routes/Butir.svelte';
  import Kalkulator from './routes/Kalkulator.svelte';
  import Rekap from './routes/Rekap.svelte';
  import BagiDialog from './lib/BagiDialog.svelte';

  let bagi;

  // Label pendek dipakai di layar sempit agar keempat tab muat tanpa digeser
  const PAGES = [
    { id: 'butir', label: 'Butir & Rubrik', pendek: 'Butir' },
    { id: 'panduan', label: 'Panduan LED', pendek: 'Panduan' },
    { id: 'kalkulator', label: 'Kalkulator', pendek: 'Kalkulator' },
    { id: 'rekap', label: 'Rekap Bobot', pendek: 'Rekap' },
  ];

  let jenjang = $derived(getJenjang(route.jenjang));
  let page = $derived(jenjang ? route.page || 'butir' : null);

  // Tinggi header (berubah antara desktop dan HP) dipakai elemen sticky di halaman lain lewat --head
  let tinggiHeader = $state(0);
  $effect(() => {
    document.documentElement.style.setProperty('--head', tinggiHeader + 'px');
  });

  // Tema awal dipasang oleh skrip di index.html
  let theme = $state(document.documentElement.dataset.theme || 'light');
  let full = $state(!!document.fullscreenElement);
  const bisaFull = !!document.documentElement.requestFullscreen;

  function gantiTema() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }

  // Zoom 70–200%, langkah 10%; nilai awal dipasang oleh skrip di index.html
  const ZMIN = 0.7, ZMAX = 2;
  let zoom = $state(+getComputedStyle(document.documentElement).getPropertyValue('--zoom') || 1);

  function aturZoom(z) {
    zoom = Math.round(Math.min(ZMAX, Math.max(ZMIN, z)) * 10) / 10;
    document.documentElement.style.setProperty('--zoom', zoom);
    try { localStorage.setItem('zoom', zoom); } catch {}
  }

  // Ctrl+scroll (dan pinch di touchpad) mengubah zoom aplikasi, bukan zoom browser
  $effect(() => {
    let akhir = 0;
    const onwheel = (e) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      if (Date.now() - akhir < 80 || !e.deltaY) return;
      akhir = Date.now();
      aturZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1));
    };
    window.addEventListener('wheel', onwheel, { passive: false });
    return () => window.removeEventListener('wheel', onwheel);
  });

  function gantiFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }
</script>

<svelte:document onfullscreenchange={() => (full = !!document.fullscreenElement)} />

<header class="no-print" bind:clientHeight={tinggiHeader}>
  <div class="container bar">
    <a class="brand" href="#/" aria-label="Beranda">
      <span class="mark">LED</span><span class="nm">Panduan LAM INFOKOM</span>
    </a>
    <nav class="jenjang" aria-label="Jenjang">
      {#each JENJANG as j, i}
        <a href={href(j.id, page || 'butir')} class:active={jenjang?.id === j.id} title={j.nama}>
          <span class="full">{j.nama}</span><span class="short" aria-hidden="true">S{i + 1}</span>
        </a>
      {/each}
    </nav>
    <div class="tools zoom" role="group" aria-label="Zoom">
      <button onclick={() => aturZoom(zoom - 0.1)} disabled={zoom <= ZMIN} title="Perkecil (Ctrl+scroll)" aria-label="Perkecil">
        <svg viewBox="0 0 24 24"><path d="M6 12h12" /></svg>
      </button>
      <button class="pct" onclick={() => aturZoom(1)} title="Kembalikan ke 100%">{Math.round(zoom * 100)}%</button>
      <button onclick={() => aturZoom(zoom + 0.1)} disabled={zoom >= ZMAX} title="Perbesar (Ctrl+scroll)" aria-label="Perbesar">
        <svg viewBox="0 0 24 24"><path d="M6 12h12M12 6v12" /></svg>
      </button>
    </div>
    <div class="tools">
      <button onclick={() => bagi.buka()} title="Bagikan tautan dan QR code aplikasi" aria-label="Bagikan">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM20 14v1M14 20h1M17 17h4v4h-4" /></svg>
      </button>
      <button onclick={gantiTema} title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'} aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}>
        {#if theme === 'dark'}
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        {:else}
          <svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></svg>
        {/if}
      </button>
      {#if bisaFull}
        <button class="full-btn" onclick={gantiFull} title={full ? 'Keluar layar penuh' : 'Layar penuh'} aria-label={full ? 'Keluar layar penuh' : 'Layar penuh'}>
          {#if full}
            <svg viewBox="0 0 24 24"><path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" /></svg>
          {:else}
            <svg viewBox="0 0 24 24"><path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" /></svg>
          {/if}
        </button>
      {/if}
    </div>
  </div>
  {#if jenjang}
    <nav class="container tabs" aria-label="Halaman">
      {#each PAGES as p}
        <a href={href(jenjang.id, p.id)} class:active={page === p.id}><span class="full">{p.label}</span><span class="short">{p.pendek}</span></a>
      {/each}
    </nav>
  {/if}
</header>

<BagiDialog bind:this={bagi} />

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
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }
  .bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 58px; }
  .brand { display: flex; align-items: center; gap: 10px; color: var(--text); font-size: 0.98rem; font-weight: 700; text-decoration: none; letter-spacing: -0.01em; }
  .mark {
    display: grid; place-items: center; height: 28px; padding: 0 7px; border-radius: var(--radius);
    background: var(--accent); color: var(--on-accent); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.02em;
  }
  /* Pemilih jenjang sebagai kontrol segmen */
  .jenjang { display: flex; gap: 2px; margin-left: auto; padding: 3px; background: var(--surface-2); border-radius: calc(var(--radius) + 3px); }
  .tools { display: flex; gap: 2px; padding-left: 10px; border-left: 1px solid var(--border); }
  .tools button {
    display: grid; place-items: center; width: 30px; height: 30px; padding: 0; cursor: pointer;
    background: transparent; border: 1px solid transparent; border-radius: var(--radius); color: var(--muted);
  }
  .tools button:hover { color: var(--text); background: var(--surface-2); }
  .tools button:disabled { opacity: 0.35; cursor: default; background: transparent; }
  .tools .pct { width: auto; min-width: 46px; font-size: 0.78rem; font-weight: 600; font-variant-numeric: tabular-nums; }
  .tools svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
  .jenjang a { padding: 3px 12px; color: var(--muted); font-size: 0.86rem; font-weight: 500; text-decoration: none; border-radius: var(--radius); }
  .jenjang a:hover { color: var(--text); }
  .jenjang a.active { color: var(--text); background: var(--surface); font-weight: 600; box-shadow: 0 0 0 1px var(--border); }
  /* Geser horizontal di layar sempit tanpa menampilkan scrollbar */
  .tabs { display: flex; gap: 26px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; }
  .tabs::-webkit-scrollbar { display: none; }
  .tabs a {
    padding: 8px 0 10px; color: var(--muted); border-bottom: 2px solid transparent;
    white-space: nowrap; font-size: 0.9rem; font-weight: 500; text-decoration: none;
  }
  .tabs a:hover { color: var(--text); }
  .tabs a.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 600; }
  main { padding-top: 32px; padding-bottom: 56px; min-height: 70vh; }
  footer { padding-bottom: 32px; }
  footer p { border-top: 1px solid var(--border); padding-top: 14px; margin: 0; color: var(--muted); font-size: 0.8rem; max-width: 70ch; }
  .short { display: none; }
  @media (max-width: 640px) {
    .bar { height: 52px; gap: 8px; }
    .brand .nm { display: none; }
    .jenjang a { padding: 4px 10px; }
    /* Zoom dan layar penuh kurang berguna di HP (sudah ada pinch-zoom dan mode layar penuh peramban) */
    .zoom, .tools .full-btn { display: none; }
    .tools { padding-left: 4px; border-left: 0; }
    .tools button { width: 38px; height: 38px; }
    .tools svg { width: 19px; height: 19px; }
    .tabs { gap: 0; justify-content: space-between; }
    .tabs a { flex: 1; text-align: center; padding: 9px 4px 10px; }
    .tabs .full { display: none; }
    .tabs .short { display: inline; }
    main { padding-top: 22px; padding-bottom: 40px; }
  }
  @media (max-width: 400px) {
    .jenjang .full { display: none; }
    .jenjang .short { display: inline; }
    .jenjang a { padding: 4px 12px; }
  }
</style>
