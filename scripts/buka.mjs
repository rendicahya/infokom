// Kebalikan dari kunci.mjs: mendekripsi public/narasi.enc.json menjadi internal/narasi.json
// agar bisa disunting lalu dikunci ulang.
//
//   npm run buka
//
// Password diambil dari variabel lingkungan NARASI_PASSWORD, atau ditanyakan di terminal.

import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';
import { createInterface } from 'node:readline';

const SUMBER = new URL('../public/narasi.enc.json', import.meta.url);
const TUJUAN = new URL('../internal/narasi.json', import.meta.url);

const dariB64 = (s) => new Uint8Array(Buffer.from(s, 'base64'));

function tanya(teks) {
  return new Promise((selesai) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
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

const ada = await access(TUJUAN).then(() => true, () => false);
if (ada && !process.argv.includes('--timpa')) {
  console.error('internal/narasi.json sudah ada. Jalankan dengan --timpa untuk menimpanya.');
  process.exit(1);
}

const f = JSON.parse(await readFile(SUMBER, 'utf8'));
const pw = process.env.NARASI_PASSWORD || (await tanya('Password: '));
const bahan = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
const kunci = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt: dariB64(f.salt), iterations: f.iter },
  bahan, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
);
let teks;
try {
  teks = new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: dariB64(f.iv) }, kunci, dariB64(f.ct)));
} catch {
  console.error('Password salah.');
  process.exit(1);
}

await mkdir(new URL('.', TUJUAN), { recursive: true });
await writeFile(TUJUAN, JSON.stringify(JSON.parse(teks), null, 2) + '\n');
console.log('Tersimpan: internal/narasi.json');
