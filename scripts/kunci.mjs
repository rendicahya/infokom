// Mengenkripsi narasi internal agar aman dipublikasikan di repo dan GitHub Pages.
//
//   npm run kunci
//
// Membaca  internal/narasi.json  (tidak di-commit, lihat .gitignore)
// Menulis  public/narasi.enc.json (di-commit; hanya berisi ciphertext)
//
// Password diambil dari variabel lingkungan NARASI_PASSWORD, atau ditanyakan di terminal.
// Kunci diturunkan dengan PBKDF2-SHA256 lalu dienkripsi AES-256-GCM; aplikasi mendekripsinya di peramban.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';
import { createInterface } from 'node:readline';

const SUMBER = new URL('../internal/narasi.json', import.meta.url);
const TUJUAN = new URL('../public/narasi.enc.json', import.meta.url);
const ITER = 600000;

const b64 = (u8) => Buffer.from(u8).toString('base64');

function tanya(teks) {
  return new Promise((selesai) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    // Ketikan password tidak ditampilkan
    rl._writeToOutput = (s) => { if (s.startsWith(teks)) process.stdout.write(s); };
    let dijawab = false;
    rl.question(teks, (j) => { dijawab = true; rl.close(); process.stdout.write('\n'); selesai(j); });
    rl.on('close', () => {
      if (dijawab) return;
      console.error('\nTerminal ini tidak bisa menerima input password. Jalankan di jendela terminal biasa (PowerShell / Windows Terminal).');
      process.exit(1);
    });
  });
}

const isi = await readFile(SUMBER, 'utf8');
JSON.parse(isi); // validasi format sebelum dienkripsi

let pw = process.env.NARASI_PASSWORD;
if (!pw) {
  pw = await tanya('Password: ');
  if (pw !== (await tanya('Ulangi password: '))) throw new Error('Password tidak sama.');
}
if (pw.length < 12) throw new Error('Password minimal 12 karakter.');

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const bahan = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
const kunci = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITER },
  bahan, { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
);
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, kunci, new TextEncoder().encode(isi)));

await mkdir(new URL('.', TUJUAN), { recursive: true });
await writeFile(TUJUAN, JSON.stringify({ v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) }) + '\n');
console.log('Tersimpan: public/narasi.enc.json');
