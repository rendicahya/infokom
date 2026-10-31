<script>
  import { href } from './router.svelte.js';
  import { fmt } from './data.js';
  import { TAHAP } from './parse.js';

  // Baris = alur (kriteria + huruf), kolom = tahap PPEPP. Membaca satu baris dari kiri ke kanan = satu siklus.
  let { jenjang, alur } = $props();
</script>

<div class="table-wrap">
  <table class="mx">
    <thead>
      <tr>
        <th>Alur</th>
        {#each TAHAP as t, i}<th style="--c: var(--t{i + 1})"><span class="n">{i + 1}</span> {t}</th>{/each}
        <th class="num">Bobot</th>
      </tr>
    </thead>
    <tbody>
      {#each alur as a}
        <tr>
          <td class="topik"><span class="mono">{a.label}</span><span>{a.judul}</span></td>
          {#each TAHAP as _, i}
            {@const b = a.butir[i]}
            <td class="cell" class:end={i === TAHAP.length - 1} style="--c: var(--t{i + 1})">
              {#if b}
                <a href={href(jenjang.id, 'butir', b.no)} title="{b.kode} · bobot {fmt(b.bobot)}">
                  <span class="mono">{b.kode}</span>
                  <span class="jenis {b.jenis}">{fmt(b.bobot)}</span>
                </a>
              {/if}
            </td>
          {/each}
          <td class="num"><b>{fmt(a.bobot)}</b></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .mx { font-size: 0.86rem; min-width: 640px; }
  .mx th { white-space: nowrap; }
  .mx th[style] { color: var(--c); border-bottom: 2px solid var(--c); }
  .n {
    display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; margin-right: 2px;
    background: var(--c); color: var(--surface); font-size: 0.7rem; font-weight: 700;
  }
  .topik { display: flex; flex-direction: column; line-height: 1.3; min-width: 170px; }
  .topik .mono { font-size: 0.78rem; color: var(--muted); }
  .cell { position: relative; padding: 4px; }
  .cell:not(.end)::after {
    content: '→'; position: absolute; right: -6px; top: 50%; transform: translateY(-50%);
    color: var(--muted); font-size: 0.75rem; z-index: 1;
  }
  .cell a {
    display: flex; flex-direction: column; padding: 4px 8px; border: 1px solid var(--border);
    border-radius: var(--radius); background: var(--surface); color: var(--text); text-decoration: none;
  }
  .cell a { border-left: 3px solid var(--c); }
  .cell a:hover { border-color: var(--c); background: color-mix(in srgb, var(--c) 8%, var(--surface)); }
  .cell .mono { font-weight: 600; }
</style>
