<script>
  import QRCode from 'qrcode';

  // Tautan pendek untuk audiens presentasi
  const URL_APP = 'https://s.id/lam-infokom';

  let dlg;
  let svg = $state('');
  let copied = $state(false);
  const bisaShare = !!navigator.share;

  QRCode.toString(URL_APP, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#1f1d1a', light: '#ffffff' } }).then(
    (s) => (svg = s),
  );

  export function buka() {
    dlg.showModal();
    // Fokus ke dialog itu sendiri agar tautan tidak tampil bergaris fokus saat presentasi
    dlg.focus();
  }

  async function salin() {
    try {
      await navigator.clipboard.writeText(URL_APP);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch {}
  }

  function bagikan() {
    navigator.share({ title: 'Panduan LED LAM INFOKOM', url: URL_APP }).catch(() => {});
  }

  // Klik di luar kotak dialog (pada backdrop) menutup dialog
  function onclick(e) {
    if (e.target === dlg) dlg.close();
  }
</script>

<dialog bind:this={dlg} {onclick} tabindex="-1" aria-labelledby="bagi-judul">
  <div class="box">
    <div class="label" id="bagi-judul">Buka aplikasi ini di perangkat Anda</div>
    <div class="qr" aria-label="QR code {URL_APP}">{@html svg}</div>
    <a class="url" href={URL_APP} target="_blank" rel="noopener">s.id/<b>lam-infokom</b></a>
    <div class="aksi">
      <button class="btn" onclick={salin}>{copied ? 'Tersalin' : 'Salin tautan'}</button>
      {#if bisaShare}<button class="btn" onclick={bagikan}>Bagikan…</button>{/if}
      <button class="btn" onclick={() => dlg.close()}>Tutup</button>
    </div>
  </div>
</dialog>

<style>
  dialog {
    padding: 0; border: 1px solid var(--text); border-radius: var(--radius);
    background: var(--bg); color: var(--text); max-width: calc(100vw - 32px); outline: none;
  }
  dialog::backdrop { background: rgb(0 0 0 / 0.6); }
  .box { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 24px 28px; }
  /* Latar QR selalu putih agar mudah dipindai, juga di mode gelap */
  .qr { width: min(60vh, 75vw, 440px); aspect-ratio: 1; background: #fff; padding: 10px; border-radius: var(--radius); }
  .qr :global(svg) { display: block; width: 100%; height: 100%; }
  .url { font: 600 clamp(1.3rem, 4vw, 2rem) var(--mono); color: var(--text); text-decoration: none; letter-spacing: -0.01em; }
  .url b { color: var(--accent); }
  .aksi { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
</style>
