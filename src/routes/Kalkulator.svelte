<script>
  import { fmt } from '../lib/data.js';
  import { hitung, AMBANG, MIN_BUTIR, MIN_RERATA } from '../lib/score.js';
  import { route, href } from '../lib/router.svelte.js';
  import { TAHAP } from '../lib/parse.js';
  import { untrack } from 'svelte';
  import { eksporXlsx } from '../lib/xlsx.js';
  import Md from '../lib/Md.svelte';
  import { rahasia } from '../lib/rahasia.svelte.js';
  import { unggah, daftar as daftarAwan, hapus as hapusAwan, konfigurasi } from '../lib/awan.js';

  let { jenjang } = $props();

  // Komponen ini di-remount per jenjang ({#key} di App), jadi nilai awal jenjang cukup.
  // svelte-ignore state_referenced_locally
  const KEY = `led-skor-${jenjang.id}`;
  // svelte-ignore state_referenced_locally
  const KEY_CATATAN = `led-catatan-${jenjang.id}`;
  // svelte-ignore state_referenced_locally
  const KEY_SIMPAN = `led-simpan-${jenjang.id}`;
  const load = (key, awal) => {
    try { return JSON.parse(localStorage.getItem(key)) || awal; } catch { return awal; }
  };

  let skor = $state(load(KEY, {}));
  let catatan = $state(load(KEY_CATATAN, {}));
  let simpanan = $state(load(KEY_SIMPAN, []));
  // Deskriptor yang dibuka dan catatan yang dilebarkan, per nomor butir
  let deskBuka = $state({});
  let catatanLebar = $state({});
  let adaDeskriptor = $derived(jenjang.butir.some((b) => b.deskriptor));
  let semuaDeskBuka = $derived(jenjang.butir.every((b) => !b.deskriptor || deskBuka[b.no]));
  let semuaDeskTutup = $derived(jenjang.butir.every((b) => !deskBuka[b.no]));
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
    const data = JSON.stringify(catatan);
    try { localStorage.setItem(KEY_CATATAN, data); } catch {}
  });
  $effect(() => {
    const data = JSON.stringify(simpanan);
    try { localStorage.setItem(KEY_SIMPAN, data); } catch {}
  });

  const waktu = (t) => new Date(t).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  const namaBawaan = () => nama.trim() || `Perhitungan ${waktu(Date.now())}`;
  const salinCatatan = (c) => Object.fromEntries(Object.entries(c).filter(([, v]) => v?.trim()));

  function simpan(n = namaBawaan(), data = skor, cat = catatan) {
    const item = { nama: n, skor: { ...data }, catatan: salinCatatan(cat), waktu: Date.now() };
    const i = simpanan.findIndex((s) => s.nama === n);
    if (i >= 0) simpanan.splice(i, 1);
    simpanan.unshift(item);
    return n;
  }
  function muat(s) {
    reset();
    resetCatatan();
    for (const [k, v] of Object.entries(s.skor || {})) set(k, v);
    for (const [k, v] of Object.entries(s.catatan || {})) if (typeof v === 'string' && v) catatan[k] = v;
    nama = s.nama || '';
    if (typeof s.normalisasi === 'boolean') normalisasi = s.normalisasi;
    info = '';
  }

  // Paket lengkap untuk file .lam dan Firebase: skor, catatan, dan informasi butir & hasil
  function paket(n) {
    return {
      format: 'infokom-lam',
      versi: 1,
      jenjang: jenjang.id,
      nama: n,
      waktu: Date.now(),
      normalisasi,
      nilaiAkhir: hasil.nilaiAkhir,
      status: hasil.status.label,
      terisi: hasil.terisi,
      skor: { ...skor },
      catatan: salinCatatan(catatan),
      butir: jenjang.butir.map((b) => ({
        no: b.no, kode: b.kode, kriteria: b.kriteria, jenis: b.jenis, bobot: b.bobot,
        skor: skor[b.no] ?? null, catatan: catatan[b.no]?.trim() || '',
      })),
    };
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
  function resetCatatan() {
    for (const k of Object.keys(catatan)) delete catatan[k];
  }
  function setCatatan(no, v) {
    if (v.trim()) catatan[no] = v;
    else delete catatan[no];
  }
  function bukaSemuaDesk(buka) {
    for (const b of jenjang.butir) if (b.deskriptor) deskBuka[b.no] = buka;
  }

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  function simpanFile() {
    const n = namaBawaan();
    const blob = new Blob([JSON.stringify(paket(n), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `penilaian-${jenjang.id}-${slug(nama.trim()) || 'led'}.lam`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    info = `Tersimpan ke file ${a.download}.`;
  }
  async function bukaFile(e) {
    const el = e.currentTarget;
    const f = el.files[0];
    el.value = '';
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (data.jenjang && data.jenjang !== jenjang.id) {
        info = `File ini untuk program ${data.jenjang}, bukan ${jenjang.nama}. Buka dari halaman kalkulator jenjang tersebut.`;
        return;
      }
      // File JSON lama hanya berisi { jenjang, skor } atau peta skor langsung
      muat(data.skor ? data : { skor: data });
      if (!nama) nama = f.name.replace(/\.(lam|json)$/i, '');
      info = `Dimuat dari file ${f.name}.`;
    } catch {
      info = 'File tidak valid.';
    }
  }

  // Firebase: hanya setelah password dimasukkan
  let terbuka = $derived(!!rahasia.data);
  let adaAwan = $derived(terbuka && !!konfigurasi()?.projectId);
  let awan = $state(null);
  let sibukAwan = $state(false);
  async function kerjakanAwan(fn) {
    sibukAwan = true;
    try {
      await fn();
    } catch (err) {
      info = `Firebase: ${err?.message || err}`;
    }
    sibukAwan = false;
  }
  const muatDaftarAwan = () => kerjakanAwan(async () => (awan = await daftarAwan(jenjang.id)));
  const unggahAwan = () =>
    kerjakanAwan(async () => {
      const n = namaBawaan();
      await unggah(jenjang.id, paket(n));
      nama = n;
      info = `Terunggah ke Firebase sebagai “${n}”.`;
      awan = await daftarAwan(jenjang.id);
    });
  const hapusDariAwan = (x) =>
    confirm(`Hapus “${x.nama}” dari Firebase?`) &&
    kerjakanAwan(async () => {
      await hapusAwan(jenjang.id, x.id);
      awan = awan.filter((y) => y.id !== x.id);
    });

  let mengekspor = $state(false);
  async function unduhXlsx() {
    mengekspor = true;
    try {
      await eksporXlsx(jenjang, skor, { nama: nama.trim(), normalisasi, catatan });
    } catch {
      info = 'Gagal membuat file Excel.';
    }
    mengekspor = false;
  }

  const nilaiAlur = (a) => a.butir.reduce((t, b) => t + (b ? (b.bobot * (skor[b.no] ?? 0)) / 4 : 0), 0);

  // Layar sempit: ringkasan ada di bawah daftar butir; bilah nilai di dasar layar disembunyikan saat ringkasan terlihat
  let ringkasan;
  let ringkasanTerlihat = $state(false);
  $effect(() => {
    const io = new IntersectionObserver(([e]) => (ringkasanTerlihat = e.isIntersecting));
    io.observe(ringkasan);
    return () => io.disconnect();
  });

  const warna = (s) => (s == null ? '' : s >= 3.5 ? 's4' : s >= 3 ? 's3' : s >= 2 ? 's2' : 's1');
  const pct = (a, b) => (b ? Math.min(100, (a / b) * 100) : 0);
</script>

<div class="layout">
  <div class="inputs">
    <div class="toolbar no-print">
      <div class="label">Program {jenjang.nama}</div>
      <h1>Kalkulator nilai akhir</h1>
      <p class="muted small">
        Pilih skor 1–4 untuk setiap butir dan tulis catatan bila perlu. Nilai akhir = Σ(bobot × skor) ÷ 4. Skor dan
        catatan kerja tersimpan otomatis di peramban ini; simpan ke file <span class="mono">.lam</span> untuk dipindahkan
        atau diarsipkan{#if terbuka}, atau unggah ke Firebase agar bisa dibuka anggota tim{/if}.
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
      <div class="berkas">
        <button class="btn" onclick={simpanFile} title="Unduh skor, catatan, dan informasi penilaian sebagai file .lam">Simpan ke file .lam</button>
        <label class="btn" title="Muat skor dan catatan dari file .lam">Buka file .lam<input type="file" accept=".lam,application/json" onchange={bukaFile} hidden /></label>
        {#if adaAwan}
          <button class="btn primary" onclick={unggahAwan} disabled={sibukAwan} title="Unggah skor, catatan, dan informasi penilaian ke Firebase">{sibukAwan ? 'Memproses…' : 'Unggah ke Firebase'}</button>
          <button class="btn" onclick={muatDaftarAwan} disabled={sibukAwan}>{awan ? 'Muat ulang daftar Firebase' : 'Lihat di Firebase'}</button>
        {:else if terbuka}
          <span class="small muted">Konfigurasi Firebase belum diatur, jadi unggah belum tersedia.</span>
        {:else}
          <span class="small muted">Masukkan password (ikon gembok) untuk mengunggah ke Firebase.</span>
        {/if}
      </div>
      {#if adaAwan && awan}
        <details class="daftar" open>
          <summary class="small">Tersimpan di Firebase ({awan.length})</summary>
          {#if awan.length}
            <table class="small">
              <tbody>
                {#each awan as x (x.id)}
                  <tr class:aktif={x.nama === nama}>
                    <td>{x.nama}</td>
                    <td class="num mono">{fmt(hitung(jenjang, x.skor || {}).nilaiAkhir)}</td>
                    <td class="muted">{waktu(x.waktu)}</td>
                    <td class="num aksi">
                      <button class="link" onclick={() => { muat(x); info = `Dimuat dari Firebase: “${x.nama}”.`; }}>Muat</button>
                      <button class="link hapus" onclick={() => hapusDariAwan(x)}>Hapus</button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {:else}
            <p class="small muted">Belum ada penilaian yang diunggah untuk program {jenjang.nama}.</p>
          {/if}
        </details>
      {/if}
      <div class="actions">
        <span class="seg" role="group" aria-label="Tampilan">
          <button class:on={tampilan === 'daftar'} onclick={() => (tampilan = 'daftar')}>Daftar</button>
          <button class:on={tampilan === 'alur'} onclick={() => (tampilan = 'alur')}>Matriks alur PPEPP</button>
        </span>
        {#if tampilan === 'daftar' && adaDeskriptor}
          <span class="seg" role="group" aria-label="Deskriptor">
            <button class:on={semuaDeskBuka} onclick={() => bukaSemuaDesk(true)}>Expand all</button>
            <button class:on={semuaDeskTutup} onclick={() => bukaSemuaDesk(false)}>Collapse all</button>
          </span>
        {/if}
        <span class="sp"></span>
        <button class="btn" onclick={() => isiSemua(3)}>Isi semua 3</button>
        <button class="btn" onclick={() => isiSemua(4)}>Isi semua 4</button>
        <button class="btn" onclick={() => { if (Object.keys(catatan).length && !confirm('Kosongkan semua skor dan catatan?')) return; reset(); resetCatatan(); nama = ''; info = ''; }}>Kosongkan</button>
        <button class="btn" onclick={unduhXlsx} disabled={mengekspor} title="Unduh hasil perhitungan sebagai file Excel">{mengekspor ? 'Menyiapkan…' : 'Ekspor Excel'}</button>
        <button class="btn" onclick={() => print()}>Cetak</button>
      </div>
    </div>

    {#snippet tombol(b, s, kecil = false)}
      <div class="score" class:kecil role="group" aria-label="Skor {b.kode}">
        {#each [1, 2, 3, 4] as v}
          <button class="sb {warna(v)}" class:on={s === v} aria-pressed={s === v} onclick={() => set(b.no, s === v ? '' : v)}>{v}</button>
        {/each}
        {#if s != null && ![1, 2, 3, 4].includes(s)}<span class="desimal mono" title="Skor desimal dari tautan atau file">{fmt(s)}</span>{/if}
      </div>
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
                        {@render tombol(b, s, true)}
                      </td>
                    {/each}
                    <td class="num mono">{fmt(nilaiAlur(a))}<span class="muted"> / {fmt(a.bobot)}</span></td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <table class="bt">
            <colgroup>
              <col class="c-kode" /><col class="c-el" /><col class="c-ds" /><col class="c-bobot" /><col class="c-skor" /><col class="c-ct" />
            </colgroup>
            <thead>
              <tr>
                <th>Butir</th><th>Elemen Penilaian LAM</th><th>Deskriptor</th><th class="num">Bobot</th><th>Skor</th><th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {#each k.butir as b (b.no)}
                {@const s = skor[b.no]}
                {@const db = !!deskBuka[b.no]}
                {@const lebar = !!catatanLebar[b.no]}
                <tr class:warn={k.syaratUnggul && s != null && s < MIN_BUTIR}>
                  <td class="kode"><a href={href(jenjang.id, 'butir', b.no)} title="Lihat rubrik">{b.kode}</a></td>
                  <td class="el"><Md text={b.elemen} /></td>
                  <td class="ds" data-label="Deskriptor">
                    {#if b.deskriptor}
                      <div class="dsi" class:tutup={!db} id="ds-{b.no}">
                        <Md text={b.deskriptor} />
                        {#if db && b.syaratUnggul}<p class="su small"><b>Syarat Unggul:</b> {b.syaratUnggul}</p>{/if}
                      </div>
                      <button class="tg" aria-expanded={db} aria-controls="ds-{b.no}" onclick={() => (deskBuka[b.no] = !db)}>
                        {db ? '▴ Collapse' : '▾ Expand'}
                      </button>
                    {:else}
                      <span class="muted">–</span>
                    {/if}
                  </td>
                  <td class="num bobot"><span class="jenis {b.jenis}" title={b.jenis === 'I' ? 'Input' : b.jenis === 'P' ? 'Proses' : 'Output'}>{fmt(b.bobot)}</span></td>
                  <td class="skor">{@render tombol(b, s)}</td>
                  <td class="ct" data-label="Catatan">
                    {#if lebar}
                      <button class="tg" aria-expanded="true" onclick={() => (catatanLebar[b.no] = false)}>▴ Collapse</button>
                      <span class="small muted">Catatan dibuka lebar di bawah.</span>
                    {:else}
                      <textarea
                        rows="2" placeholder="Tulis catatan…" aria-label="Catatan {b.kode}"
                        value={catatan[b.no] ?? ''} oninput={(e) => setCatatan(b.no, e.currentTarget.value)}
                      ></textarea>
                      <button class="tg" aria-expanded="false" onclick={() => (catatanLebar[b.no] = true)} title="Buka kotak catatan yang lebih besar">▾ Expand</button>
                    {/if}
                  </td>
                </tr>
                {#if lebar}
                  <tr class="ct-lebar" class:warn={k.syaratUnggul && s != null && s < MIN_BUTIR}>
                    <td colspan="6">
                      <label class="small muted" for="ct-{b.no}">Catatan {b.kode}</label>
                      <!-- svelte-ignore a11y_autofocus -->
                      <textarea
                        id="ct-{b.no}" rows="12" placeholder="Tulis catatan…" autofocus
                        value={catatan[b.no] ?? ''} oninput={(e) => setCatatan(b.no, e.currentTarget.value)}
                      ></textarea>
                    </td>
                  </tr>
                {/if}
              {/each}
            </tbody>
          </table>
        {/if}
      </section>
    {/each}
  </div>

  <aside class="summary" bind:this={ringkasan}>
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

<button class="mini no-print" class:sembunyi={ringkasanTerlihat} onclick={() => ringkasan.scrollIntoView({ behavior: 'smooth' })}>
  <span class="mn"><span class="muted">Nilai akhir</span> <b class="mono">{fmt(hasil.nilaiAkhir)}</b><span class="muted mono"> / {fmt(hasil.maks)}</span></span>
  <span class="ms {hasil.status.kode}">{hasil.status.label}</span>
  <span class="mr muted">{hasil.terisi}/{hasil.total} terisi · Rincian ↓</span>
</button>

<style>
  .layout { display: grid; grid-template-columns: 1fr 300px; gap: 28px; align-items: start; }
  /* min-width 0: tabel matriks yang lebar digeser di wadahnya, tidak melebarkan kolom grid */
  .layout > * { min-width: 0; }
  .summary {
    position: sticky; top: calc(var(--head, 92px) + 16px); display: flex; flex-direction: column; gap: 12px;
    max-height: calc(100vh - var(--head, 92px) - 32px); overflow-y: auto;
  }
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
  .berkas { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-top: 8px; }
  .bt { table-layout: fixed; font-size: 0.86rem; }
  .bt .c-kode { width: 58px; }
  .bt .c-el { width: 28%; }
  .bt .c-ds { width: 22%; }
  .bt .c-bobot { width: 54px; }
  .bt .c-skor { width: 146px; }
  .bt th, .bt td { padding: 8px 6px; }
  .bt th:first-child, .bt td:first-child { padding-left: 4px; }
  .bt tr.warn > td { background: var(--danger-soft); }
  .bt tr.warn > td:first-child { box-shadow: inset 3px 0 0 var(--danger); padding-left: 8px; }
  .bt tr:has(+ .ct-lebar) > td { border-bottom-color: transparent; }
  .bt .kode a { font-family: var(--mono); font-weight: 600; }
  .bt .el { line-height: 1.45; }
  .bt .el :global(p) { margin-bottom: 0.5em; }
  .bt .ds { color: var(--muted); line-height: 1.45; }
  .bt .ds :global(p) { margin-bottom: 0.5em; }
  .dsi.tutup { max-height: 4.4em; overflow: hidden; mask-image: linear-gradient(#000 45%, transparent); -webkit-mask-image: linear-gradient(#000 45%, transparent); }
  .su { margin: 0.5em 0 0; }
  .tg { display: block; border: 0; background: none; padding: 2px 0; cursor: pointer; color: var(--link); font-size: 0.8rem; }
  .tg:hover { text-decoration: underline; }
  .bt .bobot .jenis { justify-content: flex-end; }
  textarea {
    display: block; width: 100%; padding: 5px 7px; resize: vertical; font: inherit; font-size: 0.85rem; line-height: 1.4;
    border: 1px solid var(--border-strong); border-radius: var(--radius); background: var(--surface); color: var(--text);
  }
  textarea:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .ct-lebar td { padding-top: 0; }
  .ct-lebar textarea { margin-top: 4px; min-height: 220px; }
  .score { display: flex; gap: 3px; align-items: center; flex-wrap: wrap; }
  .sb { width: 30px; height: 30px; border: 1px solid var(--border); background: var(--surface); border-radius: var(--radius); cursor: pointer; font-family: var(--mono); }
  .sb:hover { border-color: var(--text); }
  .sb.on.s4, .sb.on.s3 { background: var(--ok); border-color: var(--ok); color: var(--bg); }
  .sb.on.s2 { background: var(--p); border-color: var(--p); color: var(--bg); }
  .sb.on.s1 { background: var(--danger); border-color: var(--danger); color: var(--bg); }
  .score.kecil { gap: 2px; flex-wrap: nowrap; margin-top: 3px; }
  .score.kecil .sb { width: 22px; height: 24px; font-size: 0.78rem; padding: 0; }
  .desimal { font-size: 0.8rem; padding: 0 4px; color: var(--muted); }
  .mx { font-size: 0.85rem; min-width: 640px; }
  .mx .topik { min-width: 150px; line-height: 1.3; position: sticky; left: 0; z-index: 2; background: var(--bg); }
  .mx thead th:first-child { position: sticky; left: 0; z-index: 2; background: var(--bg); }
  @media (max-width: 640px) { .mx .topik { min-width: 110px; max-width: 130px; font-size: 0.8rem; box-shadow: 1px 0 0 var(--border); } }
  .mx td.num { white-space: nowrap; }
  .mx .topik .mono { color: var(--muted); font-size: 0.78rem; display: block; }
  .mx .cell { padding: 6px 4px; }
  .mx .cell a { display: block; font-weight: 600; font-size: 0.8rem; text-decoration: none; color: var(--text); }
  .mx .cell.warn { background: var(--danger-soft); }
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
  .mini { display: none; }
  @media (max-width: 960px) {
    .layout { grid-template-columns: 1fr; gap: 28px; }
    .summary { position: static; max-height: none; overflow: visible; scroll-margin-top: calc(var(--head, 92px) + 12px); }
    .mini {
      position: fixed; z-index: 9; left: 0; right: 0; bottom: 0;
      display: flex; flex-wrap: wrap; align-items: center; gap: 2px 10px; width: 100%;
      padding: 10px max(16px, env(safe-area-inset-right)) calc(10px + env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
      background: var(--surface); border: 0; border-top: 1px solid var(--border-strong);
      box-shadow: 0 -4px 16px rgb(0 0 0 / 0.08); text-align: left; cursor: pointer;
      transition: transform 0.2s;
    }
    .mini.sembunyi { transform: translateY(110%); }
    .mn b { font-size: 1.25rem; }
    .ms { font-size: 0.8rem; font-weight: 600; padding: 1px 8px; border-radius: 999px; }
    .ms.tidak { color: var(--danger); background: var(--danger-soft); }
    .ms.terakreditasi { color: var(--p); background: var(--p-soft); }
    .ms.unggul3, .ms.unggul5 { color: var(--o); background: var(--o-soft); }
    .mr { margin-left: auto; font-size: 0.8rem; }
    /* Ruang agar butir terakhir tidak tertutup bilah nilai */
    .layout { padding-bottom: 72px; }
  }
  @media (max-width: 600px) {
    .toolbar h1 { font-size: 1.5rem; }
    .simpan { flex-wrap: wrap; }
    .simpan input { flex-basis: 100%; padding: 8px 10px; }
    .simpan .btn { flex: 1; justify-content: center; }
    .daftar td.muted { display: none; }
    .actions .seg { flex-basis: 100%; }
    .actions .seg button { flex: 1; padding: 8px 6px; }
    .sp { display: none; }
    .berkas .btn { flex: 1; justify-content: center; }
    .berkas span { flex-basis: 100%; }
    /* Tabel butir menjadi kartu bertumpuk */
    .bt, .bt tbody, .bt tr, .bt td { display: block; width: auto; }
    .bt thead, .bt colgroup { display: none; }
    .bt tr { display: grid; grid-template-columns: auto 1fr auto; gap: 4px 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
    .bt td { padding: 0; border: 0; }
    .bt td:first-child { padding-left: 0; }
    .bt tr.warn { background: var(--danger-soft); box-shadow: inset 3px 0 0 var(--danger); padding-left: 8px; padding-right: 8px; }
    .bt tr.warn > td { background: none; }
    .bt tr.warn > td:first-child { box-shadow: none; padding-left: 0; }
    .bt .kode { grid-column: 1; }
    .bt .bobot { grid-column: 3; grid-row: 1; }
    .bt .el, .bt .ds, .bt .skor, .bt .ct { grid-column: 1 / -1; }
    .bt .el { grid-row: 2; }
    .bt .ds::before, .bt .ct::before { content: attr(data-label); display: block; font-size: 0.75rem; font-weight: 600; color: var(--muted); }
    .bt tr.ct-lebar { display: block; padding-top: 0; }
    .bt tr:has(+ .ct-lebar) { border-bottom: 0; }
    .score { gap: 6px; }
    /* Tombol skor melebar mengisi baris agar mudah diketuk */
    .sb { flex: 1; height: 40px; }
    textarea { font-size: max(16px, 1rem); }
  }
</style>
