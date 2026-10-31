// Contoh narasi LED per butir. Semua nama institusi, nomor dokumen, dan angka bersifat ILUSTRATIF
// (Fakultas Ilmu Komputer Universitas Nusantara / FIK-UN) dan harus diganti dengan data PS sendiri.
// Narasi ditulis sebagai contoh yang mengarah ke skor 4: lengkap, terukur, berbukti, dan berkesinambungan PPEPP.

const N = {
  // ===== Kondisi Eksternal & Profil =====
  1: (c) => `**Lingkungan makro.** Pertumbuhan ekonomi digital nasional (proyeksi Rp 2.000 triliun pada 2030), kebijakan Merdeka Belajar, serta Peta Jalan Indonesia Digital 2021–2024 meningkatkan kebutuhan talenta TIK. Laporan Kemnaker menunjukkan kekurangan ±600 ribu talenta digital per tahun. Perkembangan AI generatif dan keamanan siber menuntut kurikulum yang adaptif.

**Lingkungan mikro.** Di provinsi kami terdapat 14 PS sejenis (5 terakreditasi Unggul) sebagai pesaing langsung. Data BPS mencatat 412 SMA/SMK dengan ±38.000 lulusan per tahun; 31% berminat di bidang TIK (survei FIK-UN 2024). Kemitraan dengan 42 mitra DUDIKA dan pemerintah daerah menjadi sumber tempat magang, dana, dan pengguna lulusan ${c.ps}.

**Peluang dan ancaman.** Peluang: (1) program transformasi digital pemda, (2) skema MBKM dan hibah Kemdiktisaintek, (3) kebutuhan sertifikasi kompetensi. Ancaman: (1) kampus luar negeri yang membuka kelas daring, (2) bootcamp non-gelar, (3) persaingan perekrutan dosen bergelar doktor dengan industri. Analisis ini menjadi dasar Renstra FIK-UN 2025–2029 (bukti: Dokumen Analisis Lingkungan Strategis, SK Dekan No. 12/2025).`,

  2: (c) => `${c.ps} berdiri tahun ${c.jenjang === 'Sarjana' ? '2002' : c.jenjang === 'Magister' ? '2010' : '2017'} di bawah FIK-UN dengan visi keilmuan *"menjadi pusat pengembangan kecerdasan buatan yang berdampak bagi masyarakat pada 2035"*. Struktur organisasi mengacu pada Statuta UN (PP No. xx/2020) dan OTK FIK-UN, dengan Gugus Jaminan Mutu di tingkat fakultas dan Unit Penjaminan Mutu di tingkat PS.

Pada TS terdapat ${Math.round(620 * c.skala)} mahasiswa aktif, ${Math.round(28 * Math.max(c.skala, 0.5))} DTPR (${c.jenjang === 'Sarjana' ? '46%' : '100%'} bergelar doktor, 9 Lektor Kepala/Guru Besar), dan 18 tenaga kependidikan bersertifikat. Rasio dana operasional pendidikan mencapai Rp 21 juta/mahasiswa/tahun. SPMI telah berjalan lima siklus PPEPP dan memperoleh sertifikat ISO 21001:2018.

Kinerja unggulan: IPK rata-rata lulusan 3,52, masa tunggu kerja 3,1 bulan, 62 publikasi bereputasi dalam tiga tahun terakhir. Analisis SWOT: kekuatan utama pada SDM riset AI; kelemahan pada rasio laboratorium terhadap mahasiswa; strategi SO yang dipilih adalah perluasan kerja sama riset industri. Data pada bagian ini konsisten dengan LKPS dan kriteria C.1–C.6.`,

  // ===== C.1 Budaya Mutu =====
  3: (c) => `UPPS menetapkan sistem tata kelola melalui Statuta UN, Peraturan Rektor No. 5/2023 tentang OTK, dan Manual SPMI FIK-UN. Standar tata kelola dituangkan dalam 24 Standar Pendidikan Tinggi (SN-DIKTI ditambah 8 standar PT) beserta indikator terukur, misalnya: *"100% layanan administrasi akademik diselesaikan sesuai SLA"* dan *"serapan anggaran ≥ 95% per tahun"*.

Setiap area dilengkapi SOP yang disahkan Dekan: (1) **akademik** — 21 SOP (KRS, yudisium, cuti, RPL); (2) **keuangan** — 9 SOP (RKAT, pencairan, pertanggungjawaban); (3) **SDM** — 11 SOP (rekrutmen, BKD, studi lanjut, promosi jabatan); (4) **aspek lain** dalam siklus PPEPP — 7 SOP (audit mutu internal, RTM, survei kepuasan). Daftar dokumen beserta nomor SK dan tautan unduh disajikan pada Lampiran C.1-1.`,

  4: (c) => `Kebijakan SPMI ditetapkan dalam Kebijakan SPMI UN (SK Rektor No. 88/2022) dan dijabarkan dalam Manual serta Standar SPMI FIK-UN. Fungsi SPMI dijalankan oleh Gugus Jaminan Mutu (GJM) fakultas dan Unit Jaminan Mutu (UJM) di ${c.ps}, ditetapkan dengan SK Dekan No. 21/2024.

Indikator kompetensi pelaksana ditetapkan: seluruh anggota GJM/UJM wajib bersertifikat auditor mutu internal dan mengikuti penyegaran minimal sekali per dua tahun. Pada TS, 12 dari 12 personel (100%) telah bersertifikat AMI, dan 3 di antaranya bersertifikat Lead Auditor ISO 9001. Bukti: SK penetapan, sertifikat pelatihan, dan matriks kompetensi personel SPMI (Lampiran C.1-2).`,

  5: (c) => `Implementasi tata kelola dipantau melalui dasbor kinerja fakultas. Pada TS: (1) **akademik** — 98,7% layanan selesai sesuai SLA (target 95%); (2) **keuangan** — serapan anggaran 96,4% dan laporan keuangan memperoleh opini WTP dari KAP independen; (3) **SDM** — 100% dosen mengisi BKD tepat waktu dan 5 dosen naik jabatan fungsional; (4) **aspek lain** — RTM dilaksanakan dua kali per tahun.

Efektivitas ini didokumentasikan dalam Laporan Tahunan Dekan 2022–2024 dan Laporan Kinerja PS yang dipresentasikan dalam rapat senat fakultas. Seluruh bukti dapat ditelusuri melalui sistem arsip digital FIK-UN (Lampiran C.1-3).`,

  6: (c) => `SPMI berjalan penuh dalam siklus PPEPP: penetapan standar (Januari), pelaksanaan (sepanjang tahun), AMI (Agustus), RTM (September), dan perbaikan standar (Desember). Dalam tiga tahun terakhir dilaksanakan 3 siklus AMI dengan cakupan 100% unit di FIK-UN.

Auditor berasal dari 12 personel bersertifikat dengan rotasi lintas unit untuk menjaga independensi. Indikator efektivitas tercapai: 92% temuan AMI ditutup sebelum siklus berikutnya (target 85%). Bukti: jadwal AMI, laporan AMI, notulen RTM, dan daftar tindakan koreksi (Lampiran C.1-4).`,

  7: (c) => `Evaluasi ketercapaian standar tata kelola dilakukan **berkala**: monitoring triwulanan oleh Wakil Dekan, AMI tahunan, dan survei kepuasan setiap semester. Hasil TS: 22 dari 24 standar tercapai atau terlampaui. Dua yang belum tercapai: waktu proses legalisasi (rata-rata 4 hari, target 2 hari) dan serapan anggaran penelitian (88%, target 95%).

**Faktor pendukung:** digitalisasi layanan akademik. **Akar masalah** (analisis *fishbone*): legalisasi masih manual dan berlapis tanda tangan; serapan dana riset terhambat jadwal pencairan universitas. Survei kepuasan tata kelola (n = ${Math.round(540 * c.skala) + 60} dosen, tendik, mahasiswa): indeks 3,41 dari 4 (Lampiran C.1-5).`,

  8: (c) => `Evaluasi fungsi SPMI dilakukan melalui audit eksternal oleh Badan Penjaminan Mutu universitas dan surveilans ISO 21001 setiap tahun. Hasil TS: indeks kematangan SPMI 3,6 dari 4; seluruh standar memiliki indikator terukur; tetapi 8% temuan AMI berulang di dua siklus.

Akar masalah temuan berulang: tindakan koreksi belum disertai verifikasi efektivitas. Evaluasi kompetensi SDM SPMI menunjukkan 100% personel bersertifikat, namun hanya 58% yang pernah mengikuti pelatihan audit berbasis risiko. Survei pemahaman SPMI kepada dosen dan tendik menghasilkan skor 3,35/4 (Lampiran C.1-6).`,

  9: (c) => `Tindak lanjut hasil evaluasi tata kelola ditetapkan dalam RTM September TS dan dipantau melalui *action plan*:
1. **Akademik:** legalisasi digital dengan tanda tangan elektronik BSrE diterapkan sejak Januari TS+1; waktu proses turun menjadi 1 hari.
2. **Keuangan:** pencairan dana penelitian diubah menjadi dua termin dengan uang muka 70%; serapan naik ke 97%.
3. **SDM:** SOP studi lanjut direvisi untuk mempercepat izin belajar.
4. **Aspek lain:** revisi tiga SOP yang tidak lagi sesuai.

Semua tindakan dicatat dalam formulir PTK dan diverifikasi kembali pada AMI berikutnya (Lampiran C.1-7).`,

  10: (c) => `Untuk temuan berulang, UPPS menetapkan mekanisme **verifikasi efektivitas tindakan koreksi** 3 bulan setelah penutupan temuan. Hasilnya, temuan berulang turun dari 8% menjadi 2% pada siklus berikutnya.

Untuk SDM SPMI, 7 auditor diikutsertakan pelatihan *risk-based auditing* (Mei TS+1) sehingga 100% auditor kompeten audit berbasis risiko. Sosialisasi SPMI kepada mahasiswa juga dilakukan dalam PKKMB dan kuliah umum. Bukti: notulen RTM, sertifikat pelatihan, dan laporan verifikasi PTK (Lampiran C.1-8).`,

  11: (c) => `Berdasarkan siklus PPEPP, UPPS **menaikkan standar** tata kelola: SLA layanan akademik dipersingkat dari 3 hari menjadi 1 hari; target serapan anggaran dinaikkan dari 95% menjadi 97%; dan ditambahkan standar baru tentang tata kelola data (*data governance*) serta keamanan informasi berbasis ISO 27001.

Peningkatan ditetapkan melalui SK Dekan No. 3/TS+1 tentang Revisi Standar FIK-UN dan tercantum dalam Renop 2025–2026. Dampaknya terlihat dari kenaikan indeks kepuasan tata kelola dari 3,41 menjadi 3,58 (Lampiran C.1-9).`,

  12: (c) => `Fungsi SPMI ditingkatkan dengan (1) mengadopsi sistem informasi audit mutu (e-AMI) yang terintegrasi dengan dasbor indikator, (2) menambah standar kompetensi auditor (wajib *risk-based auditing* dan pelatihan ISO 21001), dan (3) memperluas benchmarking dengan dua PS terakreditasi internasional (ABET/ASIIN).

Hasilnya, siklus AMI menjadi 30% lebih cepat, dan ${c.ps} menyiapkan akreditasi internasional pada TS+2. Peningkatan ini menunjukkan budaya mutu yang tidak berhenti pada pemenuhan, tetapi terus melampaui standar (Lampiran C.1-10).`,

  // ===== C.2 Relevansi Pendidikan =====
  13: (c) => `UPPS menetapkan standar relevansi pendidikan pada Standar FIK-UN (SK Dekan No. 4/2023), antara lain:
- **Sarana prasarana:** rasio komputer laboratorium : mahasiswa ≥ 1 : 4; bandwidth ≥ 1 Gbps; seluruh ruang aksesibel bagi difabel.
- **DTPR:** rasio DTPR : mahasiswa ≤ 1 : ${c.jenjang === 'Sarjana' ? '25' : c.jenjang === 'Magister' ? '10' : '5'}; minimal ${c.jenjang === 'Sarjana' ? '50%' : '100%'} DTPR bergelar doktor.
- **Pembiayaan:** dana operasional pendidikan ≥ Rp 20 juta/mahasiswa/tahun.
- **Penerimaan mahasiswa:** kuota afirmasi 10% (KIP-K, daerah 3T), jalur RPL, layanan bagi calon mahasiswa berkebutuhan khusus, dan target keragaman asal provinsi ≥ 15.

Bukti: dokumen standar, Peraturan Rektor tentang Penerimaan Mahasiswa Baru, dan Pedoman Layanan Disabilitas (Lampiran C.2-1).`,

  14: (c) => `Kurikulum OBE ${c.ps} ditetapkan dengan SK Rektor No. 120/2023. CPL disusun mengacu pada **KKNI level ${c.kkni}**, SN-DIKTI, ACM/IEEE CS2023, serta kesepakatan asosiasi APTIKOM. CPL mencakup *soft competence* (etika, komunikasi, kepemimpinan) dan *hard competence* (perancangan algoritma, pengembangan sistem cerdas${c.jenjang !== 'Sarjana' ? ', riset mandiri berdampak' : ''}).

Penyusunan melibatkan pemangku kepentingan melalui *tracer study*, FGD dengan 12 mitra DUDIKA, asosiasi profesi, alumni, dan mahasiswa. Kebijakan menetapkan peninjauan kurikulum minimal setiap 4 tahun. Bukti: dokumen kurikulum, notulen FGD, dan matriks CPL–MK (Lampiran C.2-2).`,

  15: (c) => `Kebijakan Akademik FIK-UN (SK Dekan No. 9/2023) mengatur fleksibilitas pembelajaran: (1) maksimal 30% pembelajaran daring/hibrida melalui LMS; (2) metode *case-based learning* (CBL) dan *project-based learning* (PBL) minimal 50% dari bobot penilaian MK; (3) *micro-credential* dan sertifikasi industri yang dapat direkognisi hingga 20 SKS; (4) RPL tipe A dan B${c.jenjang === 'Sarjana' ? '; (5) hak belajar 3 semester di luar PS (MBKM)' : ''}.

Standar suasana akademik mewajibkan minimal 2 kuliah tamu per semester. Standar penilaian menetapkan rubrik terukur dan pemenuhan beban belajar ${c.jenjang === 'Sarjana' ? '144' : c.jenjang === 'Magister' ? '36' : '42'} SKS (Lampiran C.2-3).`,

  16: (c) => `Standar prestasi dan kompetensi lulusan ${c.ps} meliputi: IPK rata-rata ≥ 3,25; masa studi ≤ ${c.masaStudi}; masa tunggu kerja ≤ 6 bulan; ≥ 80% lulusan bekerja di bidang yang relevan; ≥ 10% lulusan bekerja di perusahaan multinasional/luar negeri; dan kepuasan pengguna lulusan ≥ 3,5 dari 4.

Indikator prestasi mahasiswa mencakup juara kompetisi tingkat nasional/internasional${c.jenjang !== 'Sarjana' ? ' dan publikasi mahasiswa di jurnal bereputasi' : ''}. Rekognisi diukur melalui *tracer study* dan survei pengguna lulusan yang dilakukan setiap tahun (Lampiran C.2-4).`,

  17: (c) => `Pada TS, standar input pendidikan dilaksanakan sebagai berikut:
- **Sarana:** 6 laboratorium (240 unit komputer, rasio 1 : 3,8), GPU server 8×A100 untuk riset AI, dan seluruh gedung dilengkapi jalur kursi roda.
- **DTPR:** ${Math.round(28 * Math.max(c.skala, 0.5))} orang, rasio terhadap mahasiswa memenuhi standar.
- **Pembiayaan:** dana operasional pendidikan Rp 21,4 juta/mahasiswa/tahun.
- **Penerimaan:** ${Math.round(160 * c.skala)} mahasiswa baru dari ${c.jenjang === 'Sarjana' ? '19' : '11'} provinsi; 11% jalur afirmasi; 3 mahasiswa berkebutuhan khusus didampingi Unit Layanan Disabilitas.

Data rinci tersaji pada Tabel LKPS terkait (Lampiran C.2-5).`,

  18: (c) => `Kurikulum OBE diimplementasikan secara penuh: 100% MK memiliki RPS berbasis CPMK, asesmen berbasis rubrik, dan pengukuran ketercapaian CPL per mahasiswa melalui sistem OBE terintegrasi. Pada TS, rata-rata ketercapaian CPL mahasiswa 82% (target 75%).

Pemangku kepentingan terlibat secara nyata: 9 MK diajar bersama praktisi (*co-teaching*), dan 4 mitra DUDIKA menjadi penguji proyek akhir. Kompetensi *soft skill* diukur melalui portofolio dan penilaian sejawat. Bukti: RPS, laporan ketercapaian CPL, dan surat kerja sama mitra (Lampiran C.2-6).`,

  19: (c) => `Fleksibilitas pembelajaran dilaksanakan melalui: (1) 35% MK menyediakan kelas hibrida di LMS; (2) 62% MK menggunakan PBL/CBL; (3) ${Math.round(85 * c.skala)} mahasiswa memperoleh *micro-credential* (AWS, Cisco, Google) yang direkognisi; (4) ${Math.round(12 * c.skala) + 2} mahasiswa diterima melalui jalur RPL${c.jenjang === 'Sarjana' ? '; (5) 38% mahasiswa mengikuti MBKM' : ''}.

Suasana akademik dibangun melalui 14 kuliah tamu, seminar riset bulanan, dan 4 kelompok studi. Penilaian menggunakan rubrik yang diumumkan di awal semester, dengan tingkat kepuasan mahasiswa terhadap keadilan penilaian 3,52/4 (Lampiran C.2-7).`,

  20: (c) => `Capaian prestasi mahasiswa dan lulusan pada tiga tahun terakhir:
- Prestasi: ${Math.round(24 * Math.max(c.skala, 0.3))} prestasi nasional dan ${Math.round(7 * Math.max(c.skala, 0.4))} prestasi internasional${c.jenjang !== 'Sarjana' ? `; ${Math.round(40 * c.skala) + 4} publikasi mahasiswa di jurnal/konferensi bereputasi` : ''}.
- Lulusan: IPK rata-rata 3,52; masa studi rata-rata ${c.jenjang === 'Sarjana' ? '4,1 tahun' : c.jenjang === 'Magister' ? '2,1 tahun' : '3,6 tahun'}; masa tunggu 3,1 bulan.
- Sebaran kerja: 61% lokal/regional, 31% nasional, 8% internasional (Singapura, Jepang, Belanda).
- Rekognisi: kepuasan pengguna lulusan 3,61/4 dari ${Math.round(120 * c.skala) + 20} responden.

Data bersumber dari *tracer study* (tingkat respons 68%) dan Tabel LKPS (Lampiran C.2-8).`,

  21: (c) => `Evaluasi ketercapaian standar input pendidikan dilakukan setiap tahun melalui AMI dan monitoring Wakil Dekan. Hasil TS: rasio komputer, pembiayaan, dan rasio DTPR tercapai; target keragaman asal provinsi terlampaui (19 dari target 15). Belum tercapai: proporsi DTPR bergelar doktor (${c.jenjang === 'Sarjana' ? '46% dari target 50%' : '95% dari target 100%'}).

Akar masalah: dua dosen terlambat menyelesaikan studi S3 karena kendala pendanaan beasiswa. Survei kepuasan mahasiswa terhadap sarana prasarana menunjukkan 3,38/4, dengan catatan utama pada kapasitas Wi-Fi di jam sibuk (Lampiran C.2-9).`,

  22: (c) => `Evaluasi kurikulum dilakukan melalui (1) analisis ketercapaian CPL per angkatan, (2) survei relevansi kurikulum kepada lulusan dan pengguna, dan (3) *review* oleh dewan penasihat industri. Hasil: 9 dari 10 CPL tercapai ≥ 75%; CPL "kemampuan komunikasi ilmiah berbahasa Inggris" baru tercapai 68%.

Pengguna lulusan menilai kesesuaian kompetensi 3,55/4, tetapi menyarankan penguatan *cloud computing* dan MLOps. Akar masalah CPL komunikasi: MK pendukung hanya 2 SKS dan tidak terintegrasi dengan tugas akhir (Lampiran C.2-10).`,

  23: (c) => `Evaluasi fleksibilitas pembelajaran mencakup efektivitas kelas hibrida, rekognisi *micro-credential*, RPL${c.jenjang === 'Sarjana' ? ', MBKM' : ''}, dan penilaian. Hasil: kepuasan layanan pembelajaran 3,47/4 (n = ${Math.round(480 * c.skala) + 30}); 100% beban belajar terpenuhi; rasio kelulusan MK hibrida setara dengan kelas luring.

Kelemahan: konversi nilai *micro-credential* memakan waktu rata-rata 5 minggu karena belum ada pedoman pemetaan baku. Moderasi soal dan rubrik dilakukan di 100% MK wajib, tetapi baru 70% di MK pilihan (Lampiran C.2-11).`,

  24: (c) => `Evaluasi ketercapaian prestasi dan kompetensi lulusan menunjukkan: masa tunggu (3,1 bulan) dan IPK terlampaui; proporsi lulusan bekerja internasional 8% (target 10%) belum tercapai.

Hasil *tracer study* dan survei pengguna lulusan dianalisis per aspek (etika, keahlian bidang, bahasa asing, TI, komunikasi, kerja sama, pengembangan diri). Aspek bahasa asing mendapat skor terendah (3,21). Akar masalah: belum ada program mobilitas internasional terstruktur dan sertifikasi bahasa belum menjadi syarat lulus (Lampiran C.2-12).`,

  25: (c) => `Tindak lanjut evaluasi input pendidikan:
1. Percepatan studi S3 dua dosen melalui skema beasiswa internal dan pembebasan tugas mengajar; satu dosen lulus pada TS+1.
2. Peningkatan kapasitas jaringan nirkabel menjadi Wi-Fi 6 di seluruh ruang kuliah.
3. Penambahan kuota afirmasi melalui kerja sama dengan 3 pemda untuk beasiswa daerah 3T.

Seluruh tindakan ditetapkan dalam RTM, diberi PIC dan tenggat, serta dipantau dalam *action plan* (Lampiran C.2-13).`,

  26: (c) => `Tindak lanjut evaluasi kurikulum: (1) integrasi penulisan ilmiah berbahasa Inggris dalam ${c.tugasAkhir} dan seminar; (2) penambahan topik *cloud computing* dan MLOps ke dalam MK pilihan sesuai masukan pengguna; (3) revisi minor RPS pada 8 MK.

Perubahan dibahas dalam lokakarya kurikulum bersama mitra DUDIKA dan disahkan melalui SK Dekan. Pada evaluasi berikutnya, ketercapaian CPL komunikasi naik menjadi 77% (Lampiran C.2-14).`,

  27: (c) => `Tindak lanjut fleksibilitas pembelajaran: UPPS menyusun **Pedoman Rekognisi Micro-credential** dengan tabel pemetaan sertifikasi–MK sehingga waktu konversi turun dari 5 minggu menjadi 1 minggu. Moderasi soal diperluas ke seluruh MK pilihan.

Untuk RPL, dibentuk tim asesor bersertifikat (5 orang) agar proses asesmen portofolio lebih cepat. Bukti: SK pedoman, daftar asesor RPL, dan laporan konversi (Lampiran C.2-15).`,

  28: (c) => `Untuk meningkatkan lulusan yang bekerja di tingkat internasional dan kemampuan bahasa asing, UPPS: (1) menjadikan sertifikasi bahasa Inggris (TOEFL ITP ≥ ${c.jenjang === 'Sarjana' ? '475' : '500'}) sebagai syarat yudisium; (2) membuka program magang internasional dengan 3 mitra di Malaysia dan Jepang; (3) membentuk *career center* PS yang menyalurkan lowongan global.

Pada TS+1, 14 mahasiswa mengikuti magang internasional dan skor aspek bahasa asing pada survei pengguna naik menjadi 3,39 (Lampiran C.2-16).`,

  29: (c) => `Berdasarkan ketercapaian standar input, UPPS menaikkan standar: target DTPR bergelar doktor dari ${c.jenjang === 'Sarjana' ? '50% menjadi 60%' : '100% dengan ≥ 40% Lektor Kepala'}; dana operasional pendidikan dari Rp 20 juta menjadi Rp 23 juta/mahasiswa/tahun; dan menambah standar baru tentang ketersediaan fasilitas komputasi awan untuk pembelajaran.

Peningkatan ditetapkan dalam revisi standar (SK Dekan No. 3/TS+1) dan Renop, sekaligus menjadi indikator kinerja utama fakultas (Lampiran C.2-17).`,

  30: (c) => `Kurikulum ${c.ps} ditingkatkan melalui peninjauan menyeluruh menjadi Kurikulum 2025 yang mengintegrasikan AI generatif, keamanan siber, dan keberlanjutan digital. Standar CPL ditingkatkan dengan target ketercapaian minimal 80% untuk setiap CPL (sebelumnya 75%).

Keterlibatan pemangku kepentingan dilembagakan melalui *Industrial Advisory Board* yang rapat dua kali setahun. Kurikulum juga dipetakan ke kerangka akreditasi internasional sebagai persiapan akreditasi IABEE (Lampiran C.2-18).`,

  31: (c) => `Fleksibilitas pembelajaran dioptimalkan dengan menaikkan batas rekognisi *micro-credential* menjadi 24 SKS, membuka kelas internasional berbahasa Inggris, dan menerapkan *learning analytics* di LMS untuk mendeteksi mahasiswa berisiko gagal sejak minggu ke-6.

Standar baru ditetapkan: minimal 20% mahasiswa memperoleh sertifikasi industri sebelum lulus. Hasil awal TS+1: 27% mahasiswa telah bersertifikat (Lampiran C.2-19).`,

  32: (c) => `Standar prestasi dan kompetensi lulusan ditingkatkan: target masa tunggu kerja diturunkan menjadi ≤ 4 bulan, target kepuasan pengguna dinaikkan menjadi ≥ 3,6, dan ditambah target ≥ 5% lulusan berwirausaha teknologi.

UPPS juga memperluas jejaring alumni global sebagai mentor. Peningkatan ini dituangkan dalam revisi standar dan dipantau melalui dasbor *tracer study* daring yang diperbarui setiap semester (Lampiran C.2-20).`,

  // ===== C.3 Relevansi Penelitian =====
  33: (c) => `Standar penelitian ${c.ps} (bagian dari Standar Penelitian UN) menetapkan: (1) sarana — akses laboratorium riset dan GPU server 24 jam; (2) DTPR — setiap DTPR memimpin minimal 1 penelitian per tahun; (3) pembiayaan — dana penelitian internal ≥ Rp 15 juta/DTPR/tahun; (4) **peta jalan penelitian** PS 2021–2030 dengan tiga topik payung: *trustworthy AI*, sistem cerdas untuk kesehatan, dan keamanan siber.

Peta jalan diturunkan dari Rencana Induk Penelitian UN dan visi keilmuan PS. Bukti: Renip, dokumen peta jalan, dan SK kelompok riset (Lampiran C.3-1).`,

  34: (c) => `Kebijakan penelitian mewajibkan setiap penelitian DTPR berada dalam payung peta jalan dan **melibatkan mahasiswa**: minimal 1 ${c.mhsRiset} per penelitian, dan ${c.tugasAkhir} diarahkan menjadi bagian dari penelitian dosen.

Topik ditetapkan berdasarkan visi misi UN, UPPS, visi keilmuan PS, dan kebutuhan masyarakat/DUDIKA hasil FGD dengan mitra rumah sakit, pemda, dan industri keamanan siber. Indikator: ≥ 70% penelitian DTPR melibatkan mahasiswa; ≥ 30% penelitian bermitra dengan DUDIKA (Lampiran C.3-2).`,

  35: (c) => `Standar luaran penelitian menetapkan target per tahun: ≥ 40% DTPR memperoleh hibah eksternal; ≥ 5 kerja sama penelitian aktif; publikasi ≥ ${c.jenjang === 'Sarjana' ? '1' : c.jenjang === 'Magister' ? '1,5' : '2'} artikel/DTPR/tahun dengan ≥ 30% di jurnal internasional bereputasi (Q1–Q2); ≥ 5 HKI; dan keberlanjutan penelitian berupa hilirisasi atau penelitian lanjutan multi-tahun.

Kebijakan insentif publikasi dan HKI ditetapkan dalam Peraturan Rektor No. 14/2023 (Lampiran C.3-3).`,

  36: (c) => `Pelaksanaan standar input penelitian pada TS: ${Math.round(28 * Math.max(c.skala, 0.5))} DTPR melaksanakan ${Math.round(41 * Math.max(c.skala, 0.5))} judul penelitian (rasio 1,46/DTPR); dana penelitian Rp ${Math.round(1850 * Math.max(c.skala, 0.5)).toLocaleString('id-ID')} juta (Rp 33 juta/DTPR), 58% dari sumber eksternal. Laboratorium riset dan GPU server digunakan rata-rata 78% kapasitas.

Seluruh penelitian dipetakan ke peta jalan: 46% *trustworthy AI*, 32% kesehatan cerdas, 22% keamanan siber. Bukti: Tabel LKPS penelitian DTPR dan laporan pemanfaatan laboratorium (Lampiran C.3-4).`,

  37: (c) => `Implementasi peta jalan penelitian berjalan sesuai milestone. Dari ${Math.round(41 * Math.max(c.skala, 0.5))} penelitian, 83% melibatkan ${c.mhsRiset} (${Math.round(96 * c.skala) + 6} mahasiswa terlibat) dan 37% bermitra dengan DUDIKA, misalnya sistem triase berbasis AI bersama RSUD Kota dan deteksi *fraud* bersama bank daerah.

Sebanyak ${c.jenjang === 'Sarjana' ? '41%' : '100%'} ${c.tugasAkhir} merupakan bagian dari penelitian DTPR. Bukti: Tabel LKPS penelitian yang melibatkan mahasiswa dan dokumen kerja sama (Lampiran C.3-5).`,

  38: (c) => `Luaran penelitian tiga tahun terakhir: ${Math.round(18 * Math.max(c.skala, 0.5))} hibah eksternal (BIMA, LPDP RIIM, industri); 9 kerja sama penelitian aktif (3 internasional, antara lain dengan Universiti Malaya); ${Math.round(62 * Math.max(c.skala, 0.5))} publikasi bereputasi (24 di Q1–Q2), dan 14 HKI (2 paten sederhana).

Keberlanjutan: 3 hasil penelitian dihilirkan menjadi produk yang digunakan mitra, dan 5 penelitian berlanjut ke skema multi-tahun. Data rinci di Tabel LKPS publikasi dan luaran penelitian (Lampiran C.3-6).`,

  39: (c) => `Evaluasi tahunan oleh LPPM dan UPPS menunjukkan standar dana penelitian dan rasio penelitian per DTPR terlampaui. Belum tercapai: utilisasi GPU server tidak merata (puncak 100% menjelang tenggat konferensi). Peta jalan dievaluasi capaian milestone-nya: 7 dari 8 milestone tercapai.

Akar masalah ketimpangan utilisasi: belum ada sistem penjadwalan dan antrean komputasi. Survei kepuasan dosen dan mahasiswa terhadap layanan penelitian 3,44/4 (Lampiran C.3-7).`,

  40: (c) => `Evaluasi implementasi peta jalan dan pelibatan mahasiswa: target ≥ 70% penelitian melibatkan mahasiswa tercapai (83%); keterlibatan mitra DUDIKA tercapai (37% dari target 30%).

Namun, kesesuaian topik ${c.tugasAkhir} dengan peta jalan masih ${c.jenjang === 'Sarjana' ? '41%' : '88%'}. Akar masalah: sebagian mahasiswa memilih topik di luar kelompok riset karena informasi topik dosen belum tersedia terpusat (Lampiran C.3-8).`,

  41: (c) => `Evaluasi luaran: target publikasi per DTPR terlampaui (1,6 artikel/DTPR/tahun), HKI tercapai, tetapi proporsi publikasi Q1–Q2 baru 26% (target 30%) dan hibah internasional baru 1 judul.

Analisis akar masalah: DTPR muda belum berpengalaman menulis untuk jurnal Q1, dan kolaborasi internasional masih bergantung pada beberapa dosen senior. Hasil evaluasi dibahas dalam RTM dan rapat kelompok riset (Lampiran C.3-9).`,

  42: (c) => `Tindak lanjut input penelitian: UPPS menerapkan sistem antrean komputasi (SLURM) dengan kuota per kelompok riset dan menambah 2 node GPU melalui hibah peralatan. Utilisasi menjadi lebih merata dan waktu tunggu turun 60%.

Milestone peta jalan yang belum tercapai dijadwal ulang dengan pembiayaan tambahan dari skema penelitian unggulan fakultas (Lampiran C.3-10).`,

  43: (c) => `Untuk meningkatkan kesesuaian topik ${c.tugasAkhir} dengan peta jalan, UPPS meluncurkan portal **Bursa Topik Riset** yang memuat topik dari setiap kelompok riset, serta mewajibkan pembimbing berasal dari kelompok riset terkait. Kegiatan *research day* tahunan juga diadakan untuk mempertemukan mahasiswa, dosen, dan mitra.

Pada TS+1, kesesuaian topik naik menjadi ${c.jenjang === 'Sarjana' ? '63%' : '96%'} (Lampiran C.3-11).`,

  44: (c) => `Tindak lanjut luaran penelitian: (1) klinik penulisan artikel Q1 dengan mentor *visiting professor*; (2) skema *matching fund* untuk penelitian yang melibatkan mitra internasional; (3) insentif tambahan untuk publikasi Q1.

Hasilnya pada TS+1, proporsi publikasi Q1–Q2 naik menjadi 33% dan diperoleh 2 hibah kolaborasi internasional (Lampiran C.3-12).`,

  45: (c) => `Standar input penelitian ditingkatkan: target dana penelitian dinaikkan menjadi Rp 40 juta/DTPR/tahun, ketersediaan komputasi awan riset ditambahkan sebagai standar baru, dan peta jalan diperbarui (2025–2035) dengan topik AI untuk keberlanjutan.

Peningkatan disahkan melalui revisi standar penelitian dan Renip fakultas (Lampiran C.3-13).`,

  46: (c) => `Implementasi peta jalan dan pelibatan mahasiswa dioptimalkan dengan menetapkan target baru: ≥ 90% penelitian melibatkan mahasiswa, dan ≥ ${c.jenjang === 'Sarjana' ? '60%' : '100%'} ${c.tugasAkhir} berada dalam payung peta jalan. Dibentuk pula *joint research lab* bersama dua mitra industri.

Dampak: jumlah mahasiswa yang menjadi penulis bersama publikasi bereputasi meningkat 45% (Lampiran C.3-14).`,

  47: (c) => `Standar luaran penelitian dinaikkan: publikasi Q1–Q2 ≥ 40%, minimal 2 hibah internasional per tahun, dan minimal 1 paten granted per dua tahun. Skema hilirisasi diperkuat melalui kerja sama dengan pusat inkubasi bisnis UN.

Keberlanjutan penelitian dijamin dengan model kelompok riset yang memiliki rencana pendanaan 5 tahun (Lampiran C.3-15).`,

  // ===== C.4 Relevansi PkM =====
  48: (c) => `Standar PkM FIK-UN menetapkan: (1) sarana — Pusat Layanan TIK Masyarakat dan laboratorium yang dapat digunakan untuk pelatihan; (2) DTPR — setiap DTPR melaksanakan minimal 1 PkM per tahun; (3) pembiayaan — dana PkM ≥ Rp 7,5 juta/DTPR/tahun; (4) **peta jalan PkM** 2021–2030 berbasis layanan kepakaran: literasi digital UMKM, transformasi digital desa, dan keamanan siber sekolah.

Bukti: Renstra PkM, dokumen peta jalan, dan SK pusat layanan (Lampiran C.4-1).`,

  49: (c) => `Kebijakan PkM mewajibkan setiap kegiatan sesuai peta jalan dan melibatkan minimal 2 mahasiswa. Topik ditetapkan berdasarkan visi misi UN, UPPS, keilmuan PS, serta kebutuhan masyarakat dan DUDIKA hasil *need assessment* bersama Dinas Kominfo dan Dinas Koperasi-UMKM.

Indikator: ≥ 80% PkM melibatkan mahasiswa dan ≥ 50% PkM merupakan penerapan hasil penelitian (Lampiran C.4-2).`,

  50: (c) => `Standar luaran PkM menetapkan target per tahun: ≥ 30% DTPR memperoleh hibah PkM eksternal; ≥ 5 kerja sama PkM; diseminasi melalui jurnal pengabdian terakreditasi SINTA atau media massa; ≥ 3 HKI (hak cipta modul/aplikasi); dan keberlanjutan berupa mitra binaan minimal 2 tahun (Lampiran C.4-3).`,

  51: (c) => `Pada TS, ${Math.round(28 * Math.max(c.skala, 0.5))} DTPR melaksanakan ${Math.round(33 * Math.max(c.skala, 0.5))} kegiatan PkM dengan dana Rp ${Math.round(310 * Math.max(c.skala, 0.5)).toLocaleString('id-ID')} juta (Rp 11 juta/DTPR). Pusat Layanan TIK Masyarakat melayani 46 sesi pelatihan.

Kegiatan sesuai peta jalan: 52% literasi digital UMKM, 30% transformasi digital desa, 18% keamanan siber sekolah. Bukti: Tabel LKPS PkM DTPR dan laporan kegiatan (Lampiran C.4-4).`,

  52: (c) => `Implementasi peta jalan PkM melibatkan ${Math.round(110 * c.skala) + 8} mahasiswa dalam 88% kegiatan. Contoh: pengembangan aplikasi kasir dan pencatatan keuangan untuk 60 UMKM binaan bersama Dinas Koperasi; pendampingan 12 desa membangun situs desa. Sebanyak 55% PkM merupakan penerapan hasil penelitian DTPR (Lampiran C.4-5).`,

  53: (c) => `Luaran PkM tiga tahun terakhir: 7 hibah PkM eksternal, 8 kerja sama aktif, 15 artikel di jurnal pengabdian (SINTA 2–4), 21 liputan media, dan 9 HKI hak cipta. Keberlanjutan: 3 desa binaan telah mandiri mengelola sistem informasi desa dan menjadi percontohan kabupaten (Lampiran C.4-6).`,

  54: (c) => `Evaluasi standar input PkM: dana dan jumlah PkM per DTPR terlampaui; peta jalan tercapai 6 dari 7 milestone. Belum tercapai: pemanfaatan Pusat Layanan TIK di luar jam kerja masih rendah.

Akar masalah: keterbatasan tenaga pendamping teknis. Survei kepuasan mitra PkM menunjukkan 3,62/4 (n = 54 mitra) (Lampiran C.4-7).`,

  55: (c) => `Evaluasi implementasi peta jalan dan pelibatan mahasiswa: 88% PkM melibatkan mahasiswa (target 80%). Namun, keterlibatan mahasiswa sering terbatas pada peran logistik, belum pada penerapan keilmuan.

Akar masalah: belum ada mekanisme rekognisi kegiatan PkM ke dalam SKS atau portofolio kompetensi mahasiswa (Lampiran C.4-8).`,

  56: (c) => `Evaluasi luaran PkM: kerja sama dan HKI tercapai, tetapi hibah PkM eksternal baru 18% DTPR (target 30%) dan diseminasi internasional belum ada.

Akar masalah: proposal hibah PkM eksternal kurang menonjolkan dampak terukur, sesuai catatan reviewer (Lampiran C.4-9).`,

  57: (c) => `Tindak lanjut: UPPS merekrut 2 tenaga pendamping teknis paruh waktu dari alumni dan membuka layanan konsultasi daring Pusat Layanan TIK. Milestone yang tertunda dijadwal ulang dengan anggaran tambahan (Lampiran C.4-10).`,

  58: (c) => `Kebijakan tindak lanjut ditetapkan: kegiatan PkM yang memenuhi kriteria dapat direkognisi sebagai MK pilihan atau dicatat dalam SKPI, dan setiap mahasiswa dalam tim PkM wajib memiliki peran teknis yang tertulis dalam proposal. Pedoman ini disahkan melalui SK Dekan dan diterapkan sejak TS+1 (Lampiran C.4-11).`,

  59: (c) => `Tindak lanjut luaran PkM: klinik penulisan proposal hibah PkM berbasis dampak (*theory of change*), pendampingan oleh reviewer berpengalaman, dan penjajakan publikasi PkM pada konferensi internasional. Pada TS+1, 5 proposal PkM eksternal didanai (Lampiran C.4-12).`,

  60: (c) => `Standar input PkM ditingkatkan: dana PkM menjadi Rp 10 juta/DTPR/tahun, Pusat Layanan TIK dikembangkan menjadi *Digital Village Hub* dengan dukungan pemda, dan peta jalan diperbarui dengan topik AI untuk layanan publik (Lampiran C.4-13).`,

  61: (c) => `Pelibatan mahasiswa dioptimalkan melalui program "PkM Berbasis Proyek" yang terintegrasi dengan MK proyek, dengan target ≥ 50% mahasiswa terlibat PkM sebelum lulus. Keterlibatan mitra DUDIKA juga diperluas melalui skema *corporate social responsibility* bersama dua perusahaan teknologi (Lampiran C.4-14).`,

  62: (c) => `Standar luaran PkM dinaikkan: hibah eksternal ≥ 40% DTPR, minimal 1 diseminasi internasional per tahun, dan model keberlanjutan berupa mitra binaan yang mandiri dalam 3 tahun. Hasil PkM juga didorong menjadi produk ber-HKI yang dapat direplikasi daerah lain (Lampiran C.4-15).`,

  // ===== C.5 Akuntabilitas =====
  63: (c) => `UPPS memiliki otonomi pengelolaan berdasarkan Statuta UN (PTN-BH/BLU) dengan kebijakan tata kelola yang transparan dan akuntabel: (1) RKAT disusun partisipatif dan dipublikasikan internal; (2) standar kapasitas sarana prasarana ditetapkan berbasis rasio kebutuhan; (3) standar SDM profesional mewajibkan sertifikasi dosen (serdos) dan sertifikasi kompetensi tendik.

Indikator: 100% laporan keuangan diaudit; ≥ 90% dosen bersertifikat pendidik; ≥ 70% tendik bersertifikat kompetensi (Lampiran C.5-1).`,

  64: (c) => `Kebijakan audit mutu ditetapkan untuk memastikan pemenuhan tupoksi tata kelola dan tata pamong, sarana prasarana, dan SDM. Audit meliputi audit keuangan oleh SPI dan KAP, AMI tahunan, audit aset, serta audit kinerja SDM melalui BKD/SKP. Bukti: Pedoman Audit Mutu dan SK tim auditor (Lampiran C.5-2).`,

  65: (c) => `Pelaksanaan tata kelola yang transparan dan akuntabel pada TS: RKAT dipublikasikan di portal internal; laporan keuangan memperoleh opini WTP; sarana prasarana dikelola dengan SIMAK-BMN dan tingkat ketersediaan ruang 100%; 93% dosen bersertifikat pendidik dan 76% tendik bersertifikat kompetensi. Dekan menyampaikan laporan pertanggungjawaban tahunan di rapat senat (Lampiran C.5-3).`,

  66: (c) => `Audit mutu dilaksanakan sesuai jadwal: audit keuangan SPI (Maret), audit KAP (April), AMI (Agustus), dan *stock opname* aset (Desember). Seluruh unit telah diaudit, dan 100% laporan audit ditindaklanjuti dengan rencana perbaikan yang terdokumentasi (Lampiran C.5-4).`,

  67: (c) => `Evaluasi tata kelola menunjukkan seluruh indikator akuntabilitas tercapai kecuali waktu pelaporan pertanggungjawaban kegiatan (rata-rata 21 hari, target 14 hari). Akar masalah: dokumen bukti pengeluaran masih fisik. Survei kepuasan dosen dan tendik terhadap transparansi tata kelola 3,40/4 (Lampiran C.5-5).`,

  68: (c) => `Evaluasi audit mutu: temuan audit aset menunjukkan 4% aset belum terlabel dan 2 laboratorium belum memiliki rencana perawatan berkala. Evaluasi SDM menunjukkan 24% tendik belum bersertifikat kompetensi akibat terbatasnya kuota uji. Akar masalah dianalisis dalam RTM (Lampiran C.5-6).`,

  69: (c) => `Tindak lanjut: penerapan aplikasi pertanggungjawaban keuangan digital (e-SPJ) dengan unggah bukti daring; waktu pelaporan turun menjadi 9 hari. Hasil dipantau dalam *action plan* dan dilaporkan pada RTM berikutnya (Lampiran C.5-7).`,

  70: (c) => `Tindak lanjut audit: pelabelan seluruh aset dengan QR code, penyusunan jadwal perawatan preventif laboratorium, dan kerja sama dengan LSP untuk uji kompetensi tendik. Pada TS+1, 100% aset terlabel dan sertifikasi tendik naik menjadi 88% (Lampiran C.5-8).`,

  71: (c) => `Standar akuntabilitas ditingkatkan: target waktu pelaporan menjadi ≤ 7 hari, publikasi ringkasan laporan keuangan fakultas kepada publik, dan penerapan manajemen risiko berbasis ISO 31000 di tingkat UPPS (Lampiran C.5-9).`,

  72: (c) => `Audit mutu ditingkatkan dengan audit berbasis risiko dan audit keamanan informasi (ISO 27001) untuk sistem informasi akademik. Standar SDM profesional dinaikkan: 100% tendik bersertifikat kompetensi dan seluruh laboran memiliki sertifikasi K3 laboratorium (Lampiran C.5-10).`,

  // ===== C.6 Diferensiasi Misi =====
  73: (c) => `VMTS ${c.ps} ditetapkan melalui SK Rektor No. 45/2021 dan selaras dengan visi UN dan FIK-UN. Visi keilmuan: *"Menjadi pusat pengembangan kecerdasan buatan yang terpercaya dan berdampak bagi kesehatan dan layanan publik pada 2035"*, sesuai kualifikasi KKNI level ${c.kkni}.

Rencana pengembangan strategis (Renstra 2021–2025) menetapkan ciri khas keilmuan "AI untuk kesehatan dan layanan publik" dengan indikator: ≥ 40% penelitian dan PkM pada topik khas, ≥ 3 kerja sama internasional, dan rekognisi oleh mitra DUDIKA di tingkat lokal, nasional, dan internasional (Lampiran C.6-1).`,

  74: (c) => `Ciri khas keilmuan dilaksanakan dalam tridarma: 4 MK khas AI untuk kesehatan; 52% penelitian dan 41% PkM pada topik khas; laboratorium AI Kesehatan bermitra dengan 3 rumah sakit.

Rekognisi: sistem triase AI digunakan di RSUD Kota (lokal), penghargaan inovasi dari Kemenkes (nasional), dan kerja sama riset dengan Universiti Malaya (internasional). VMTS disosialisasikan melalui situs web, PKKMB, dan rapat kerja tahunan (Lampiran C.6-2).`,

  75: (c) => `Evaluasi ketercapaian Renstra dilakukan setiap tahun: 21 dari 24 indikator tercapai. Survei pemahaman VMTS (n = ${Math.round(520 * c.skala) + 50} dosen, tendik, mahasiswa) menunjukkan 91% responden memahami visi keilmuan PS.

Belum tercapai: rekognisi internasional dalam bentuk mahasiswa asing (target 5, capaian 1). Akar masalah: belum ada kelas berbahasa Inggris dan promosi internasional (Lampiran C.6-3).`,

  76: (c) => `Tindak lanjut: UPPS membuka kelas internasional berbahasa Inggris, bergabung dengan konsorsium mobilitas mahasiswa ASEAN, dan membuat situs PS berbahasa Inggris. Rencana pengembangan direvisi dengan program promosi internasional. Pada TS+1, PS menerima 4 mahasiswa asing (Lampiran C.6-4).`,

  77: (c) => `Berdasarkan capaian Renstra 2021–2025, UPPS menyusun Renstra 2026–2030 dengan target lebih tinggi: akreditasi internasional, ≥ 50% luaran tridarma pada topik khas, dan pusat unggulan AI Kesehatan yang diakui nasional. Visi keilmuan dipertajam melalui *visioning workshop* dengan pemangku kepentingan (Lampiran C.6-5).`,
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
