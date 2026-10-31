// Contoh narasi LED per butir dengan konteks Fakultas Ilmu Komputer Universitas Brawijaya (FILKOM UB).
// Nomor dokumen, angka, dan nama mitra bersifat ILUSTRATIF (bukan data resmi) dan harus diganti dengan data PS sendiri.
// Narasi ditulis sebagai contoh yang mengarah ke skor 4: lengkap, terukur, berbukti, dan berkesinambungan PPEPP.
// Daftar poin ditulis sebagai bullet (bukan dipisah titik koma). Butir Penetapan merinci setiap standar menjadi
// tiga poin: Standar, Indikator, dan Target. Butir Peningkatan memakai format yang sama dengan target yang dinaikkan.
// Kesinambungan: aspek yang ditetapkan pada Penetapan dilaporkan capaiannya pada Pelaksanaan, dibandingkan dengan
// target pada Evaluasi, ditindaklanjuti pada Pengendalian, dan dinaikkan targetnya pada Peningkatan (satu baris alur).

// Satu standar dalam format tiga poin; `area` opsional menjadi judul kecil di atasnya.
const std = (area, standar, indikator, target) =>
  `${area ? `**${area}**\n\n` : ''}- **Standar:** ${standar}\n- **Indikator:** ${indikator}\n- **Target:** ${target}`;

// Standar hasil peningkatan: target baru beserta target sebelumnya (tanpa `lama` berarti standar baru).
const naik = (area, standar, indikator, baru, lama) =>
  std(area, standar, indikator, `${baru} ${lama ? `(sebelumnya ${lama})` : '(standar baru)'}`);

const N = {
  // ===== Kondisi Eksternal & Profil =====
  1: (c) => `**Lingkungan makro.** Pertumbuhan ekonomi digital nasional (proyeksi Rp 2.000 triliun pada 2030), kebijakan Merdeka Belajar, serta Peta Jalan Indonesia Digital 2021–2024 meningkatkan kebutuhan talenta TIK. Laporan Kemnaker menunjukkan kekurangan ±600 ribu talenta digital per tahun. Perkembangan AI generatif dan keamanan siber menuntut kurikulum yang adaptif.

**Lingkungan mikro.** Di Jawa Timur terdapat 38 PS sejenis (9 terakreditasi Unggul) sebagai pesaing langsung, sebagian di Malang Raya. Data BPS mencatat 1.250 SMA/SMK di Jawa Timur dengan ±150.000 lulusan per tahun; 31% berminat di bidang TIK (survei FILKOM UB 2024). Kemitraan dengan 42 mitra DUDIKA serta Pemkot/Pemkab Malang Raya menjadi sumber tempat magang, dana, dan pengguna lulusan ${c.ps}.

**Peluang:**

- Program transformasi digital pemda
- Skema MBKM dan hibah Kemdiktisaintek
- Kebutuhan sertifikasi kompetensi

**Ancaman:**

- Kampus luar negeri yang membuka kelas daring
- Bootcamp non-gelar
- Persaingan perekrutan dosen bergelar doktor dengan industri

Analisis ini menjadi dasar Renstra FILKOM UB 2025–2029 (bukti: Dokumen Analisis Lingkungan Strategis, SK Dekan No. 12/2025).`,

  2: (c) => `${c.ps} diselenggarakan oleh FILKOM UB dengan visi keilmuan *"menjadi pusat pengembangan kecerdasan buatan yang berdampak bagi masyarakat pada 2035"*. Struktur organisasi mengacu pada Statuta UB sebagai PTN-BH dan OTK FILKOM UB, dengan Gugus Jaminan Mutu (GJM) di tingkat fakultas dan Unit Jaminan Mutu (UJM) di tingkat PS.

Pada TS terdapat ${Math.round(620 * c.skala)} mahasiswa aktif, ${Math.round(28 * Math.max(c.skala, 0.5))} DTPR (${c.jenjang === 'Sarjana' ? '46%' : '95%'} bergelar doktor, 9 Lektor Kepala/Guru Besar), dan 18 tenaga kependidikan. Rasio dana operasional pendidikan mencapai Rp 21,4 juta/mahasiswa/tahun. SPMI telah berjalan lima siklus PPEPP dan memperoleh sertifikat ISO 21001:2018.

Kinerja unggulan: IPK rata-rata lulusan 3,52, masa tunggu kerja 3,1 bulan, dan 62 publikasi bereputasi dalam tiga tahun terakhir. Analisis SWOT:

- **Kekuatan utama:** SDM riset AI
- **Kelemahan:** rasio laboratorium terhadap mahasiswa
- **Strategi SO yang dipilih:** perluasan kerja sama riset industri

Data pada bagian ini konsisten dengan LKPS dan kriteria C.1–C.6.`,

  // ===== C.1 Budaya Mutu =====
  // Alur tata kelola: 3 → 5 → 7 → 9 → 11 (SLA akademik, serapan anggaran, pelaporan BKD)
  3: (c) => `UPPS menetapkan sistem tata kelola melalui Statuta UB, Peraturan Rektor No. 5/2023 tentang OTK, dan Manual SPMI FILKOM UB. Standar tata kelola dituangkan dalam 24 Standar Pendidikan Tinggi (SN-DIKTI ditambah 8 standar PT). Contoh rumusannya:

${std('Akademik', 'Wakil Dekan Bidang Akademik menjamin layanan administrasi akademik diselesaikan sesuai SLA paling lambat akhir tahun 2023.', 'persentase layanan administrasi akademik yang selesai sesuai SLA', '≥ 95%')}

${std('Keuangan', 'Wakil Dekan Bidang Keuangan mengelola anggaran agar serapan anggaran mencapai minimal 95% setiap tahun anggaran.', 'persentase serapan anggaran', '≥ 95% per tahun')}

${std('SDM', 'Dekan memastikan seluruh dosen menyusun dan melaporkan Beban Kerja Dosen (BKD) tepat waktu setiap semester.', 'persentase dosen yang melaporkan BKD tepat waktu', '100% per semester')}

Setiap area dilengkapi SOP yang disahkan Dekan:

- **Akademik:** 21 SOP (KRS, legalisasi, yudisium, cuti, RPL)
- **Keuangan:** 9 SOP (RKAT, pencairan, pertanggungjawaban)
- **SDM:** 11 SOP (rekrutmen, BKD, studi lanjut, promosi jabatan)
- **Aspek lain dalam siklus PPEPP:** 7 SOP (audit mutu internal, RTM, survei kepuasan)

Daftar dokumen beserta nomor SK dan tautan unduh disajikan pada Lampiran C.1-1.`,

  // Alur SPMI: 4 → 6 → 8 → 10 → 12 (kompetensi pelaksana SPMI, efektivitas AMI)
  4: (c) => `Kebijakan SPMI ditetapkan dalam Kebijakan SPMI UB (SK Rektor No. 88/2022) dan dijabarkan dalam Manual serta Standar SPMI FILKOM UB. Fungsi SPMI dijalankan oleh Gugus Jaminan Mutu (GJM) fakultas dan Unit Jaminan Mutu (UJM) di ${c.ps}, ditetapkan dengan SK Dekan No. 21/2024.

${std('Kompetensi pelaksana SPMI', 'Dekan menjamin seluruh anggota GJM dan UJM bersertifikat auditor mutu internal dan mengikuti pelatihan penyegaran minimal sekali setiap dua tahun, paling lambat akhir tahun 2024.', 'persentase personel GJM/UJM yang bersertifikat auditor mutu internal dan mengikuti penyegaran dalam dua tahun terakhir', '100%')}

${std('Efektivitas AMI', 'Ketua GJM memastikan temuan AMI ditindaklanjuti dan ditutup sebelum siklus AMI berikutnya.', 'persentase temuan AMI yang ditutup sebelum siklus berikutnya', '≥ 85% per siklus')}

Bukti: SK penetapan, sertifikat pelatihan, dan matriks kompetensi personel SPMI (Lampiran C.1-2).`,

  5: (c) => `Implementasi standar tata kelola dipantau melalui dasbor kinerja fakultas. Capaian pada TS:

- **Akademik:** 98,7% layanan administrasi akademik selesai sesuai SLA (target ≥ 95%), dijalankan dengan 21 SOP akademik
- **Keuangan:** serapan anggaran 96,4% (target ≥ 95%), dan laporan keuangan memperoleh opini WTP dari KAP independen
- **SDM:** 100% dosen melaporkan BKD tepat waktu pada kedua semester (target 100%)
- **Aspek lain:** RTM dilaksanakan dua kali per tahun

Efektivitas ini didokumentasikan dalam Laporan Tahunan Dekan 2022–2024 dan Laporan Kinerja PS yang dipresentasikan dalam rapat senat fakultas. Seluruh bukti dapat ditelusuri melalui sistem arsip digital FILKOM UB (Lampiran C.1-3).`,

  6: (c) => `SPMI berjalan penuh dalam siklus PPEPP: penetapan standar (Januari), pelaksanaan (sepanjang tahun), AMI (Agustus), RTM (September), dan perbaikan standar (Desember). Dalam tiga tahun terakhir dilaksanakan 3 siklus AMI dengan cakupan 100% unit di FILKOM UB.

- **Kompetensi pelaksana SPMI:** 12 personel GJM/UJM seluruhnya bersertifikat auditor mutu internal, dan 7 orang (58%) telah mengikuti pelatihan penyegaran dalam dua tahun terakhir. Auditor dirotasi lintas unit untuk menjaga independensi.
- **Efektivitas AMI:** 92% temuan AMI ditutup sebelum siklus berikutnya (target ≥ 85%).

Bukti: jadwal AMI, laporan AMI, notulen RTM, dan daftar tindakan koreksi (Lampiran C.1-4).`,

  7: (c) => `Evaluasi ketercapaian standar tata kelola dilakukan **berkala**: monitoring triwulanan oleh Wakil Dekan, AMI tahunan, dan survei kepuasan setiap semester. Hasil TS untuk ketiga standar yang ditetapkan:

- **SLA layanan akademik:** tercapai (98,7%; target ≥ 95%). Namun, legalisasi dokumen menyumbang 70% layanan yang melewati SLA, dengan waktu proses rata-rata 4 hari dari SLA 2 hari.
- **Serapan anggaran:** tercapai secara total (96,4%; target ≥ 95%), tetapi pos dana penelitian baru terserap 88%.
- **Pelaporan BKD:** tercapai (100%), tetapi 30% dosen mengunggah pada tiga hari terakhir sehingga verifikasi asesor menumpuk.

**Akar masalah** (analisis *fishbone*):

- Legalisasi masih manual dan berlapis tanda tangan
- Pencairan dana penelitian terhambat jadwal pencairan universitas
- Belum ada pengingat otomatis jadwal pelaporan BKD

Survei kepuasan tata kelola (n = ${Math.round(540 * c.skala) + 60} dosen, tendik, mahasiswa) menghasilkan indeks 3,41 dari 4 (Lampiran C.1-5).`,

  8: (c) => `Evaluasi fungsi SPMI dilakukan melalui audit oleh Badan Penjaminan Mutu universitas dan surveilans ISO 21001 setiap tahun. Indeks kematangan SPMI mencapai 3,6 dari 4. Hasil terhadap standar yang ditetapkan:

- **Kompetensi pelaksana SPMI:** sertifikasi auditor tercapai (100%), tetapi penyegaran baru diikuti 58% personel (target 100% dalam dua tahun). Lima auditor belum menguasai audit berbasis risiko.
- **Efektivitas AMI:** penutupan temuan tercapai (92%; target ≥ 85%), tetapi 8% temuan berulang di dua siklus.

**Akar masalah:**

- Jadwal penyegaran auditor belum masuk rencana kerja tahunan GJM
- Tindakan koreksi belum disertai verifikasi efektivitas

Survei pemahaman SPMI kepada dosen dan tendik menghasilkan skor 3,35/4 (Lampiran C.1-6).`,

  9: (c) => `Tindak lanjut hasil evaluasi tata kelola ditetapkan dalam RTM September TS dan dipantau melalui *action plan*:
1. **SLA layanan akademik:** legalisasi digital dengan tanda tangan elektronik BSrE diterapkan sejak Januari TS+1. Waktu legalisasi turun menjadi 1 hari, dan layanan yang selesai sesuai SLA naik menjadi 99,4%.
2. **Serapan anggaran:** pencairan dana penelitian diubah menjadi dua termin dengan uang muka 70%. Serapan pos penelitian naik menjadi 97%.
3. **Pelaporan BKD:** pengingat otomatis terintegrasi SISTER dan tenggat internal satu minggu sebelum tenggat universitas. Unggahan pada tiga hari terakhir turun menjadi 8%.

Semua tindakan dicatat dalam formulir PTK dan diverifikasi kembali pada AMI berikutnya (Lampiran C.1-7).`,

  10: (c) => `Tindak lanjut evaluasi fungsi SPMI ditetapkan dalam RTM:

- **Kompetensi pelaksana SPMI:** lima auditor yang belum mengikuti penyegaran diikutsertakan pelatihan *risk-based auditing* (Mei TS+1), sehingga 100% auditor telah mengikuti penyegaran. Jadwal penyegaran kini menjadi agenda tetap rencana kerja GJM.
- **Efektivitas AMI:** ditetapkan mekanisme **verifikasi efektivitas tindakan koreksi** 3 bulan setelah penutupan temuan. Temuan berulang turun dari 8% menjadi 2% pada siklus berikutnya.

Sosialisasi SPMI kepada mahasiswa juga dilakukan dalam PKKMB dan kuliah umum. Bukti: notulen RTM, sertifikat pelatihan, dan laporan verifikasi PTK (Lampiran C.1-8).`,

  11: (c) => `Berdasarkan capaian dan pengendalian, UPPS menaikkan standar tata kelola melalui SK Dekan No. 3/TS+1 tentang Revisi Standar FILKOM UB:

${naik('Akademik', 'Wakil Dekan Bidang Akademik menjamin layanan administrasi akademik diselesaikan sesuai SLA, dengan SLA legalisasi dipersingkat menjadi 1 hari kerja, paling lambat akhir tahun TS+1.', 'persentase layanan administrasi akademik yang selesai sesuai SLA', '≥ 98%', '≥ 95%')}

${naik('Keuangan', 'Wakil Dekan Bidang Keuangan mengelola anggaran agar serapan setiap pos anggaran, termasuk dana penelitian, mencapai minimal 97% setiap tahun anggaran.', 'persentase serapan anggaran per pos', '≥ 97% untuk setiap pos', '≥ 95% secara total')}

${naik('SDM', 'Dekan memastikan seluruh dosen melaporkan BKD paling lambat satu minggu sebelum tenggat universitas setiap semester.', 'persentase dosen yang melaporkan BKD satu minggu sebelum tenggat', '≥ 90% per semester', '100% sebelum tenggat universitas')}

${naik('Tata kelola data', 'Dekan menerapkan tata kelola data dan keamanan informasi berbasis ISO 27001 pada sistem informasi akademik paling lambat akhir tahun TS+2.', 'persentase sistem informasi inti yang lolos audit keamanan informasi', '100%')}

Peningkatan tercantum dalam Renop 2025–2026. Dampaknya terlihat dari kenaikan indeks kepuasan tata kelola dari 3,41 menjadi 3,58 (Lampiran C.1-9).`,

  12: (c) => `Fungsi SPMI ditingkatkan dengan menaikkan standar yang telah tercapai:

${naik('Kompetensi pelaksana SPMI', 'Dekan menjamin seluruh auditor bersertifikat auditor mutu internal, kompeten audit berbasis risiko dan ISO 21001, serta mengikuti penyegaran setiap tahun.', 'persentase auditor yang mengikuti penyegaran dalam satu tahun terakhir', '100% per tahun', '100% per dua tahun')}

${naik('Efektivitas AMI', 'Ketua GJM memastikan temuan AMI ditutup sebelum siklus berikutnya dan diverifikasi efektivitasnya 3 bulan setelah penutupan.', 'persentase temuan AMI yang ditutup sebelum siklus berikutnya', '≥ 95% per siklus', '≥ 85% per siklus')}

${naik('Temuan berulang', 'Ketua GJM menekan temuan AMI yang berulang pada dua siklus berturut-turut.', 'persentase temuan AMI berulang', '≤ 2%')}

UPPS juga mengadopsi sistem informasi audit mutu (e-AMI) yang terintegrasi dengan dasbor indikator, serta memperluas *benchmarking* dengan dua PS terakreditasi internasional (ABET/ASIIN). Hasilnya, siklus AMI menjadi 30% lebih cepat, dan ${c.ps} menyiapkan akreditasi internasional pada TS+2 (Lampiran C.1-10).`,

  // ===== C.2 Relevansi Pendidikan =====
  // Alur input: 13 → 17 → 21 → 25 → 29 (sarana, DTPR doktor, pembiayaan, keragaman provinsi)
  13: (c) => `UPPS menetapkan standar relevansi pendidikan pada Standar FILKOM UB (SK Dekan No. 4/2023). Contoh rumusannya:

${std('Sarana prasarana', 'Dekan menyediakan komputer laboratorium agar tercapai rasio komputer : mahasiswa minimal 1 : 4 paling lambat akhir tahun 2023.', 'rasio komputer laboratorium : mahasiswa', '1 : 4')}

${std('DTPR', `Dekan melakukan rekrutmen dan mendorong studi lanjut dosen agar minimal ${c.jenjang === 'Sarjana' ? '50%' : '100%'} DTPR bergelar doktor paling lambat akhir tahun 2025.`, 'persentase DTPR bergelar doktor', c.jenjang === 'Sarjana' ? '50%' : '100%')}

${std('Pembiayaan', 'Dekan mengalokasikan dana operasional pendidikan minimal Rp 20 juta per mahasiswa setiap tahun.', 'dana operasional pendidikan per mahasiswa per tahun', '≥ Rp 20 juta')}

${std('Penerimaan mahasiswa', 'Wakil Dekan Bidang Akademik melaksanakan promosi dan jalur afirmasi agar mahasiswa baru berasal dari minimal 15 provinsi setiap tahun.', 'jumlah provinsi asal mahasiswa baru', '≥ 15 provinsi')}

Standar lain dirumuskan dengan pola yang sama, antara lain rasio DTPR : mahasiswa ≤ 1 : ${c.jenjang === 'Sarjana' ? '25' : c.jenjang === 'Magister' ? '10' : '5'}, bandwidth ≥ 1 Gbps, aksesibilitas seluruh ruang bagi difabel, kuota afirmasi 10% (KIP-K, daerah 3T), dan jalur RPL. Bukti: dokumen standar, Peraturan Rektor tentang Penerimaan Mahasiswa Baru, dan Pedoman Layanan Disabilitas (Lampiran C.2-1).`,

  // Alur kurikulum: 14 → 18 → 22 → 26 → 30 (peninjauan kurikulum, ketercapaian CPL)
  14: (c) => `Kurikulum OBE ${c.ps} ditetapkan dengan SK Rektor No. 120/2023. CPL disusun mengacu pada **KKNI level ${c.kkni}**, SN-DIKTI, ACM/IEEE CS2023, serta kesepakatan asosiasi APTIKOM. CPL mencakup *soft competence* (etika, komunikasi, kepemimpinan) dan *hard competence* (perancangan algoritma, pengembangan sistem cerdas${c.jenjang !== 'Sarjana' ? ', riset mandiri berdampak' : ''}). Penyusunan melibatkan pemangku kepentingan melalui *tracer study*, FGD dengan 12 mitra DUDIKA, asosiasi profesi, alumni, dan mahasiswa.

${std('Peninjauan kurikulum', 'Ketua PS meninjau kurikulum bersama pemangku kepentingan minimal sekali setiap 4 tahun.', 'selang waktu sejak peninjauan kurikulum terakhir', '≤ 4 tahun')}

${std('Ketercapaian CPL', 'Ketua PS memastikan setiap CPL tercapai oleh lulusan setiap angkatan paling lambat angkatan lulus 2024.', 'rata-rata ketercapaian setiap CPL per angkatan', '≥ 75% untuk setiap CPL')}

Bukti: dokumen kurikulum, notulen FGD, dan matriks CPL–MK (Lampiran C.2-2).`,

  // Alur fleksibilitas: 15 → 19 → 23 → 27 → 31 (CBL/PBL, kuliah tamu, rekognisi micro-credential, moderasi)
  15: (c) => `Kebijakan Akademik FILKOM UB (SK Dekan No. 9/2023) mengatur fleksibilitas pembelajaran:

- Maksimal 30% pembelajaran daring/hibrida melalui LMS
- Metode *case-based learning* (CBL) dan *project-based learning* (PBL)
- *Micro-credential* dan sertifikasi industri yang dapat direkognisi hingga 20 SKS
- RPL tipe A dan B${c.jenjang === 'Sarjana' ? '\n- Hak belajar 3 semester di luar PS (MBKM)' : ''}

${std('Metode pembelajaran', 'Ketua PS memastikan minimal 50% MK menerapkan CBL atau PBL paling lambat semester genap 2024.', 'persentase MK yang menerapkan CBL/PBL', '≥ 50%')}

${std('Suasana akademik', 'Ketua PS menyelenggarakan kuliah tamu dari praktisi atau akademisi luar minimal 2 kali setiap semester.', 'jumlah kuliah tamu per semester', '≥ 2')}

${std('Rekognisi micro-credential', 'Ketua PS menyelesaikan konversi *micro-credential* menjadi nilai MK paling lama 2 minggu sejak pengajuan mahasiswa.', 'rata-rata waktu konversi micro-credential', '≤ 2 minggu')}

${std('Penilaian', 'Ketua PS memastikan soal ujian dan rubrik setiap MK dimoderasi oleh tim dosen sebelum digunakan.', 'persentase MK yang soal dan rubriknya dimoderasi', '100%')}

Standar penilaian juga mengatur pemenuhan beban belajar ${c.jenjang === 'Sarjana' ? '144' : c.jenjang === 'Magister' ? '36' : '42'} SKS (Lampiran C.2-3).`,

  // Alur lulusan: 16 → 20 → 24 → 28 → 32 (masa tunggu, kiprah internasional, kepuasan pengguna)
  16: (c) => `Standar prestasi dan kompetensi lulusan ${c.ps} antara lain:

${std('Masa tunggu', 'Ketua PS melaksanakan layanan karier dan kerja sama penempatan agar lulusan memperoleh pekerjaan pertama paling lama 6 bulan setelah lulus.', 'rata-rata masa tunggu kerja lulusan', '≤ 6 bulan')}

${std('Kiprah internasional', 'Ketua PS membuka jejaring kerja internasional agar minimal 10% lulusan bekerja di perusahaan multinasional atau luar negeri paling lambat akhir tahun 2025.', 'persentase lulusan yang bekerja di perusahaan multinasional/luar negeri', '≥ 10%')}

${std('Kepuasan pengguna', 'Ketua PS menjamin kompetensi lulusan sesuai kebutuhan pengguna yang diukur setiap tahun.', 'rata-rata skor kepuasan pengguna lulusan', '≥ 3,5 dari 4')}

Standar lain dirumuskan dengan pola yang sama: IPK rata-rata ≥ 3,25, masa studi ≤ ${c.masaStudi}, ≥ 80% lulusan bekerja di bidang yang relevan, dan prestasi mahasiswa tingkat nasional/internasional${c.jenjang !== 'Sarjana' ? ' serta publikasi mahasiswa di jurnal bereputasi' : ''}. Rekognisi diukur melalui *tracer study* dan survei pengguna lulusan setiap tahun (Lampiran C.2-4).`,

  17: (c) => `Pada TS, standar input pendidikan dilaksanakan sebagai berikut:
- **Sarana prasarana:** 6 laboratorium dengan 240 unit komputer (rasio 1 : 3,8; target 1 : 4), GPU server 8×A100 untuk riset AI, bandwidth 1 Gbps, dan seluruh gedung dilengkapi jalur kursi roda.
- **DTPR:** ${Math.round(28 * Math.max(c.skala, 0.5))} orang, ${c.jenjang === 'Sarjana' ? '46%' : '95%'} bergelar doktor (target ${c.jenjang === 'Sarjana' ? '50%' : '100%'}), dengan rasio terhadap mahasiswa memenuhi standar.
- **Pembiayaan:** dana operasional pendidikan Rp 21,4 juta/mahasiswa/tahun (target ≥ Rp 20 juta).
- **Penerimaan mahasiswa:** ${Math.round(160 * c.skala)} mahasiswa baru dari ${c.jenjang === 'Sarjana' ? '19' : '16'} provinsi (target ≥ 15), 11% melalui jalur afirmasi, dan 3 mahasiswa berkebutuhan khusus didampingi Unit Layanan Disabilitas.

Data rinci tersaji pada Tabel LKPS terkait (Lampiran C.2-5).`,

  18: (c) => `Kurikulum OBE diimplementasikan secara penuh: 100% MK memiliki RPS berbasis CPMK, asesmen berbasis rubrik, dan pengukuran ketercapaian CPL per mahasiswa melalui sistem OBE terintegrasi.

- **Peninjauan kurikulum:** peninjauan menyeluruh terakhir dilakukan pada 2023, masih dalam siklus 4 tahun.
- **Ketercapaian CPL:** rata-rata ketercapaian seluruh CPL pada angkatan lulus TS sebesar 82% (target ≥ 75% untuk setiap CPL).

Pemangku kepentingan terlibat secara nyata: 9 MK diajar bersama praktisi (*co-teaching*), dan 4 mitra DUDIKA menjadi penguji proyek akhir. Kompetensi *soft skill* diukur melalui portofolio dan penilaian sejawat. Bukti: RPS, laporan ketercapaian CPL, dan surat kerja sama mitra (Lampiran C.2-6).`,

  19: (c) => `Fleksibilitas pembelajaran dilaksanakan sesuai kebijakan dan standar yang ditetapkan:

- **Metode pembelajaran:** 62% MK menggunakan CBL/PBL (target ≥ 50%), dan 28% MK menyediakan kelas hibrida di LMS (batas 30%)
- **Suasana akademik:** 14 kuliah tamu dalam dua semester atau rata-rata 7 per semester (target ≥ 2), ditambah seminar riset bulanan dan 4 kelompok studi
- **Rekognisi micro-credential:** ${Math.round(85 * c.skala)} mahasiswa memperoleh *micro-credential* (AWS, Cisco, Google) yang direkognisi, dengan waktu konversi rata-rata 5 minggu
- **Penilaian:** soal dan rubrik dimoderasi di seluruh MK wajib dan 70% MK pilihan
- **RPL:** ${Math.round(12 * c.skala) + 2} mahasiswa diterima melalui jalur RPL${c.jenjang === 'Sarjana' ? '\n- **MBKM:** 38% mahasiswa mengikuti MBKM' : ''}

Tingkat kepuasan mahasiswa terhadap keadilan penilaian 3,52/4 (Lampiran C.2-7).`,

  20: (c) => `Capaian prestasi mahasiswa dan lulusan pada tiga tahun terakhir:
- **Masa tunggu:** rata-rata 3,1 bulan (target ≤ 6 bulan).
- **Kiprah internasional:** sebaran kerja 61% lokal/regional, 31% nasional, dan 8% internasional di Singapura, Jepang, dan Belanda (target ≥ 10%).
- **Kepuasan pengguna:** 3,61/4 dari ${Math.round(120 * c.skala) + 20} responden (target ≥ 3,5).
- **Prestasi dan studi:** ${Math.round(24 * Math.max(c.skala, 0.3))} prestasi nasional, ${Math.round(7 * Math.max(c.skala, 0.4))} prestasi internasional, IPK rata-rata 3,52, dan masa studi rata-rata ${c.jenjang === 'Sarjana' ? '4,1 tahun' : c.jenjang === 'Magister' ? '2,1 tahun' : '3,6 tahun'}.${c.jenjang !== 'Sarjana' ? `\n- **Publikasi:** ${Math.round(40 * c.skala) + 4} publikasi mahasiswa di jurnal/konferensi bereputasi.` : ''}

Data bersumber dari *tracer study* (tingkat respons 68%) dan Tabel LKPS (Lampiran C.2-8).`,

  21: (c) => `Evaluasi ketercapaian standar input pendidikan dilakukan setiap tahun melalui AMI dan monitoring Wakil Dekan. Hasil TS:

- **Sarana prasarana:** rasio komputer tercapai (1 : 3,8; target 1 : 4). Namun, survei kepuasan mahasiswa terhadap sarana prasarana hanya 3,38/4, dengan catatan utama pada kapasitas Wi-Fi di jam sibuk.
- **DTPR bergelar doktor:** belum tercapai (${c.jenjang === 'Sarjana' ? '46% dari target 50%' : '95% dari target 100%'}).
- **Pembiayaan:** tercapai (Rp 21,4 juta; target ≥ Rp 20 juta).
- **Penerimaan mahasiswa:** terlampaui (${c.jenjang === 'Sarjana' ? '19' : '16'} provinsi; target ≥ 15).

**Akar masalah:**

- Dua dosen terlambat menyelesaikan studi S3 karena kendala pendanaan beasiswa
- Titik akses Wi-Fi generasi lama tidak mampu melayani lebih dari 40 perangkat per ruang

Bukti: laporan AMI dan laporan survei (Lampiran C.2-9).`,

  22: (c) => `Evaluasi kurikulum dilakukan melalui analisis ketercapaian CPL per angkatan, survei relevansi kurikulum kepada lulusan dan pengguna, serta *review* oleh dewan penasihat industri. Hasilnya:

- **Ketercapaian CPL:** 9 dari 10 CPL tercapai ≥ 75%. CPL "kemampuan komunikasi ilmiah berbahasa Inggris" baru tercapai 68%.
- **Peninjauan kurikulum:** siklus 4 tahun terpenuhi. Namun, pengguna lulusan (skor kesesuaian kompetensi 3,55/4) menyarankan penguatan *cloud computing* dan MLOps yang belum dapat diakomodasi karena peninjauan berikutnya baru dijadwalkan 2027.

**Akar masalah:**

- MK pendukung CPL komunikasi hanya 2 SKS dan tidak terintegrasi dengan ${c.tugasAkhir}
- Siklus peninjauan 4 tahun terlalu panjang untuk topik teknologi yang cepat berubah

Bukti: laporan ketercapaian CPL dan notulen *review* (Lampiran C.2-10).`,

  23: (c) => `Evaluasi fleksibilitas pembelajaran dibandingkan dengan standar yang ditetapkan:

- **Metode pembelajaran:** terlampaui (62%; target ≥ 50%), dengan rasio kelulusan MK berbasis proyek setara MK lain.
- **Suasana akademik:** terlampaui (7 kuliah tamu per semester; target ≥ 2).
- **Rekognisi micro-credential:** belum tercapai (5 minggu; target ≤ 2 minggu).
- **Penilaian:** belum tercapai (moderasi 100% MK wajib, tetapi baru 70% MK pilihan; target 100%).

Kepuasan layanan pembelajaran 3,47/4 (n = ${Math.round(480 * c.skala) + 30}), dan beban belajar terpenuhi 100%.

**Akar masalah:**

- Belum ada pedoman pemetaan baku antara sertifikasi industri dan MK
- Sebagian MK pilihan diampu dosen tunggal sehingga belum memiliki tim moderasi

Bukti: laporan evaluasi pembelajaran (Lampiran C.2-11).`,

  24: (c) => `Evaluasi ketercapaian standar prestasi dan kompetensi lulusan:

- **Masa tunggu:** terlampaui (3,1 bulan; target ≤ 6 bulan).
- **Kiprah internasional:** belum tercapai (8%; target ≥ 10%).
- **Kepuasan pengguna:** tercapai (3,61; target ≥ 3,5). Analisis per aspek (etika, keahlian bidang, bahasa asing, TI, komunikasi, kerja sama, pengembangan diri) menunjukkan aspek bahasa asing paling rendah (3,21).

Standar IPK dan masa studi juga tercapai.

**Akar masalah:**

- Belum ada program mobilitas atau magang internasional yang terstruktur
- Sertifikasi bahasa asing belum menjadi syarat lulus

Bukti: laporan *tracer study* dan survei pengguna lulusan (Lampiran C.2-12).`,

  25: (c) => `Tindak lanjut evaluasi input pendidikan:
1. **DTPR bergelar doktor:** percepatan studi S3 dua dosen melalui beasiswa internal dan pembebasan tugas mengajar. Satu dosen lulus pada TS+1 (proporsi naik menjadi ${c.jenjang === 'Sarjana' ? '50%' : '98%'}), dan satu dosen lagi dijadwalkan lulus pada semester berikutnya.
2. **Sarana prasarana:** jaringan nirkabel ditingkatkan menjadi Wi-Fi 6 di seluruh ruang kuliah. Kepuasan terhadap sarana prasarana naik dari 3,38 menjadi 3,52.
3. **Penerimaan mahasiswa:** keragaman asal dipertahankan melalui kerja sama beasiswa daerah 3T dengan 3 pemda.

Seluruh tindakan ditetapkan dalam RTM, diberi PIC dan tenggat, serta dipantau dalam *action plan* (Lampiran C.2-13).`,

  26: (c) => `Tindak lanjut evaluasi kurikulum:

- **Ketercapaian CPL:** penulisan ilmiah berbahasa Inggris diintegrasikan dalam ${c.tugasAkhir} dan seminar. Pada evaluasi berikutnya, ketercapaian CPL komunikasi naik menjadi 77%.
- **Peninjauan kurikulum:** dilakukan peninjauan minor tanpa menunggu siklus 4 tahun. Topik *cloud computing* dan MLOps ditambahkan ke MK pilihan, dan RPS 8 MK direvisi.

Perubahan dibahas dalam lokakarya kurikulum bersama mitra DUDIKA dan disahkan melalui SK Dekan (Lampiran C.2-14).`,

  27: (c) => `Tindak lanjut evaluasi fleksibilitas pembelajaran:

- **Rekognisi micro-credential:** UPPS menyusun **Pedoman Rekognisi Micro-credential** dengan tabel pemetaan sertifikasi–MK. Waktu konversi turun dari 5 minggu menjadi 1 minggu.
- **Penilaian:** tim moderasi dibentuk per kelompok keahlian sehingga moderasi mencakup 100% MK pilihan pada semester berikutnya.
- **Metode pembelajaran dan suasana akademik:** capaian dipertahankan melalui hibah pengembangan bahan ajar PBL dan kalender kuliah tamu tahunan.

Bukti: SK pedoman, SK tim moderasi, dan laporan konversi (Lampiran C.2-15).`,

  28: (c) => `Tindak lanjut evaluasi prestasi dan kompetensi lulusan:

- **Kiprah internasional:** UPPS membuka program magang internasional dengan 3 mitra di Malaysia dan Jepang, serta membentuk *career center* PS yang menyalurkan lowongan global. Pada TS+1, 14 mahasiswa mengikuti magang internasional.
- **Kepuasan pengguna (aspek bahasa asing):** sertifikasi bahasa Inggris (TOEFL ITP ≥ ${c.jenjang === 'Sarjana' ? '475' : '500'}) dijadikan syarat yudisium. Skor aspek bahasa asing pada survei pengguna naik dari 3,21 menjadi 3,39.

Bukti: dokumen kerja sama magang dan laporan survei pengguna (Lampiran C.2-16).`,

  29: (c) => `Berdasarkan ketercapaian standar input, UPPS menaikkan standar melalui revisi standar (SK Dekan No. 3/TS+1):

${c.jenjang === 'Sarjana'
    ? naik('DTPR', 'Dekan melakukan rekrutmen dan mendorong studi lanjut dosen agar minimal 60% DTPR bergelar doktor paling lambat akhir tahun 2028.', 'persentase DTPR bergelar doktor', '60%', '50%')
    : naik('DTPR', 'Dekan mempertahankan 100% DTPR bergelar doktor dan mendorong kenaikan jabatan agar minimal 40% DTPR berjabatan Lektor Kepala paling lambat akhir tahun 2028.', 'persentase DTPR berjabatan Lektor Kepala', '≥ 40%')}

${naik('Sarana prasarana', 'Dekan menambah komputer laboratorium dan menjamin jaringan Wi-Fi 6 di seluruh ruang belajar paling lambat akhir tahun 2027.', 'rasio komputer laboratorium : mahasiswa', '1 : 3', '1 : 4')}

${naik('Pembiayaan', 'Dekan mengalokasikan dana operasional pendidikan minimal Rp 23 juta per mahasiswa setiap tahun.', 'dana operasional pendidikan per mahasiswa per tahun', '≥ Rp 23 juta', '≥ Rp 20 juta')}

${naik('Penerimaan mahasiswa', 'Wakil Dekan Bidang Akademik memperluas promosi dan beasiswa daerah agar mahasiswa baru berasal dari minimal 20 provinsi setiap tahun.', 'jumlah provinsi asal mahasiswa baru', '≥ 20 provinsi', '≥ 15 provinsi')}

Ditambahkan pula standar baru tentang ketersediaan fasilitas komputasi awan untuk pembelajaran. Peningkatan ini menjadi indikator kinerja utama fakultas dalam Renop (Lampiran C.2-17).`,

  30: (c) => `Kurikulum ${c.ps} ditingkatkan melalui peninjauan menyeluruh menjadi Kurikulum 2025 yang mengintegrasikan AI generatif, keamanan siber, dan keberlanjutan digital. Standarnya dinaikkan:

${naik('Ketercapaian CPL', 'Ketua PS memastikan setiap CPL tercapai oleh lulusan setiap angkatan.', 'rata-rata ketercapaian setiap CPL per angkatan', '≥ 80% untuk setiap CPL', '≥ 75%')}

${naik('Peninjauan kurikulum', 'Ketua PS meninjau kurikulum secara menyeluruh setiap 4 tahun dan secara minor setiap tahun bersama *Industrial Advisory Board*.', 'frekuensi peninjauan minor kurikulum', '1 kali per tahun', 'peninjauan menyeluruh setiap ≤ 4 tahun')}

*Industrial Advisory Board* rapat dua kali setahun. Kurikulum juga dipetakan ke kerangka akreditasi internasional sebagai persiapan akreditasi IABEE (Lampiran C.2-18).`,

  31: (c) => `Fleksibilitas pembelajaran dioptimalkan dengan menaikkan standar:

${naik('Metode pembelajaran', 'Ketua PS memastikan MK menerapkan CBL atau PBL paling lambat semester genap TS+2.', 'persentase MK yang menerapkan CBL/PBL', '≥ 60%', '≥ 50%')}

${naik('Rekognisi micro-credential', 'Ketua PS menyelesaikan konversi *micro-credential* paling lama 1 minggu sejak pengajuan, dengan batas rekognisi dinaikkan dari 20 menjadi 24 SKS.', 'rata-rata waktu konversi micro-credential', '≤ 1 minggu', '≤ 2 minggu')}

${naik('Sertifikasi industri', 'Ketua PS memfasilitasi mahasiswa memperoleh sertifikasi industri sebelum lulus.', 'persentase lulusan yang memiliki sertifikasi industri', '≥ 20%')}

UPPS juga membuka kelas internasional berbahasa Inggris dan menerapkan *learning analytics* di LMS untuk mendeteksi mahasiswa berisiko gagal sejak minggu ke-6. Hasil awal TS+1: 27% mahasiswa telah bersertifikat industri (Lampiran C.2-19).`,

  32: (c) => `Standar prestasi dan kompetensi lulusan ditingkatkan:

${naik('Masa tunggu', 'Ketua PS memperluas kerja sama penempatan agar lulusan memperoleh pekerjaan pertama paling lama 4 bulan setelah lulus.', 'rata-rata masa tunggu kerja lulusan', '≤ 4 bulan', '≤ 6 bulan')}

${naik('Kepuasan pengguna', 'Ketua PS menjamin kompetensi lulusan sesuai kebutuhan pengguna, dengan tidak ada aspek yang tertinggal.', 'rata-rata skor kepuasan pengguna dan skor terendah per aspek', '≥ 3,6 dari 4, setiap aspek ≥ 3,4', '≥ 3,5 dari 4')}

${naik('Kewirausahaan', 'Ketua PS membina mahasiswa melalui inkubator bisnis UB agar lulusan mendirikan usaha berbasis teknologi.', 'persentase lulusan yang berwirausaha teknologi', '≥ 5%')}

Target kiprah internasional (≥ 10%) dipertahankan karena belum tercapai. UPPS juga memperluas jejaring alumni global sebagai mentor, dan capaian dipantau melalui dasbor *tracer study* daring yang diperbarui setiap semester (Lampiran C.2-20).`,

  // ===== C.3 Relevansi Penelitian =====
  // Alur input: 33 → 36 → 39 → 42 → 45 (penelitian per DTPR, dana, sarana GPU)
  33: (c) => `Standar penelitian ${c.ps} (bagian dari Standar Penelitian UB) dilengkapi **peta jalan penelitian** PS 2021–2030 yang diturunkan dari Rencana Induk Penelitian UB dan visi keilmuan PS, dengan tiga topik payung:

- *Trustworthy AI*
- Sistem cerdas untuk kesehatan
- Keamanan siber

${std('DTPR', 'Dekan memastikan setiap DTPR memimpin minimal 1 penelitian setiap tahun.', 'jumlah penelitian per DTPR per tahun', '≥ 1')}

${std('Pembiayaan', 'Dekan mengalokasikan dana penelitian internal minimal Rp 15 juta per DTPR setiap tahun.', 'dana penelitian per DTPR per tahun', '≥ Rp 15 juta')}

${std('Sarana penelitian', 'Kepala Laboratorium menjamin GPU server dapat diakses 24 jam dengan waktu tunggu pekerjaan komputasi paling lama 24 jam.', 'rata-rata waktu tunggu pekerjaan komputasi pada GPU server', '≤ 24 jam')}

Bukti: Renip, dokumen peta jalan, dan SK kelompok riset (Lampiran C.3-1).`,

  // Alur peta jalan: 34 → 37 → 40 → 43 → 46 (pelibatan mahasiswa, kemitraan, kesesuaian tugas akhir)
  34: (c) => `Kebijakan penelitian mewajibkan setiap penelitian DTPR berada dalam payung peta jalan, dan ${c.tugasAkhir} diarahkan menjadi bagian dari penelitian dosen. Topik ditetapkan berdasarkan visi misi UB, UPPS, visi keilmuan PS, dan kebutuhan masyarakat/DUDIKA hasil FGD dengan mitra rumah sakit, pemda, dan industri keamanan siber.

${std('Pelibatan mahasiswa', `Ketua kelompok riset melibatkan minimal 1 ${c.mhsRiset} dalam setiap penelitian DTPR.`, 'persentase penelitian DTPR yang melibatkan mahasiswa', '≥ 70%')}

${std('Kemitraan', 'Ketua PS mendorong penelitian DTPR dilaksanakan bersama mitra DUDIKA paling lambat akhir tahun 2025.', 'persentase penelitian DTPR yang bermitra dengan DUDIKA', '≥ 30%')}

${std('Kesesuaian tugas akhir', `Ketua PS mengarahkan topik ${c.tugasAkhir} agar berada dalam payung peta jalan penelitian.`, `persentase ${c.tugasAkhir} dalam payung peta jalan`, c.jenjang === 'Sarjana' ? '≥ 50%' : '≥ 90%')}

Bukti: kebijakan penelitian fakultas dan notulen FGD (Lampiran C.3-2).`,

  // Alur luaran: 35 → 38 → 41 → 44 → 47 (publikasi Q1–Q2, hibah eksternal, HKI)
  35: (c) => `Standar luaran penelitian ${c.ps} antara lain:

${std('Publikasi', `DTPR mempublikasikan minimal ${c.jenjang === 'Sarjana' ? '1' : c.jenjang === 'Magister' ? '1,5' : '2'} artikel per tahun, dengan sebagian di jurnal internasional bereputasi Q1–Q2.`, 'persentase publikasi DTPR di jurnal Q1–Q2', '≥ 30% per tahun')}

${std('Hibah eksternal', 'Dekan mendorong DTPR memperoleh hibah penelitian dari sumber di luar UB setiap tahun.', 'persentase DTPR yang memperoleh hibah eksternal', '≥ 40% per tahun')}

${std('HKI', 'Ketua kelompok riset mendaftarkan luaran penelitian yang layak sebagai HKI.', 'jumlah HKI per tahun', '≥ 5')}

Standar lain dirumuskan dengan pola yang sama: ≥ 5 kerja sama penelitian aktif dan keberlanjutan penelitian berupa hilirisasi atau penelitian lanjutan multi-tahun. Kebijakan insentif publikasi dan HKI ditetapkan dalam Peraturan Rektor No. 14/2023 (Lampiran C.3-3).`,

  36: (c) => `Pelaksanaan standar input penelitian pada TS:

- **DTPR:** ${Math.round(28 * Math.max(c.skala, 0.5))} DTPR melaksanakan ${Math.round(41 * Math.max(c.skala, 0.5))} judul penelitian, atau 1,46 penelitian/DTPR (target ≥ 1)
- **Pembiayaan:** dana penelitian Rp ${Math.round(1850 * Math.max(c.skala, 0.5)).toLocaleString('id-ID')} juta atau Rp 33 juta/DTPR (target ≥ Rp 15 juta), 58% dari sumber eksternal
- **Sarana penelitian:** GPU server digunakan rata-rata 78% kapasitas, tetapi waktu tunggu pekerjaan komputasi mencapai rata-rata 3 hari menjelang tenggat konferensi (target ≤ 24 jam)

Seluruh penelitian dipetakan ke peta jalan: 46% *trustworthy AI*, 32% kesehatan cerdas, dan 22% keamanan siber. Bukti: Tabel LKPS penelitian DTPR dan log pemanfaatan laboratorium (Lampiran C.3-4).`,

  37: (c) => `Implementasi peta jalan penelitian berjalan sesuai milestone. Dari ${Math.round(41 * Math.max(c.skala, 0.5))} penelitian:

- **Pelibatan mahasiswa:** 83% melibatkan ${c.mhsRiset}, dengan ${Math.round(96 * c.skala) + 6} mahasiswa terlibat (target ≥ 70%)
- **Kemitraan:** 37% bermitra dengan DUDIKA (target ≥ 30%), misalnya sistem triase berbasis AI bersama rumah sakit mitra di Malang dan deteksi *fraud* bersama bank daerah Jawa Timur
- **Kesesuaian tugas akhir:** ${c.jenjang === 'Sarjana' ? '41%' : '88%'} ${c.tugasAkhir} berada dalam payung peta jalan (target ${c.jenjang === 'Sarjana' ? '≥ 50%' : '≥ 90%'})

Bukti: Tabel LKPS penelitian yang melibatkan mahasiswa dan dokumen kerja sama (Lampiran C.3-5).`,

  38: (c) => `Luaran penelitian tiga tahun terakhir:

- **Publikasi:** ${Math.round(62 * Math.max(c.skala, 0.5))} publikasi bereputasi, 26% di antaranya di jurnal Q1–Q2 (target ≥ 30%)
- **Hibah eksternal:** ${Math.round(18 * Math.max(c.skala, 0.5))} hibah (BIMA, LPDP RIIM, industri) yang diperoleh 43% DTPR (target ≥ 40%), termasuk 1 hibah internasional
- **HKI:** 16 HKI, termasuk 2 paten sederhana, atau rata-rata 5,3 per tahun (target ≥ 5)
- **Kerja sama:** 9 kerja sama penelitian aktif, 3 di antaranya internasional (antara lain dengan universitas mitra di Malaysia)

Keberlanjutan: 3 hasil penelitian dihilirkan menjadi produk yang digunakan mitra, dan 5 penelitian berlanjut ke skema multi-tahun. Data rinci di Tabel LKPS publikasi dan luaran penelitian (Lampiran C.3-6).`,

  39: (c) => `Evaluasi tahunan oleh LPPM dan UPPS terhadap standar input penelitian:

- **DTPR:** terlampaui (1,46 penelitian/DTPR; target ≥ 1).
- **Pembiayaan:** terlampaui (Rp 33 juta/DTPR; target ≥ Rp 15 juta).
- **Sarana penelitian:** belum tercapai. Waktu tunggu GPU server rata-rata 3 hari menjelang tenggat konferensi (target ≤ 24 jam), dengan utilisasi mencapai 100% pada periode tersebut tetapi rendah di periode lain.

Peta jalan juga dievaluasi capaian milestone-nya: 7 dari 8 milestone tercapai. Akar masalah ketimpangan utilisasi: belum ada sistem penjadwalan dan antrean komputasi. Survei kepuasan dosen dan mahasiswa terhadap layanan penelitian 3,44/4 (Lampiran C.3-7).`,

  40: (c) => `Evaluasi implementasi peta jalan dan pelibatan mahasiswa:

- **Pelibatan mahasiswa:** tercapai (83%; target ≥ 70%).
- **Kemitraan:** tercapai (37%; target ≥ 30%).
- **Kesesuaian tugas akhir:** belum tercapai (${c.jenjang === 'Sarjana' ? '41%; target ≥ 50%' : '88%; target ≥ 90%'}).

Akar masalah: sebagian mahasiswa memilih topik di luar kelompok riset karena informasi topik dosen belum tersedia secara terpusat (Lampiran C.3-8).`,

  41: (c) => `Evaluasi luaran penelitian:

- **Publikasi:** jumlah publikasi per DTPR terlampaui (1,6 artikel/DTPR/tahun), tetapi proporsi Q1–Q2 belum tercapai (26%; target ≥ 30%).
- **Hibah eksternal:** tercapai (43% DTPR; target ≥ 40%), tetapi hibah internasional baru 1 judul.
- **HKI:** tercapai (5,3 per tahun; target ≥ 5).

**Akar masalah:**

- DTPR muda belum berpengalaman menulis untuk jurnal Q1
- Kolaborasi internasional masih bergantung pada beberapa dosen senior

Hasil evaluasi dibahas dalam RTM dan rapat kelompok riset (Lampiran C.3-9).`,

  42: (c) => `Tindak lanjut evaluasi input penelitian:

- **Sarana penelitian:** UPPS menerapkan sistem antrean komputasi (SLURM) dengan kuota per kelompok riset dan menambah 2 node GPU melalui hibah peralatan. Waktu tunggu rata-rata turun menjadi 10 jam, juga menjelang tenggat konferensi.
- **Peta jalan:** milestone yang belum tercapai dijadwal ulang dengan pembiayaan tambahan dari skema penelitian unggulan fakultas.

Bukti: SK kebijakan antrean komputasi dan log pemanfaatan GPU (Lampiran C.3-10).`,

  43: (c) => `Tindak lanjut evaluasi peta jalan dan pelibatan mahasiswa:

- **Kesesuaian tugas akhir:** UPPS meluncurkan portal **Bursa Topik Riset** yang memuat topik dari setiap kelompok riset, serta mewajibkan pembimbing berasal dari kelompok riset terkait. Pada TS+1, kesesuaian topik naik menjadi ${c.jenjang === 'Sarjana' ? '63%' : '96%'}.
- **Pelibatan mahasiswa dan kemitraan:** capaian dipertahankan melalui *research day* tahunan yang mempertemukan mahasiswa, dosen, dan mitra.

Bukti: tautan portal, notulen *research day*, dan data topik ${c.tugasAkhir} (Lampiran C.3-11).`,

  44: (c) => `Tindak lanjut evaluasi luaran penelitian:

- **Publikasi:** klinik penulisan artikel Q1 dengan mentor *visiting professor* dan insentif tambahan untuk publikasi Q1. Pada TS+1, proporsi publikasi Q1–Q2 naik menjadi 33%.
- **Hibah eksternal:** skema *matching fund* untuk penelitian yang melibatkan mitra internasional. Pada TS+1 diperoleh 2 hibah kolaborasi internasional.

Bukti: laporan klinik penulisan dan kontrak hibah (Lampiran C.3-12).`,

  45: (c) => `Standar input penelitian ditingkatkan melalui revisi standar penelitian dan Renip fakultas:

${naik('DTPR', 'Dekan memastikan setiap DTPR memimpin penelitian setiap tahun, dengan sebagian dalam skema multi-tahun.', 'jumlah penelitian per DTPR per tahun', '≥ 1,5', '≥ 1')}

${naik('Pembiayaan', 'Dekan mengalokasikan dan memfasilitasi dana penelitian internal maupun eksternal minimal Rp 30 juta per DTPR setiap tahun.', 'dana penelitian per DTPR per tahun', '≥ Rp 30 juta', '≥ Rp 15 juta')}

${naik('Sarana penelitian', 'Kepala Laboratorium menjamin waktu tunggu pekerjaan komputasi paling lama 12 jam, didukung komputasi awan riset sebagai cadangan kapasitas.', 'rata-rata waktu tunggu pekerjaan komputasi', '≤ 12 jam', '≤ 24 jam')}

Peta jalan juga diperbarui untuk periode 2025–2035 dengan topik AI untuk keberlanjutan (Lampiran C.3-13).`,

  46: (c) => `Implementasi peta jalan dan pelibatan mahasiswa dioptimalkan dengan target baru:

${naik('Pelibatan mahasiswa', `Ketua kelompok riset melibatkan ${c.mhsRiset} dalam penelitian DTPR.`, 'persentase penelitian DTPR yang melibatkan mahasiswa', '≥ 90%', '≥ 70%')}

${naik('Kemitraan', 'Ketua PS mendorong penelitian bersama mitra DUDIKA melalui *joint research lab* dengan dua mitra industri.', 'persentase penelitian DTPR yang bermitra dengan DUDIKA', '≥ 40%', '≥ 30%')}

${naik('Kesesuaian tugas akhir', `Ketua PS memastikan topik ${c.tugasAkhir} berada dalam payung peta jalan melalui Bursa Topik Riset.`, `persentase ${c.tugasAkhir} dalam payung peta jalan`, c.jenjang === 'Sarjana' ? '≥ 60%' : '100%', c.jenjang === 'Sarjana' ? '≥ 50%' : '≥ 90%')}

Dampak: jumlah mahasiswa yang menjadi penulis bersama publikasi bereputasi meningkat 45% (Lampiran C.3-14).`,

  47: (c) => `Standar luaran penelitian dinaikkan:

${naik('Publikasi', 'DTPR mempublikasikan artikel di jurnal internasional bereputasi Q1–Q2.', 'persentase publikasi DTPR di jurnal Q1–Q2', '≥ 40% per tahun', '≥ 30%')}

${naik('Hibah eksternal', 'Dekan mendorong DTPR memperoleh hibah eksternal, termasuk hibah internasional.', 'persentase DTPR yang memperoleh hibah eksternal dan jumlah hibah internasional', '≥ 50% DTPR dan ≥ 2 hibah internasional per tahun', '≥ 40% DTPR')}

${naik('HKI', 'Ketua kelompok riset mendaftarkan luaran penelitian sebagai HKI, termasuk paten.', 'jumlah HKI per tahun dan paten *granted*', '≥ 7 HKI per tahun dan ≥ 1 paten *granted* per dua tahun', '≥ 5 HKI per tahun')}

Skema hilirisasi diperkuat melalui kerja sama dengan pusat inkubasi bisnis UB, dan keberlanjutan penelitian dijamin dengan model kelompok riset yang memiliki rencana pendanaan 5 tahun (Lampiran C.3-15).`,

  // ===== C.4 Relevansi PkM =====
  // Alur input: 48 → 51 → 54 → 57 → 60 (PkM per DTPR, dana, layanan Pusat Layanan TIK)
  48: (c) => `Standar PkM FILKOM UB dilengkapi **peta jalan PkM** 2021–2030 berbasis layanan kepakaran:

- Literasi digital UMKM
- Transformasi digital desa
- Keamanan siber sekolah

${std('DTPR', 'Dekan memastikan setiap DTPR melaksanakan minimal 1 kegiatan PkM setiap tahun.', 'jumlah PkM per DTPR per tahun', '≥ 1')}

${std('Pembiayaan', 'Dekan mengalokasikan dana PkM minimal Rp 7,5 juta per DTPR setiap tahun.', 'dana PkM per DTPR per tahun', '≥ Rp 7,5 juta')}

${std('Sarana PkM', 'Kepala Pusat Layanan TIK Masyarakat menyelenggarakan pelatihan bagi masyarakat, termasuk sesi di luar jam kerja bagi pelaku UMKM.', 'jumlah sesi pelatihan per tahun dan proporsi sesi di luar jam kerja', '≥ 40 sesi, ≥ 25% di luar jam kerja')}

Bukti: Renstra PkM, dokumen peta jalan, dan SK pusat layanan (Lampiran C.4-1).`,

  // Alur peta jalan: 49 → 52 → 55 → 58 → 61 (pelibatan mahasiswa, penerapan hasil penelitian)
  49: (c) => `Kebijakan PkM mewajibkan setiap kegiatan sesuai peta jalan. Topik ditetapkan berdasarkan visi misi UB, UPPS, keilmuan PS, serta kebutuhan masyarakat dan DUDIKA hasil *need assessment* bersama Dinas Kominfo dan Dinas Koperasi-UMKM.

${std('Pelibatan mahasiswa', 'Ketua tim PkM melibatkan minimal 2 mahasiswa dalam setiap kegiatan PkM.', 'persentase PkM yang melibatkan mahasiswa', '≥ 80%')}

${std('Penerapan hasil penelitian', 'Ketua PS mengarahkan PkM DTPR sebagai penerapan hasil penelitian paling lambat akhir tahun 2025.', 'persentase PkM yang merupakan penerapan hasil penelitian', '≥ 50%')}

Bukti: pedoman PkM fakultas dan laporan *need assessment* (Lampiran C.4-2).`,

  // Alur luaran: 50 → 53 → 56 → 59 → 62 (hibah eksternal, diseminasi, keberlanjutan mitra)
  50: (c) => `Standar luaran PkM antara lain:

${std('Hibah eksternal', 'Dekan mendorong DTPR memperoleh hibah PkM dari sumber di luar UB setiap tahun.', 'persentase DTPR yang memperoleh hibah PkM eksternal', '≥ 30% per tahun')}

${std('Diseminasi', 'Ketua tim PkM mendiseminasikan hasil PkM melalui jurnal pengabdian terakreditasi SINTA atau media massa.', 'jumlah artikel jurnal pengabdian per tahun', '≥ 5')}

${std('Keberlanjutan', 'Ketua tim PkM mendampingi mitra binaan secara berkelanjutan hingga mitra mampu mandiri.', 'lama pendampingan mitra binaan', '≥ 2 tahun')}

Standar lain dirumuskan dengan pola yang sama: ≥ 5 kerja sama PkM dan ≥ 3 HKI (hak cipta modul/aplikasi) per tahun (Lampiran C.4-3).`,

  51: (c) => `Pelaksanaan standar input PkM pada TS:

- **DTPR:** ${Math.round(28 * Math.max(c.skala, 0.5))} DTPR melaksanakan ${Math.round(33 * Math.max(c.skala, 0.5))} kegiatan PkM, atau 1,18 PkM/DTPR (target ≥ 1)
- **Pembiayaan:** dana PkM Rp ${Math.round(310 * Math.max(c.skala, 0.5)).toLocaleString('id-ID')} juta atau Rp 11 juta/DTPR (target ≥ Rp 7,5 juta)
- **Sarana PkM:** Pusat Layanan TIK Masyarakat menyelenggarakan 46 sesi pelatihan (target ≥ 40), tetapi hanya 9% di luar jam kerja (target ≥ 25%)

Kegiatan sesuai peta jalan: 52% literasi digital UMKM, 30% transformasi digital desa, dan 18% keamanan siber sekolah. Bukti: Tabel LKPS PkM DTPR dan laporan kegiatan (Lampiran C.4-4).`,

  52: (c) => `Implementasi peta jalan PkM pada TS:

- **Pelibatan mahasiswa:** ${Math.round(110 * c.skala) + 8} mahasiswa terlibat dalam 88% kegiatan (target ≥ 80%)
- **Penerapan hasil penelitian:** 55% PkM merupakan penerapan hasil penelitian DTPR (target ≥ 50%)

Contoh kegiatan:

- Pengembangan aplikasi kasir dan pencatatan keuangan untuk 60 UMKM binaan bersama Dinas Koperasi
- Pendampingan 12 desa di Kabupaten Malang membangun situs desa

Bukti: Tabel LKPS PkM yang melibatkan mahasiswa (Lampiran C.4-5).`,

  53: (c) => `Luaran PkM tiga tahun terakhir:

- **Hibah eksternal:** 7 hibah PkM eksternal yang diperoleh 18% DTPR (target ≥ 30%)
- **Diseminasi:** 15 artikel di jurnal pengabdian SINTA 2–4, atau 5 per tahun (target ≥ 5), dan 21 liputan media
- **Keberlanjutan:** seluruh mitra binaan didampingi minimal 2 tahun, dan 3 desa binaan telah mandiri mengelola sistem informasi desa serta menjadi percontohan kabupaten
- **Kerja sama dan HKI:** 8 kerja sama aktif dan 9 HKI hak cipta

Bukti: Tabel LKPS luaran PkM (Lampiran C.4-6).`,

  54: (c) => `Evaluasi standar input PkM:

- **DTPR:** tercapai (1,18 PkM/DTPR; target ≥ 1).
- **Pembiayaan:** terlampaui (Rp 11 juta/DTPR; target ≥ Rp 7,5 juta).
- **Sarana PkM:** jumlah sesi tercapai (46; target ≥ 40), tetapi sesi di luar jam kerja belum tercapai (9%; target ≥ 25%).

Peta jalan tercapai 6 dari 7 milestone. Akar masalah sesi di luar jam kerja: keterbatasan tenaga pendamping teknis. Survei kepuasan mitra PkM menunjukkan 3,62/4 (n = 54 mitra) (Lampiran C.4-7).`,

  55: (c) => `Evaluasi implementasi peta jalan PkM:

- **Pelibatan mahasiswa:** tercapai (88%; target ≥ 80%). Namun, keterlibatan mahasiswa sering terbatas pada peran logistik, belum pada penerapan keilmuan.
- **Penerapan hasil penelitian:** tercapai (55%; target ≥ 50%).

Akar masalah peran mahasiswa: belum ada mekanisme rekognisi kegiatan PkM ke dalam SKS atau portofolio kompetensi mahasiswa, dan proposal PkM belum mencantumkan peran setiap mahasiswa (Lampiran C.4-8).`,

  56: (c) => `Evaluasi luaran PkM:

- **Hibah eksternal:** belum tercapai (18% DTPR; target ≥ 30%).
- **Diseminasi:** tercapai (5 artikel per tahun), tetapi seluruhnya di tingkat nasional.
- **Keberlanjutan:** tercapai (pendampingan ≥ 2 tahun), tetapi baru 3 dari 12 desa binaan yang mandiri.

Akar masalah hibah: proposal PkM eksternal kurang menonjolkan dampak terukur, sesuai catatan reviewer (Lampiran C.4-9).`,

  57: (c) => `Tindak lanjut evaluasi input PkM:

- **Sarana PkM:** UPPS merekrut 2 tenaga pendamping teknis paruh waktu dari alumni dan membuka layanan konsultasi daring Pusat Layanan TIK. Sesi di luar jam kerja naik menjadi 28% pada TS+1.
- **Peta jalan:** milestone yang tertunda dijadwal ulang dengan anggaran tambahan.

Bukti: SK penugasan pendamping dan laporan layanan (Lampiran C.4-10).`,

  58: (c) => `Tindak lanjut evaluasi pelibatan mahasiswa: kegiatan PkM yang memenuhi kriteria dapat direkognisi sebagai MK pilihan atau dicatat dalam SKPI, dan setiap mahasiswa dalam tim PkM wajib memiliki peran teknis yang tertulis dalam proposal. Pedoman ini disahkan melalui SK Dekan dan diterapkan sejak TS+1. Hasilnya, 74% mahasiswa dalam tim PkM memiliki peran teknis (Lampiran C.4-11).`,

  59: (c) => `Tindak lanjut evaluasi luaran PkM:

- **Hibah eksternal:** klinik penulisan proposal hibah PkM berbasis dampak (*theory of change*) dengan pendampingan reviewer berpengalaman. Pada TS+1, 5 proposal PkM eksternal didanai sehingga DTPR penerima hibah naik menjadi 32%.
- **Diseminasi:** penjajakan publikasi hasil PkM pada konferensi internasional.
- **Keberlanjutan:** desa binaan yang telah mandiri dilibatkan sebagai mentor bagi desa binaan lain.

Bukti: laporan klinik dan kontrak hibah (Lampiran C.4-12).`,

  60: (c) => `Standar input PkM ditingkatkan:

${naik('Pembiayaan', 'Dekan mengalokasikan dana PkM minimal Rp 10 juta per DTPR setiap tahun.', 'dana PkM per DTPR per tahun', '≥ Rp 10 juta', '≥ Rp 7,5 juta')}

${naik('Sarana PkM', 'Kepala Pusat Layanan TIK Masyarakat, yang dikembangkan menjadi *Digital Village Hub* dengan dukungan pemda, menyelenggarakan pelatihan luring dan daring bagi masyarakat.', 'jumlah sesi pelatihan per tahun dan proporsi sesi di luar jam kerja', '≥ 60 sesi, ≥ 30% di luar jam kerja', '≥ 40 sesi, ≥ 25% di luar jam kerja')}

Peta jalan PkM juga diperbarui dengan topik AI untuk layanan publik (Lampiran C.4-13).`,

  61: (c) => `Pelibatan mahasiswa dalam PkM ditingkatkan melalui program "PkM Berbasis Proyek" yang terintegrasi dengan MK proyek:

${naik('Pelibatan mahasiswa', 'Ketua tim PkM melibatkan mahasiswa dengan peran teknis yang tertulis dalam proposal.', 'persentase PkM yang melibatkan mahasiswa dengan peran teknis', '≥ 90%', '≥ 80% tanpa syarat peran')}

${naik('Penerapan hasil penelitian', 'Ketua PS mengarahkan PkM DTPR sebagai penerapan hasil penelitian.', 'persentase PkM yang merupakan penerapan hasil penelitian', '≥ 60%', '≥ 50%')}

${naik('Pengalaman PkM mahasiswa', 'Ketua PS memastikan mahasiswa terlibat dalam PkM sebelum lulus.', 'persentase lulusan yang pernah terlibat PkM', '≥ 50%')}

Keterlibatan mitra DUDIKA juga diperluas melalui skema *corporate social responsibility* bersama dua perusahaan teknologi (Lampiran C.4-14).`,

  62: (c) => `Standar luaran PkM dinaikkan:

${naik('Hibah eksternal', 'Dekan mendorong DTPR memperoleh hibah PkM dari sumber di luar UB.', 'persentase DTPR yang memperoleh hibah PkM eksternal', '≥ 40% per tahun', '≥ 30%')}

${naik('Diseminasi', 'Ketua tim PkM mendiseminasikan hasil PkM di jurnal pengabdian dan forum internasional.', 'jumlah diseminasi internasional per tahun', '≥ 1', '≥ 5 artikel nasional per tahun')}

${naik('Keberlanjutan', 'Ketua tim PkM mendampingi mitra binaan hingga mandiri dalam 3 tahun.', 'persentase mitra binaan yang mandiri dalam 3 tahun', '≥ 50%', 'pendampingan ≥ 2 tahun')}

Hasil PkM juga didorong menjadi produk ber-HKI yang dapat direplikasi daerah lain (Lampiran C.4-15).`,

  // ===== C.5 Akuntabilitas =====
  // Alur tata kelola: 63 → 65 → 67 → 69 → 71 (pertanggungjawaban keuangan, SDM profesional)
  63: (c) => `UPPS memiliki otonomi pengelolaan berdasarkan Statuta UB sebagai PTN-BH dengan kebijakan tata kelola yang transparan dan akuntabel:

- RKAT disusun partisipatif dan dipublikasikan internal
- Kapasitas sarana prasarana ditetapkan berbasis rasio kebutuhan
- SDM profesional wajib bersertifikat pendidik (dosen) dan bersertifikat kompetensi (tendik)

${std('Pertanggungjawaban keuangan', 'Kepala Bagian Tata Usaha memastikan laporan pertanggungjawaban setiap kegiatan diserahkan paling lama 14 hari setelah kegiatan selesai.', 'rata-rata waktu penyerahan laporan pertanggungjawaban kegiatan', '≤ 14 hari')}

${std('SDM profesional', 'Dekan mengikutsertakan dosen dalam sertifikasi pendidik dan tendik dalam uji kompetensi paling lambat akhir tahun 2024.', 'persentase dosen bersertifikat pendidik dan tendik bersertifikat kompetensi', 'dosen ≥ 90%, tendik ≥ 70%')}

Standar lain dirumuskan dengan pola yang sama, misalnya 100% laporan keuangan diaudit (Lampiran C.5-1).`,

  // Alur audit mutu: 64 → 66 → 68 → 70 → 72 (tindak lanjut audit, aset, perawatan laboratorium)
  64: (c) => `Kebijakan audit mutu ditetapkan untuk memastikan pemenuhan tupoksi tata kelola dan tata pamong, sarana prasarana, dan SDM. Audit meliputi:

- Audit keuangan oleh SPI dan KAP
- AMI tahunan
- Audit aset
- Audit kinerja SDM melalui BKD/SKP

${std('Tindak lanjut audit', 'Dekan memastikan setiap laporan audit ditindaklanjuti dengan rencana perbaikan yang terdokumentasi paling lama 1 bulan setelah laporan diterima.', 'persentase laporan audit yang memiliki rencana perbaikan terdokumentasi', '100%')}

${std('Aset', 'Kepala Subbagian Umum dan Perlengkapan mencatat dan melabeli seluruh aset UPPS dalam SIMAK-BMN.', 'persentase aset yang tercatat dan berlabel', '100%')}

${std('Perawatan laboratorium', 'Kepala Laboratorium menyusun dan menjalankan rencana perawatan berkala setiap laboratorium.', 'persentase laboratorium yang memiliki rencana perawatan berkala', '100%')}

Bukti: Pedoman Audit Mutu dan SK tim auditor (Lampiran C.5-2).`,

  65: (c) => `Pelaksanaan tata kelola yang transparan dan akuntabel pada TS:

- **Pertanggungjawaban keuangan:** laporan pertanggungjawaban kegiatan diserahkan rata-rata 21 hari setelah kegiatan (target ≤ 14 hari). Laporan keuangan fakultas memperoleh opini WTP.
- **SDM profesional:** 93% dosen bersertifikat pendidik (target ≥ 90%) dan 76% tendik bersertifikat kompetensi (target ≥ 70%).
- **Transparansi:** RKAT dipublikasikan di portal internal, dan Dekan menyampaikan laporan pertanggungjawaban tahunan di rapat senat.

Bukti: laporan keuangan, rekap e-SPJ, dan data sertifikasi SDM (Lampiran C.5-3).`,

  66: (c) => `Audit mutu dilaksanakan sesuai jadwal: audit keuangan SPI (Maret), audit KAP (April), AMI (Agustus), dan *stock opname* aset (Desember). Seluruh unit telah diaudit.

- **Tindak lanjut audit:** 100% laporan audit memiliki rencana perbaikan terdokumentasi (target 100%)
- **Aset:** 96% aset tercatat dan berlabel dalam SIMAK-BMN (target 100%)
- **Perawatan laboratorium:** 4 dari 6 laboratorium memiliki rencana perawatan berkala (target 100%)

Bukti: laporan audit dan berita acara *stock opname* (Lampiran C.5-4).`,

  67: (c) => `Evaluasi standar tata kelola:

- **Pertanggungjawaban keuangan:** belum tercapai (rata-rata 21 hari; target ≤ 14 hari).
- **SDM profesional:** tercapai (dosen 93%, tendik 76%), tetapi 24% tendik belum bersertifikat karena kuota uji kompetensi terbatas.

Akar masalah keterlambatan pertanggungjawaban: dokumen bukti pengeluaran masih fisik dan harus diverifikasi berjenjang. Survei kepuasan dosen dan tendik terhadap transparansi tata kelola 3,40/4 (Lampiran C.5-5).`,

  68: (c) => `Evaluasi hasil audit mutu:

- **Tindak lanjut audit:** tercapai (100%).
- **Aset:** belum tercapai (96%; target 100%). Aset yang belum berlabel umumnya berasal dari hibah peralatan penelitian.
- **Perawatan laboratorium:** belum tercapai (4 dari 6 laboratorium).

Akar masalah: aset hibah tidak melalui jalur pengadaan sehingga tidak tercatat otomatis, dan dua laboratorium baru belum memiliki laboran tetap. Analisis dibahas dalam RTM (Lampiran C.5-6).`,

  69: (c) => `Tindak lanjut evaluasi tata kelola:

- **Pertanggungjawaban keuangan:** penerapan aplikasi pertanggungjawaban keuangan digital (e-SPJ) dengan unggah bukti daring. Waktu pelaporan turun menjadi rata-rata 9 hari.
- **SDM profesional:** kerja sama dengan LSP untuk menambah kuota uji kompetensi tendik. Pada TS+1, tendik bersertifikat naik menjadi 88%.

Hasil dipantau dalam *action plan* dan dilaporkan pada RTM berikutnya (Lampiran C.5-7).`,

  70: (c) => `Tindak lanjut evaluasi audit mutu:

- **Aset:** seluruh aset, termasuk aset hibah, dilabel dengan QR code yang terhubung ke SIMAK-BMN. Pada TS+1, 100% aset tercatat dan berlabel.
- **Perawatan laboratorium:** laboran tetap ditugaskan dan jadwal perawatan preventif disusun untuk dua laboratorium baru, sehingga 6 dari 6 laboratorium memiliki rencana perawatan.

Bukti: daftar aset terbaru dan jadwal perawatan (Lampiran C.5-8).`,

  71: (c) => `Standar akuntabilitas ditingkatkan:

${naik('Pertanggungjawaban keuangan', 'Kepala Bagian Tata Usaha memastikan laporan pertanggungjawaban kegiatan diserahkan melalui e-SPJ paling lama 7 hari setelah kegiatan selesai.', 'rata-rata waktu penyerahan laporan pertanggungjawaban kegiatan', '≤ 7 hari', '≤ 14 hari')}

${naik('SDM profesional', 'Dekan mengikutsertakan dosen dalam sertifikasi pendidik dan tendik dalam uji kompetensi.', 'persentase dosen bersertifikat pendidik dan tendik bersertifikat kompetensi', 'dosen ≥ 95%, tendik ≥ 90%', 'dosen ≥ 90%, tendik ≥ 70%')}

${naik('Manajemen risiko', 'Dekan menerapkan manajemen risiko berbasis ISO 31000 dan mempublikasikan ringkasan laporan keuangan fakultas kepada publik.', 'persentase unit yang memiliki register risiko yang dimutakhirkan', '100%')}

Bukti: SK revisi standar dan Renop (Lampiran C.5-9).`,

  72: (c) => `Audit mutu ditingkatkan dengan audit berbasis risiko dan audit keamanan informasi (ISO 27001) untuk sistem informasi akademik. Standarnya dinaikkan:

${naik('Tindak lanjut audit', 'Dekan memastikan rencana perbaikan hasil audit diselesaikan sesuai tenggat dan diverifikasi pada audit berikutnya.', 'persentase rencana perbaikan audit yang selesai sesuai tenggat', '≥ 90%', '100% rencana perbaikan terdokumentasi')}

${naik('Aset', 'Kepala Subbagian Umum dan Perlengkapan mencatat dan melabeli setiap aset baru, termasuk aset hibah, dalam SIMAK-BMN.', 'waktu pencatatan aset sejak diterima', '≤ 7 hari, 100% aset berlabel', '100% aset berlabel')}

${naik('Perawatan laboratorium', 'Kepala Laboratorium menjalankan rencana perawatan berkala dan memastikan seluruh laboran memiliki sertifikasi K3 laboratorium.', 'persentase laboran bersertifikat K3 laboratorium', '100%', '100% laboratorium memiliki rencana perawatan')}

Bukti: SK revisi standar audit (Lampiran C.5-10).`,

  // ===== C.6 Diferensiasi Misi =====
  // Alur: 73 → 74 → 75 → 76 → 77 (topik khas, kerja sama internasional, mahasiswa asing)
  73: (c) => `VMTS ${c.ps} ditetapkan melalui SK Rektor No. 45/2021 dan selaras dengan visi UB dan FILKOM UB. Visi keilmuan: *"Menjadi pusat pengembangan kecerdasan buatan yang terpercaya dan berdampak bagi kesehatan dan layanan publik pada 2035"*, sesuai kualifikasi KKNI level ${c.kkni}. Rencana pengembangan strategis (Renstra 2021–2025) menetapkan ciri khas keilmuan "AI untuk kesehatan dan layanan publik".

${std('Ciri khas tridarma', 'Ketua PS mengarahkan penelitian dan PkM DTPR pada topik ciri khas keilmuan paling lambat akhir Renstra 2025.', 'persentase penelitian dan PkM pada topik khas', '≥ 40%')}

${std('Kerja sama internasional', 'Dekan menjalin kerja sama tridarma dengan perguruan tinggi atau lembaga luar negeri.', 'jumlah kerja sama internasional aktif', '≥ 3')}

${std('Rekognisi internasional', 'Ketua PS melaksanakan promosi internasional agar PS menerima mahasiswa asing paling lambat akhir Renstra 2025.', 'jumlah mahasiswa asing aktif', '≥ 5 orang')}

Rekognisi oleh mitra DUDIKA di tingkat lokal, nasional, dan internasional juga menjadi sasaran Renstra (Lampiran C.6-1).`,

  74: (c) => `Ciri khas keilmuan dilaksanakan dalam tridarma:

- **Ciri khas tridarma:** 4 MK khas AI untuk kesehatan, 52% penelitian dan 41% PkM pada topik khas (target ≥ 40%), serta Laboratorium AI Kesehatan yang bermitra dengan 3 rumah sakit
- **Kerja sama internasional:** 3 kerja sama aktif (target ≥ 3), antara lain riset bersama universitas mitra di Malaysia
- **Rekognisi internasional:** baru 1 mahasiswa asing aktif (target ≥ 5)

Rekognisi yang diperoleh:

- **Lokal:** sistem triase AI digunakan di rumah sakit mitra di Malang
- **Nasional:** penghargaan inovasi kesehatan digital
- **Internasional:** publikasi bersama dan pertukaran peneliti dengan universitas mitra

VMTS disosialisasikan melalui situs web, PKKMB, dan rapat kerja tahunan (Lampiran C.6-2).`,

  75: (c) => `Evaluasi ketercapaian Renstra dilakukan setiap tahun: 21 dari 24 indikator tercapai. Untuk standar diferensiasi misi:

- **Ciri khas tridarma:** terlampaui (penelitian 52%, PkM 41%; target ≥ 40%).
- **Kerja sama internasional:** tercapai (3; target ≥ 3).
- **Rekognisi internasional:** belum tercapai (1 mahasiswa asing; target ≥ 5).

Survei pemahaman VMTS (n = ${Math.round(520 * c.skala) + 50} dosen, tendik, mahasiswa) menunjukkan 91% responden memahami visi keilmuan PS. Akar masalah mahasiswa asing: belum ada kelas berbahasa Inggris dan promosi internasional (Lampiran C.6-3).`,

  76: (c) => `Tindak lanjut evaluasi diferensiasi misi:

- **Rekognisi internasional:** UPPS membuka kelas internasional berbahasa Inggris, bergabung dengan konsorsium mobilitas mahasiswa ASEAN, dan membuat situs PS berbahasa Inggris. Pada TS+1, PS menerima 4 mahasiswa asing.
- **Kerja sama internasional:** kerja sama yang ada dimanfaatkan sebagai jalur rekrutmen mahasiswa asing dan *joint supervision*.

Rencana pengembangan direvisi dengan program promosi internasional (Lampiran C.6-4).`,

  77: (c) => `Berdasarkan capaian Renstra 2021–2025, UPPS menyusun Renstra 2026–2030 dengan target yang lebih tinggi:

${naik('Ciri khas tridarma', 'Ketua PS mengarahkan penelitian dan PkM DTPR pada topik ciri khas keilmuan, didukung pusat unggulan AI Kesehatan.', 'persentase penelitian dan PkM pada topik khas', '≥ 50%', '≥ 40%')}

${naik('Kerja sama internasional', 'Dekan memperluas kerja sama tridarma dengan perguruan tinggi luar negeri, termasuk program *joint degree*.', 'jumlah kerja sama internasional aktif', '≥ 5', '≥ 3')}

${naik('Rekognisi internasional', 'Ketua PS meningkatkan penerimaan mahasiswa asing melalui kelas internasional dan konsorsium ASEAN.', 'jumlah mahasiswa asing aktif', '≥ 10 orang', '≥ 5 orang')}

${naik('Akreditasi internasional', 'Ketua PS menyiapkan dan mengajukan akreditasi internasional paling lambat 2028.', 'status akreditasi internasional', 'terakreditasi')}

Visi keilmuan dipertajam melalui *visioning workshop* dengan pemangku kepentingan (Lampiran C.6-5).`,
};

// Suplemen Sarjana (D1–D4) dan Magister (D1–D3).
const SUPLEMEN = {
  sarjana: [
    (c) => `Kurikulum ${c.ps} memuat 18 MK inti (58 SKS) yang mencakup algoritma dan kompleksitas, teori komputasi, konsep bahasa pemrograman, arsitektur komputer, sistem operasi, jaringan, manajemen informasi, dan komputasi paralel-terdistribusi. Setiap MK inti dipetakan ke *knowledge area* ACM/IEEE CS2023 dan memiliki RPS lengkap. Daftar MK, SKS, semester, dan tautan RPS disajikan pada Lampiran D-1.`,
    (c) => `MK domain spesifik dan lingkungan pengembangan perangkat lunak terdiri atas 9 MK (27 SKS), antara lain Pemrograman Web, Pengembangan Aplikasi Bergerak, Sistem Terdistribusi, dan Rekayasa Perangkat Lunak Lanjut. Pemetaan kurikulum terhadap ACM/IEEE CS2023 dan CC2020 disajikan dalam matriks pemetaan, dengan cakupan 92% *knowledge unit* inti (Lampiran D-2).`,
    (c) => `Struktur kurikulum memuat 6 MK matematika (18 SKS): Kalkulus, Matematika Diskrit, Aljabar Linier, Probabilitas dan Statistika, Metode Numerik, dan Logika Matematika. MK tersebut menjadi prasyarat MK inti, misalnya Aljabar Linier untuk Pembelajaran Mesin. Seluruh MK dilengkapi RPS (Lampiran D-3).`,
    (c) => `Proyek Utama (6 SKS, semester 7) dikerjakan berkelompok 3–4 mahasiswa untuk menyelesaikan masalah nyata dari mitra (tahapan analisis, desain, implementasi, pengujian). Pada TS, 42 tim menghasilkan 42 perangkat lunak; 11 di antaranya digunakan oleh mitra. Proyek mengintegrasikan MK RPL, Basis Data, dan Pemrograman Web. Bukti: pedoman proyek utama dan laporan proyek (Lampiran D-4).`,
  ],
  magister: [
    (c) => `MK inti yang menunjukkan kekhasan ${c.ps} sesuai visi keilmuan "AI untuk kesehatan dan layanan publik": Pembelajaran Mesin Lanjut, *Trustworthy AI*, Visi Komputer, dan Pemrosesan Bahasa Alami (12 SKS). Setiap MK memiliki RPS lengkap yang memuat CPMK, metode pembelajaran berbasis riset, dan rubrik penilaian (Lampiran D-1).`,
    (c) => `MK domain/sektor spesifik: Informatika Kesehatan, Analitik Layanan Publik, dan Sistem Cerdas untuk *Smart City* (9 SKS). MK ini menunjukkan fokus area penerapan keilmuan pada sektor kesehatan dan pemerintahan, didukung kerja sama dengan rumah sakit dan pemda. RPS lengkap (Lampiran D-2).`,
    (c) => `MK terkait metode analisis: Metodologi Penelitian, Statistika dan Probabilitas Lanjut, serta Analitik Data dan *Machine Learning Ops* (9 SKS). MK ini mendukung penyusunan tesis yang terukur dan dapat direplikasi. RPS lengkap (Lampiran D-3).`,
  ],
};

export function getNarasi(jenjang, butir) {
  const c = jenjang.konteks;
  if (butir.kriteria === 'suplemen') {
    const f = SUPLEMEN[jenjang.id]?.[butir.suplemenIndex];
    return f ? f(c) : null;
  }
  const f = N[butir.no];
  return f ? f(c) : null;
}
