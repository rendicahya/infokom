# Panduan LED LAM INFOKOM

Web app (Svelte + Vite, frontend-only) untuk mempelajari panduan penyusunan Laporan Evaluasi Diri (LED) dan bobot penilaian LAM INFOKOM jenjang Sarjana, Magister, dan Doktor.

Fitur:

- **Butir & Rubrik** — setiap butir dengan bobot, jenis (I/P/O), panduan penulisan dari Instrumen LED, deskriptor, syarat Unggul, rubrik skor 1–4, dan contoh narasi.
- **Panduan LED** — isi Instrumen LED per bagian, ditautkan ke butir penilaian.
- **Kalkulator** — nilai akhir = Σ(bobot × skor) ÷ 4, status akreditasi, pengecekan syarat Unggul, dan potensi kenaikan nilai. Skor tersimpan di localStorage dan bisa diekspor/impor.
- **Rekap Bobot** — bobot per kriteria, Input/Proses/Output, tahap PPEPP, dan perbandingan antarjenjang.

Data dibaca langsung dari file `.md` di root repo (`Matriks Penilaian … Unggul.md` dan `Instrumen LED … Unggul.md`), jadi perubahan pada file tersebut otomatis tercermin di app. Contoh narasi ada di `src/lib/narasi.js` dan bersifat ilustratif.

## Pengembangan

```sh
npm install
npm run dev
npm run build
```

Setiap push ke `main` dideploy otomatis ke GitHub Pages melalui `.github/workflows/deploy.yml`.
