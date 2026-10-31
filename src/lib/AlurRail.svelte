<script>
  import { href } from './router.svelte.js';
  import { fmt } from './data.js';
  import { TAHAP } from './parse.js';

  let { jenjang, alur, current = null } = $props();
</script>

<ol class="rail">
  {#each TAHAP as t, i}
    {@const b = alur.butir[i]}
    <li class:cur={b && b.no === current} style="--c: var(--t{i + 1})">
      <span class="step">{i + 1}</span>
      <span class="tahap">{t}</span>
      {#if b}
        <a href={href(jenjang.id, 'butir', b.no)}>
          <span class="kode">{b.kode}</span>
          <span class="meta"><span class="jenis {b.jenis}">{b.jenis}</span> {fmt(b.bobot)}</span>
        </a>
      {:else}
        <span class="muted">–</span>
      {/if}
    </li>
  {/each}
</ol>

<style>
  .rail { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, 1fr); position: relative; }
  /* Garis siklus bergradasi melewati kelima warna tahap */
  .rail::before {
    content: ''; position: absolute; left: 10%; right: 10%; top: 12px; height: 2px; border-radius: 2px;
    background: linear-gradient(90deg, var(--t1), var(--t2), var(--t3), var(--t4), var(--t5)); opacity: 0.45;
  }
  li { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2px; padding: 0 4px; }
  .step {
    width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%;
    border: 2px solid var(--c); background: var(--surface); color: var(--c); font-size: 0.78rem; font-weight: 700; z-index: 1;
  }
  .tahap { font-size: 0.78rem; font-weight: 600; color: var(--c); margin-top: 4px; }
  a { display: flex; flex-direction: column; align-items: center; color: var(--text); padding: 3px 8px; border-radius: var(--radius); text-decoration: none; }
  a:hover { background: var(--surface-2); }
  .kode { font-weight: 700; font-size: 0.92rem; font-variant-numeric: tabular-nums; }
  .meta { font-size: 0.78rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .cur .step { background: var(--c); color: var(--surface); }
  .cur a { background: color-mix(in srgb, var(--c) 12%, transparent); }
  .cur .kode { color: var(--c); }
  @media (max-width: 560px) {
    .rail { grid-template-columns: 1fr; gap: 6px; }
    .rail::before { left: 12px; right: auto; top: 13px; bottom: 13px; width: 2px; height: auto; background: linear-gradient(180deg, var(--t1), var(--t2), var(--t3), var(--t4), var(--t5)); }
    li { flex-direction: row; text-align: left; gap: 10px; }
    .tahap { width: 96px; margin: 0; }
    a { flex-direction: row; gap: 10px; }
  }
</style>
