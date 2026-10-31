<script>
  import { href } from './router.svelte.js';
  import { fmt } from './data.js';
  import { TAHAP } from './parse.js';

  let { jenjang, alur, current = null } = $props();
</script>

<ol class="rail">
  {#each TAHAP as t, i}
    {@const b = alur.butir[i]}
    <li class:cur={b && b.no === current}>
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
  .rail::before {
    content: ''; position: absolute; left: 10%; right: 10%; top: 11px; border-top: 1px solid var(--text); opacity: 0.35;
  }
  li { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2px; padding: 0 4px; }
  .step {
    width: 23px; height: 23px; display: grid; place-items: center; border-radius: 50%;
    border: 1px solid var(--text); background: var(--bg); font: 600 0.75rem var(--mono); z-index: 1;
  }
  .tahap { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-top: 4px; }
  a { display: flex; flex-direction: column; align-items: center; color: var(--text); padding: 2px 6px; border-radius: 2px; }
  a:hover { background: var(--surface-2); text-decoration: none; }
  .kode { font: 600 0.92rem var(--mono); }
  .meta { font-size: 0.78rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .cur .step { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
  .cur .kode { color: var(--accent); }
  .cur a { box-shadow: inset 0 -2px 0 var(--accent); }
  @media (max-width: 560px) {
    .rail { grid-template-columns: 1fr; gap: 6px; }
    .rail::before { left: 11px; right: auto; top: 12px; bottom: 12px; border-top: 0; border-left: 1px solid var(--text); }
    li { flex-direction: row; text-align: left; gap: 10px; }
    .tahap { width: 96px; margin: 0; }
    a { flex-direction: row; gap: 10px; }
  }
</style>
