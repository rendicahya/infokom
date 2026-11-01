<script>
  import { rahasia, buka as bukaData, kunci } from './rahasia.svelte.js';

  let dlg, input;
  let pw = $state('');
  let pesan = $state('');
  let proses = $state(false);

  export function buka() {
    pw = '';
    pesan = '';
    dlg.showModal();
    input?.focus();
  }

  async function kirim(e) {
    e.preventDefault();
    if (!pw || proses) return;
    proses = true;
    pesan = '';
    try {
      await bukaData(pw);
      pw = '';
      dlg.close();
    } catch (err) {
      pesan = err.message === 'salah' ? 'Password salah.' : 'Data internal belum tersedia.';
    } finally {
      proses = false;
    }
  }

  function tutupKunci() {
    kunci();
    dlg.close();
  }

  function onclick(e) {
    if (e.target === dlg) dlg.close();
  }
</script>

<dialog bind:this={dlg} {onclick} aria-labelledby="kunci-judul">
  <div class="box">
    {#if rahasia.data}
      <div class="label" id="kunci-judul">Narasi internal terbuka</div>
      <p class="small">Contoh narasi dengan data internal sedang ditampilkan. Akses tertutup otomatis saat tab ditutup.</p>
      <div class="aksi">
        <button class="btn" onclick={() => dlg.close()}>Tutup</button>
        <button class="btn primary" onclick={tutupKunci}>Kunci sekarang</button>
      </div>
    {:else}
      <form onsubmit={kirim}>
        <label class="label" id="kunci-judul" for="kunci-pw">Masukkan password untuk membuka contoh narasi internal</label>
        <input id="kunci-pw" type="password" bind:this={input} bind:value={pw} autocomplete="current-password" />
        {#if pesan}<p class="err small" role="alert">{pesan}</p>{/if}
        <div class="aksi">
          <button type="button" class="btn" onclick={() => dlg.close()}>Batal</button>
          <button type="submit" class="btn primary" disabled={!pw || proses}>{proses ? 'Membuka…' : 'Buka'}</button>
        </div>
      </form>
    {/if}
  </div>
</dialog>

<style>
  dialog {
    padding: 0; border: 1px solid var(--border-strong); border-radius: var(--radius);
    background: var(--bg); color: var(--text); width: min(400px, calc(100vw - 32px)); outline: none;
  }
  dialog::backdrop { background: rgb(0 0 0 / 0.6); }
  .box { padding: 22px 24px; }
  form { display: flex; flex-direction: column; gap: 10px; }
  p { margin: 8px 0 0; }
  input {
    width: 100%; padding: 8px 10px; border: 1px solid var(--border-strong); border-radius: var(--radius);
    background: var(--surface); font-size: max(16px, 1rem);
  }
  .err { color: var(--danger); margin: 0; }
  .aksi { display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px; }
  form .aksi { margin-top: 4px; }
</style>
