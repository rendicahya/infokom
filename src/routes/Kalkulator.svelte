<script>
  import { fmt } from '../lib/data.js';
  import { hitung, AMBANG, MIN_BUTIR, MIN_RERATA } from '../lib/score.js';
  import { route, href } from '../lib/router.svelte.js';
  import { TAHAP } from '../lib/parse.js';
  import { untrack } from 'svelte';
  import { eksporXlsx } from '../lib/xlsx.js';

  let { jenjang } = $props();

  // Komponen ini di-remount per jenjang ({#key} di App), jadi nilai awal jenjang cukup.
  // svelte-ignore state_referenced_locally
  const KEY = `led-skor-${jenjang.id}`;
  // svelte-ignore state_referenced_locally
  const KEY_SIMPAN = `led-simpan-${jenjang.id}`;
  const load = (key, awal) => {
    try { return JSON.parse(localStorage.getItem(key)) || awal; } catch { return awal; }
  };

  let skor = $state(load(KEY, {}));
  let simpanan = $state(load(KEY_SIMPAN, []));
  let nama = $state('');
  let info = $state('');
  let tersalin = $state(false);
  let normalisasi = $state(false);
  let tampilan = $state('daftar');
  let hasil = $derived(hitung(jenjang, skor, { normalisasi }));
  let bukanEmpatRatus = $derived(Math.abs(jenjang.totalBobot - 400) > 1e-9);

  $effect(() => {
    const data = JSON.stringify(skor);
    try { localStorage.setItem(KEY, data); } catch {}
  });
  $effect(() => {
    const data = JSON.stringify(simpanan);
    try { localStorage.setItem(KEY_SIMPAN, data); } catch {}
  });

  const waktu = (t) => new Date(t).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

  function simpan(n = nama.trim() || `Perhitungan ${waktu(Date.now())}`, data = skor) {
    const item = { nama: n, skor: { ...data }, waktu: Date.now() };
    const i = simpanan.findIndex((s) => s.nama === n);
    if (i >= 0) simpanan.splice(i, 1);
    simpanan.unshift(item);
    return n;
  }
  function muat(s) {
    reset();
    for (const [k, v] of Object.entries(s.skor)) set(k, v);
    nama = s.nama;
    info = '';
  }

  // Tautan berbagi: skor diurutkan sesuai urutan butir, dipisah "_", kosong = belum diisi.
  // Contoh: #/sarjana/kalkulator?n=Simulasi&s=4_3_3.5__2
  function kodekan() {
    const a = jenjang.butir.map((b) => skor[b.no] ?? '');
    while (a.length && a.at(-1) === '') a.pop();
    return a.join('_');
  }
  async function bagikan() {
    const q = new URLSearchParams();
    if (nama.trim()) q.set('n', nama.trim());
    q.set('s', kodekan());
    const url = `${location.origin}${location.pathname}${href(jenjang.id, 'kalkulator')}?${q}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      info = `Salin tautan ini secara manual: ${url}`;
      return;
    }
    tersalin = true;
    setTimeout(() => (tersalin = false), 1500);
  }

  // Buka tautan berbagi: skor kerja sebelumnya disimpan dulu agar tidak hilang tertimpa
  $effect(() => {
    const s = route.query.s;
    if (s == null) return;
    const n = route.query.n || '';
    untrack(() => {
      const lama = { ...skor };
      reset();
      s.split('_').forEach((v, i) => jenjang.butir[i] && set(jenjang.butir[i].no, v));
      const j = JSON.stringify(lama);
      const aman = j === JSON.stringify({ ...skor }) || simpanan.some((x) => JSON.stringify(x.skor) === j);
      const cadangan = Object.keys(lama).length && !aman ? simpan(`Sebelum membuka tautan · ${waktu(Date.now())}`, lama) : null;
      nama = n;
      info = `Skor dimuat dari tautan${n ? ` “${n}”` : ''}.` + (cadangan ? ` Skor Anda sebelumnya disimpan sebagai “${cadangan}”.` : '');
    });
    history.replaceState(null, '', location.pathname + location.search + href(jenjang.id, 'kalkulator'));
    route.query = {};
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
  let mengekspor = $state(false);
  async function unduhXlsx() {
    mengekspor = true;
    try {
      await eksporXlsx(jenjang, skor, { nama: nama.trim(), normalisasi });
    } catch {
      info = 'Gagal membuat file Excel.';
    }
    mengekspor = false;
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

  const nilaiAlur = (a) => a.butir.reduce((t, b) => t + (b ? (b.bobot * (skor[b.no] ?? 0)) / 4 : 0), 0);
  const ringkas = (b) => b.elemen.replace(/^\d\.\d\.?\s*\[[A-Z]+\]\s*/, '').replace(/^\d\.\d\s*/, '');

  const warna = (s) => (s == null ? '' : s >= 3.5 ? 's4' : s >= 3 ? 's3' : s >= 2 ? 's2' : 's1');
  const pct = (a, b) => (b ? Math.min(100, (a / b) * 100) : 0);
</script>

<div class="layout">
  <div class="inputs">
    <div class="toolbar no-print">
      <div class="label">Program {jenjang.nama}</div>
      <h1>Kalkulator nilai akhir</h1>
      <p class="muted small">
        Masukkan skor 0–4 (boleh desimal) untuk setiap butir. Nilai akhir = Σ(bobot × skor) ÷ 4. Skor kerja tersimpan
        otomatis di peramban ini; beri nama dan simpan untuk menyimpan beberapa skenario, atau salin tautan untuk dibagikan.
      </p>
      <div class="simpan">
        <input type="text" placeholder="Nama perhitungan, mis. Simulasi target 2026" bind:value={nama} aria-label="Nama perhitungan" />
        <button class="btn primary" onclick={() => { nama = simpan(); info = `Tersimpan sebagai “${nama}”.`; }}>Simpan</button>
        <button class="btn" onclick={bagikan} title="Salin tautan yang memuat semua skor ini">{tersalin ? 'Tautan tersalin' : 'Salin tautan'}</button>
      </div>
      {#if info}<p class="info small">{info}</p>{/if}
      {#if simpanan.length}
        <details class="daftar" open>
          <summary class="small">Perhitungan tersimpan ({simpanan.length})</summary>
          <table class="small">
            <tbody>
              {#each simpanan as s, i (s.nama)}
                <tr class:aktif={s.nama === nama}>
                  <td>{s.nama}</td>
                  <td class="num mono">{fmt(hitung(jenjang, s.skor).nilaiAkhir)}</td>
                  <td class="muted">{waktu(s.waktu)}</td>
                  <td class="num aksi">
                    <button class="link" onclick={() => muat(s)}>Muat</button>
                    <button class="link hapus" onclick={() => simpanan.splice(i, 1)}>Hapus</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </details>
      {/if}
      <div class="actions">
        <span class="seg" role="group" aria-label="Tampilan">
          <button class:on={tampilan === 'daftar'} onclick={() => (tampilan = 'daftar')}>Daftar</button>
          <button class:on={tampilan === 'alur'} onclick={() => (tampilan = 'alur')}>Matriks alur PPEPP</button>
        </span>
        <span class="sp"></span>
        <button class="btn" onclick={() => isiSemua(3)}>Isi semua 3</button>
        <button class="btn" onclick={() => isiSemua(4)}>Isi semua 4</button>
        <button class="btn" onclick={() => { reset(); nama = ''; info = ''; }}>Kosongkan</button>
        <button class="btn" onclick={unduhXlsx} disabled={mengekspor} title="Unduh hasil perhitungan sebagai file Excel">{mengekspor ? 'Menyiapkan…' : 'Ekspor Excel'}</button>
        <button class="btn" onclick={ekspor} title="Unduh skor sebagai JSON untuk diimpor kembali">Ekspor JSON</button>
        <label class="btn">Impor<input type="file" accept="application/json" onchange={impor} hidden /></label>
        <button class="btn" onclick={() => print()}>Cetak</button>
      </div>
    </div>

    {#snippet input(b, s)}
      <input
        type="number" min="0" max="4" step="0.01" value={s ?? ''} placeholder="–"
        aria-label="Skor {b.kode}"
        onkeydown={(e) => [',', 'e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
        onpaste={(e) => /[^\d.]/.test(e.clipboardData.getData('text').trim()) && e.preventDefault()}
        onchange={(e) => {
          // Di luar 0–4 ditolak (bukan dipotong) agar salah ketik seperti "35" tidak diam-diam menjadi 4
          const v = e.currentTarget.value;
          if (v !== '' && (+v > 4 || +v < 0)) e.currentTarget.value = s ?? '';
          else set(b.no, v);
        }}
      />
    {/snippet}

    {#each hasil.perKriteria as k}
      <section class="group">
        <div class="ghead">
          <h3>{k.nama}</h3>
          <div class="small muted">
            <span class="mono">{fmt(k.nilai)} / {fmt(k.maks)}</span>
            {#if k.rerata != null} · rerata <span class="mono">{fmt(k.rerata)}</span>{/if}
            {#if k.syaratUnggul}<span class="key" title="Kriteria penentu syarat Unggul">syarat Unggul</span>{/if}
          </div>
        </div>
        {#if tampilan === 'alur' && k.alur?.length}
          <div class="table-wrap">
            <table class="mx">
              <thead>
                <tr><th>Alur</th>{#each TAHAP as t}<th>{t}</th>{/each}<th class="num">Nilai</th></tr>
              </thead>
              <tbody>
                {#each k.alur as a}
                  <tr>
                    <td class="topik"><span class="mono">{a.label}</span> {a.judul}</td>
                    {#each a.butir as b}
                      {@const s = skor[b.no]}
                      <td class="cell {warna(s)}" class:warn={k.syaratUnggul && s != null && s < MIN_BUTIR}>
                        <a class="mono" href={href(jenjang.id, 'butir', b.no)} title="Bobot {fmt(b.bobot)}">{b.kode}</a>
                        {@render input(b, s)}
                      </td>
                    {/each}
                    <td class="num mono">{fmt(nilaiAlur(a))}<span class="muted"> / {fmt(a.bobot)}</span></td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          {#each k.butir as b}
            {@const s = skor[b.no]}
            <div class="row" class:warn={k.syaratUnggul && s != null && s < MIN_BUTIR}>
              <a class="kode" href={href(jenjang.id, 'butir', b.no)} title="Lihat rubrik">{b.kode}</a>
              <span class="el">{ringkas(b)}</span>
              <span class="jenis {b.jenis}">{fmt(b.bobot)}</span>
              <div class="score">
                {#each [1, 2, 3, 4] as v}
                  <button class="sb {warna(v)}" class:on={s === v} onclick={() => set(b.no, s === v ? '' : v)}>{v}</button>
                {/each}
                {@render input(b, s)}
              </div>
            </div>
          {/each}
        {/if}
      </section>
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
  .layout { display: grid; grid-template-columns: 1fr 320px; gap: 36px; align-items: start; }
  .summary { position: sticky; top: 108px; display: flex; flex-direction: column; gap: 12px; max-height: calc(100vh - 124px); overflow-y: auto; }
  .summary .card { padding: 16px; }
  .summary h3 { font-size: 1rem; }
  .toolbar { margin-bottom: 8px; }
  .toolbar h1 { margin: 4px 0 6px; }
  .actions { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-top: 12px; }
  .sp { flex: 1; }
  .simpan { display: flex; gap: 6px; margin-top: 12px; }
  .simpan input { flex: 1; min-width: 0; padding: 6px 9px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }
  .info { margin: 8px 0 0; padding: 6px 10px; border-left: 3px solid var(--accent); background: var(--accent-soft); overflow-wrap: anywhere; }
  .daftar { margin-top: 10px; }
  .daftar summary { cursor: pointer; color: var(--muted); }
  .daftar td { padding: 5px 8px; vertical-align: middle; }
  .daftar tr.aktif td:first-child { font-weight: 600; box-shadow: inset 2px 0 0 var(--accent); }
  .daftar .aksi { white-space: nowrap; }
  .link { border: 0; background: none; padding: 0 0 0 10px; cursor: pointer; color: var(--link); text-decoration: underline; text-underline-offset: 2px; }
  .link.hapus { color: var(--danger); }
  .seg { display: inline-flex; border: 1px solid var(--border-strong); border-radius: var(--radius); overflow: hidden; }
  .seg button { border: 0; background: transparent; padding: 5px 11px; cursor: pointer; font-size: 0.88rem; color: var(--muted); }
  .seg button.on { background: var(--text); color: var(--bg); }
  .group { margin-top: 26px; }
  .ghead {
    display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 6px;
    padding-bottom: 4px; border-bottom: 1px solid var(--border-strong);
  }
  .ghead h3 { margin: 0; }
  .key { margin-left: 8px; color: var(--ok); border: 1px solid currentColor; padding: 0 5px; font-size: 0.75rem; border-radius: var(--radius); }
  .row {
    display: grid; grid-template-columns: 56px 1fr auto auto; gap: 12px; align-items: center;
    padding: 7px 0; border-bottom: 1px solid var(--border); font-size: 0.88rem;
  }
  .row.warn { box-shadow: inset 3px 0 0 var(--danger); padding-left: 8px; background: var(--danger-soft); }
  .kode { font-family: var(--mono); font-weight: 600; }
  .el { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--muted); }
  .score { display: flex; gap: 3px; align-items: center; }
  .sb { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--surface); border-radius: var(--radius); cursor: pointer; font-family: var(--mono); }
  .sb:hover { border-color: var(--text); }
  .sb.on.s4, .sb.on.s3 { background: var(--ok); border-color: var(--ok); color: var(--bg); }
  .sb.on.s2 { background: var(--p); border-color: var(--p); color: var(--bg); }
  .sb.on.s1 { background: var(--danger); border-color: var(--danger); color: var(--bg); }
  input[type='number'] { width: 64px; padding: 4px 6px; text-align: right; font-family: var(--mono); }
  .mx { font-size: 0.85rem; min-width: 640px; }
  .mx .topik { min-width: 150px; line-height: 1.3; }
  .mx td.num { white-space: nowrap; }
  .mx .topik .mono { color: var(--muted); font-size: 0.78rem; display: block; }
  .mx .cell { padding: 6px 4px; }
  .mx .cell a { display: block; font-weight: 600; font-size: 0.8rem; text-decoration: none; color: var(--text); }
  .mx .cell input { width: 100%; max-width: 72px; }
  .mx .cell.s4 input, .mx .cell.s3 input { border-color: var(--ok); }
  .mx .cell.s2 input { border-color: var(--p); }
  .mx .cell.s1 input, .mx .cell.warn input { border-color: var(--danger); background: var(--danger-soft); }
  .na { font-family: var(--serif); font-size: 2.6rem; font-weight: 700; line-height: 1.1; font-variant-numeric: tabular-nums; }
  .na span { font-family: var(--sans); font-size: 1rem; font-weight: 400; }
  .bar { position: relative; height: 8px; background: var(--surface-2); margin: 12px 0 2px; overflow: hidden; border-radius: 4px; }
  .bar.thin { height: 4px; margin: 4px 0 8px; }
  .fill { height: 100%; background: var(--accent); border-radius: inherit; transition: width 0.2s; }
  .bar i { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--text); }
  .ticks { position: relative; height: 16px; font-family: var(--mono); }
  .ticks span { position: absolute; transform: translateX(-50%); }
  .status { margin: 10px 0 4px; padding: 6px 10px; border-left: 3px solid currentColor; font-weight: 600; }
  .status.tidak { color: var(--danger); background: var(--danger-soft); }
  .status.terakreditasi { color: var(--p); background: var(--p-soft); }
  .status.unggul3, .status.unggul5 { color: var(--o); background: var(--o-soft); }
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
    .row .jenis { justify-self: start; }
    .score { grid-column: 1 / -1; }
  }
</style>
