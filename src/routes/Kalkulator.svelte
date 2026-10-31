<script>
  import { fmt } from '../lib/data.js';
  import { hitung, AMBANG, MIN_BUTIR, MIN_RERATA } from '../lib/score.js';
  import { href } from '../lib/router.svelte.js';

  let { jenjang } = $props();

  // Komponen ini di-remount per jenjang ({#key} di App), jadi nilai awal jenjang cukup.
  // svelte-ignore state_referenced_locally
  const KEY = `led-skor-${jenjang.id}`;
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };

  let skor = $state(load());
  let normalisasi = $state(false);
  let hasil = $derived(hitung(jenjang, skor, { normalisasi }));
  let bukanEmpatRatus = $derived(Math.abs(jenjang.totalBobot - 400) > 1e-9);

  $effect(() => {
    const data = JSON.stringify(skor);
    try { localStorage.setItem(KEY, data); } catch {}
  });

  function set(no, v) {
    if (v === '' || v == null || Number.isNaN(+v)) delete skor[no];
    else skor[no] = Math.min(4, Math.max(0, +v));
  }
  function isiSemua(v) {
    for (const b of jenjang.butir) skor[b.no] = v;
  }
  function reset() {
    for (const k of Object.keys(skor)) delete skor[k];
  }
  function ekspor() {
    const blob = new Blob([JSON.stringify({ jenjang: jenjang.id, skor }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `skor-led-${jenjang.id}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async function impor(e) {
    const f = e.currentTarget.files[0];
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      reset();
      for (const [k, v] of Object.entries(data.skor || data)) set(k, v);
    } catch {
      alert('File tidak valid.');
    }
    e.currentTarget.value = '';
  }

  const warna = (s) => (s == null ? '' : s >= 3.5 ? 's4' : s >= 3 ? 's3' : s >= 2 ? 's2' : 's1');
  const pct = (a, b) => (b ? Math.min(100, (a / b) * 100) : 0);
</script>

<div class="layout">
  <div class="inputs">
    <div class="card toolbar no-print">
      <div>
        <h1>Kalkulator Nilai Akhir — {jenjang.nama}</h1>
        <p class="muted small">
          Masukkan skor 0–4 (boleh desimal) untuk setiap butir. Nilai akhir = Σ(bobot × skor) ÷ 4. Skor tersimpan otomatis di
          peramban ini.
        </p>
      </div>
      <div class="actions">
        <button class="btn" onclick={() => isiSemua(3)}>Isi semua 3</button>
        <button class="btn" onclick={() => isiSemua(4)}>Isi semua 4</button>
        <button class="btn" onclick={reset}>Kosongkan</button>
        <button class="btn" onclick={ekspor}>Ekspor</button>
        <label class="btn">Impor<input type="file" accept="application/json" onchange={impor} hidden /></label>
        <button class="btn" onclick={() => print()}>Cetak</button>
      </div>
    </div>

    {#each hasil.perKriteria as k}
      <div class="card group">
        <div class="ghead">
          <h3>{k.nama}</h3>
          <div class="small muted">
            {fmt(k.nilai)} / {fmt(k.maks)}
            {#if k.rerata != null} · rerata {fmt(k.rerata)}{/if}
            {#if k.syaratUnggul}<span class="key" title="Kriteria penentu syarat Unggul">syarat Unggul</span>{/if}
          </div>
        </div>
        {#each k.butir as b}
          {@const s = skor[b.no]}
          <div class="row" class:warn={k.syaratUnggul && s != null && s < MIN_BUTIR}>
            <a class="kode" href={href(jenjang.id, 'butir', b.no)} title="Lihat rubrik">{b.kode}</a>
            <span class="el">{b.elemen.replace(/^\d\.\d\.?\s*\[[A-Z]+\]\s*/, '').replace(/^\d\.\d\s*/, '')}</span>
            <span class="chip {b.jenis}">{b.jenis} · {fmt(b.bobot)}</span>
            <div class="score">
              {#each [1, 2, 3, 4] as v}
                <button class="sb {warna(v)}" class:on={s === v} onclick={() => set(b.no, s === v ? '' : v)}>{v}</button>
              {/each}
              <input
                type="number" min="0" max="4" step="0.01" value={s ?? ''} placeholder="–"
                aria-label="Skor {b.kode}"
                onchange={(e) => set(b.no, e.currentTarget.value)}
              />
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <aside class="summary">
    <div class="card">
      <div class="muted small">Nilai akhir</div>
      <div class="na">{fmt(hasil.nilaiAkhir)}<span class="muted"> / {fmt(hasil.maks)}</span></div>
      <div class="bar">
        <div class="fill" style="width:{pct(hasil.nilaiAkhir, hasil.maks)}%"></div>
        <i style="left:{pct(AMBANG.terakreditasi, hasil.maks)}%" title="200"></i>
        <i style="left:{pct(AMBANG.unggul, hasil.maks)}%" title="321"></i>
        <i style="left:{pct(AMBANG.unggul5, hasil.maks)}%" title="361"></i>
      </div>
      <div class="ticks small muted">
        {#each [AMBANG.terakreditasi, AMBANG.unggul, AMBANG.unggul5] as t}
          <span style="left:{pct(t, hasil.maks)}%">{t}</span>
        {/each}
      </div>
      <div class="status {hasil.status.kode}">{hasil.status.label}</div>
      <div class="small muted">{hasil.terisi} dari {hasil.total} butir terisi (yang kosong dihitung 0)</div>

      {#if bukanEmpatRatus}
        <label class="small norm">
          <input type="checkbox" bind:checked={normalisasi} />
          Skalakan ke 400 (total bobot {jenjang.nama} = {fmt(jenjang.totalBobot)})
        </label>
      {/if}
    </div>

    <div class="card">
      <h3>Syarat Unggul</h3>
      <ul class="checks">
        <li class:ok={hasil.nilaiAkhir >= AMBANG.unggul}>Nilai akhir ≥ {AMBANG.unggul}</li>
        <li class:ok={hasil.butirGagal.length === 0}>
          Semua butir Budaya Mutu, Pendidikan, Penelitian ≥ {fmt(MIN_BUTIR)}
          {#if hasil.butirGagal.length}<span class="muted"> ({hasil.butirGagal.length} butir belum)</span>{/if}
        </li>
        {#each hasil.perKriteria.filter((k) => k.syaratUnggul) as k}
          <li class:ok={k.rerata >= MIN_RERATA && k.terisi === k.butir.length}>
            Rerata {k.singkat} ≥ {fmt(MIN_RERATA)}: <b>{k.rerata == null ? '–' : fmt(k.rerata)}</b>
          </li>
        {/each}
      </ul>
      {#if hasil.butirGagal.length && hasil.butirGagal.length <= 12}
        <div class="small muted">
          Belum ≥ 3:
          {#each hasil.butirGagal as b, i}<a href={href(jenjang.id, 'butir', b.no)}>{b.kode}</a>{i < hasil.butirGagal.length - 1 ? ', ' : ''}{/each}
        </div>
      {/if}
    </div>

    <div class="card">
      <h3>Kontribusi per kriteria</h3>
      {#each hasil.perKriteria as k}
        <div class="kc">
          <div class="small"><span>{k.singkat}</span><span>{fmt(k.nilai)} / {fmt(k.maks)}</span></div>
          <div class="bar thin"><div class="fill" style="width:{pct(k.nilai, k.maks)}%"></div></div>
        </div>
      {/each}
    </div>

    {#if hasil.potensi.length}
      <div class="card no-print">
        <h3>Potensi kenaikan terbesar</h3>
        <p class="small muted">Tambahan nilai jika butir dinaikkan ke skor 4.</p>
        <ol class="pot small">
          {#each hasil.potensi as b}
            <li><a href={href(jenjang.id, 'butir', b.no)}>{b.kode}</a> <span class="muted">(skor {fmt(b.skor)})</span> <b>+{fmt(b.gain)}</b></li>
          {/each}
        </ol>
      </div>
    {/if}
  </aside>
</div>

<style>
  .layout { display: grid; grid-template-columns: 1fr 330px; gap: 20px; align-items: start; }
  .summary { position: sticky; top: 112px; display: flex; flex-direction: column; gap: 12px; max-height: calc(100vh - 130px); overflow-y: auto; }
  .summary .card { padding: 16px; }
  .toolbar { margin-bottom: 14px; }
  .toolbar h1 { font-size: 1.35rem; }
  .actions { display: flex; flex-wrap: wrap; gap: 6px; }
  .group { margin-bottom: 14px; padding: 14px 16px; }
  .ghead { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
  .ghead h3 { margin: 0; }
  .key { margin-left: 6px; background: var(--o-soft); color: var(--o); padding: 1px 6px; border-radius: 999px; }
  .row {
    display: grid; grid-template-columns: 56px 1fr auto auto; gap: 10px; align-items: center;
    padding: 8px 0; border-top: 1px solid var(--border); font-size: 0.88rem;
  }
  .row.warn { background: var(--danger-soft); margin: 0 -8px; padding: 8px; border-radius: 6px; }
  .kode { font-weight: 700; }
  .el { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--muted); }
  .score { display: flex; gap: 3px; align-items: center; }
  .sb { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--surface); border-radius: 6px; cursor: pointer; font-weight: 600; }
  .sb.on.s4, .sb.on.s3 { background: var(--ok); border-color: var(--ok); color: #fff; }
  .sb.on.s2 { background: var(--p); border-color: var(--p); color: #fff; }
  .sb.on.s1 { background: var(--danger); border-color: var(--danger); color: #fff; }
  .score input { width: 64px; padding: 4px 6px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface-2); text-align: right; }
  .na { font-size: 2.4rem; font-weight: 800; line-height: 1.1; }
  .na span { font-size: 1rem; font-weight: 500; }
  .bar { position: relative; height: 10px; background: var(--surface-2); border-radius: 999px; margin: 10px 0 2px; overflow: hidden; }
  .bar.thin { height: 6px; margin: 4px 0 8px; }
  .fill { height: 100%; background: var(--accent); border-radius: 999px; transition: width 0.2s; }
  .bar i { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--text); opacity: 0.35; }
  .ticks { position: relative; height: 16px; }
  .ticks span { position: absolute; transform: translateX(-50%); }
  .status { margin: 8px 0 4px; padding: 8px 12px; border-radius: 8px; font-weight: 700; }
  .status.tidak { background: var(--danger-soft); color: var(--danger); }
  .status.terakreditasi { background: var(--p-soft); color: var(--p); }
  .status.unggul3, .status.unggul5 { background: var(--o-soft); color: var(--o); }
  .norm { display: flex; gap: 6px; align-items: flex-start; margin-top: 10px; }
  .checks { list-style: none; padding: 0; margin: 0 0 8px; font-size: 0.88rem; }
  .checks li { padding: 3px 0 3px 22px; position: relative; }
  .checks li::before { content: '✗'; position: absolute; left: 2px; color: var(--danger); font-weight: 700; }
  .checks li.ok::before { content: '✓'; color: var(--ok); }
  .kc .small { display: flex; justify-content: space-between; }
  .pot { padding-left: 1.2em; margin: 0; }
  @media (max-width: 960px) {
    .layout { grid-template-columns: 1fr; }
    .summary { position: static; max-height: none; order: -1; }
  }
  @media (max-width: 600px) {
    .row { grid-template-columns: 50px 1fr; }
    .row .chip { justify-self: start; }
    .score { grid-column: 1 / -1; }
  }
</style>
