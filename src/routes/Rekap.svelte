<script>
  import { JENJANG, KRITERIA, fmt } from '../lib/data.js';
  import { JENIS, TAHAP } from '../lib/parse.js';

  let { jenjang } = $props();

  const pct = (a, b) => (b ? (a / b) * 100 : 0);

  let ipo = $derived(
    ['I', 'P', 'O'].map((j) => {
      const list = jenjang.butir.filter((b) => b.jenis === j);
      return { j, n: list.length, bobot: list.reduce((a, b) => a + b.bobot, 0) };
    }),
  );

  let perTahap = $derived(
    TAHAP.map((t, i) => {
      const list = jenjang.butir.filter((b) => b.tahapNo === i + 1 && b.kriteria !== 'suplemen');
      return { t, n: list.length, bobot: list.reduce((a, b) => a + b.bobot, 0) };
    }),
  );

  const bobotKriteria = (j, id) => j.butir.filter((b) => b.kriteria === id).reduce((a, b) => a + b.bobot, 0);
  let maxK = $derived(Math.max(...jenjang.kriteria.map((k) => k.bobot)));
</script>

<div class="label">Program {jenjang.nama}</div>
<h1>Rekap bobot</h1>
<p class="muted">Dihitung langsung dari Matriks Penilaian {jenjang.nama}. Total bobot: <b>{fmt(jenjang.totalBobot)}</b> dari {jenjang.butir.length} butir.</p>

<div class="grid">
  <div class="card">
    <h2>Bobot per kriteria</h2>
    {#each jenjang.kriteria as k}
      <div class="hb">
        <div class="lbl"><span>{k.nama}</span><span class="muted small">{k.butir.length} butir</span></div>
        <div class="track"><div class="fill" style="width:{pct(k.bobot, maxK)}%"></div></div>
        <div class="val"><b>{fmt(k.bobot)}</b> <span class="muted small">{fmt(pct(k.bobot, jenjang.totalBobot), 1)}%</span></div>
      </div>
    {/each}
  </div>

  <div class="card">
    <h2>Input · Proses · Output</h2>
    <div class="stack">
      {#each ipo as x}
        <div class="seg {x.j}" style="flex:{x.bobot}" title="{JENIS[x.j]}: {fmt(x.bobot)}"></div>
      {/each}
    </div>
    <table>
      <thead><tr><th>Jenis</th><th class="num">Butir</th><th class="num">Bobot</th><th class="num">%</th></tr></thead>
      <tbody>
        {#each ipo as x}
          <tr><td><span class="jenis {x.j}">{x.j}</span> {JENIS[x.j]}</td><td class="num">{x.n}</td><td class="num">{fmt(x.bobot)}</td><td class="num">{fmt(pct(x.bobot, jenjang.totalBobot), 1)}%</td></tr>
        {/each}
      </tbody>
    </table>

    <h2 class="mt">Per tahap PPEPP</h2>
    <p class="small muted">Kriteria 1–6, tanpa Profil dan Suplemen.</p>
    <table>
      <tbody>
        {#each perTahap as x}
          <tr><td>{x.t}</td><td class="num">{x.n} butir</td><td class="num"><b>{fmt(x.bobot)}</b></td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<div class="card mb">
  <h2>Bobot per alur PPEPP</h2>
  <p class="small muted">Satu alur = lima butir berhuruf sama dalam satu kriteria (Penetapan → Peningkatan).</p>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Alur</th><th>Topik</th>{#each TAHAP as t}<th class="num">{t}</th>{/each}<th class="num">Total</th></tr></thead>
      <tbody>
        {#each jenjang.alur as a}
          <tr>
            <td class="mono">{a.label}</td>
            <td>{a.judul}</td>
            {#each a.butir as b}<td class="num">{b ? fmt(b.bobot) : '–'}</td>{/each}
            <td class="num"><b>{fmt(a.bobot)}</b></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<div class="card">
  <h2>Perbandingan antarjenjang</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Kriteria</th>{#each JENJANG as j}<th class="num" class:cur={j.id === jenjang.id}>{j.nama}</th>{/each}</tr>
      </thead>
      <tbody>
        {#each KRITERIA as k}
          <tr>
            <td>{k.nama}</td>
            {#each JENJANG as j}<td class="num" class:cur={j.id === jenjang.id}>{fmt(bobotKriteria(j, k.id))}</td>{/each}
          </tr>
        {/each}
        <tr class="total">
          <td>Total</td>
          {#each JENJANG as j}<td class="num" class:cur={j.id === jenjang.id}>{fmt(j.totalBobot)}</td>{/each}
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="card mt">
  <h2>Status akreditasi</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Nilai akhir</th><th>Syarat tambahan</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>&lt; 200</td><td>–</td><td>Tidak Terakreditasi</td></tr>
        <tr><td>200 ≤ NA &lt; 321</td><td>–</td><td>Terakreditasi</td></tr>
        <tr><td>≥ 321</td><td>Ada butir Budaya Mutu/Pendidikan/Penelitian &lt; 3,00, atau rerata salah satu kriteria tersebut &lt; 3,20</td><td>Terakreditasi</td></tr>
        <tr><td>321 ≤ NA &lt; 361</td><td>Semua butir ketiga kriteria ≥ 3,00 dan rerata tiap kriteria ≥ 3,20</td><td><b>Unggul</b> (3 tahun)</td></tr>
        <tr><td>≥ 361</td><td>Sama seperti di atas</td><td><b>Unggul</b> (5 tahun)</td></tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  /* min() mencegah kolom 340px melebihi lebar layar HP */
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap: 16px; margin: 16px 0; }
  .mt { margin-top: 16px; }
  .mb { margin-bottom: 16px; }
  h2.mt { margin-top: 22px; }
  .hb { display: grid; grid-template-columns: 170px 1fr 92px; gap: 10px; align-items: center; margin: 8px 0; }
  .lbl { display: flex; flex-direction: column; line-height: 1.2; font-size: 0.9rem; }
  .track { height: 10px; background: var(--surface-2); overflow: hidden; }
  .fill { height: 100%; background: var(--text); }
  .val { text-align: right; font-variant-numeric: tabular-nums; }
  .stack { display: flex; height: 14px; overflow: hidden; gap: 2px; margin: 8px 0 12px; }
  .seg.I { background: var(--i); }
  .seg.P { background: var(--p); }
  .seg.O { background: var(--o); }
  .cur { background: var(--surface); font-weight: 700; }
  h2 { font-size: 1.15rem; }
  .total td { font-weight: 700; }
  @media (max-width: 520px) {
    .hb { grid-template-columns: 1fr auto; gap: 4px 10px; margin: 12px 0; }
    .lbl { flex-direction: row; gap: 8px; align-items: baseline; }
    .lbl .small { white-space: nowrap; }
    .track { grid-column: 1 / -1; grid-row: 2; height: 8px; }
    table { font-size: 0.86rem; }
    th, td { padding: 7px 8px; }
  }
</style>
