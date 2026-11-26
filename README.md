# Statistik Nusantara

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ramdanromandany94/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ramdanromandany94/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Statistik Nusantara** — portal statistik Indonesia: angka-angka resmi negara (penduduk, ekonomi, pekerjaan, kemiskinan, kesejahteraan) diringkas dari rilis Badan Pusat Statistik (BPS), lengkap dengan sumber dan tahunnya, dalam satu situs statis yang bekerja luring.

Entry untuk bounty [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) di [make.fun](https://make.fun/r/hxd0fhbx).

## Yang ada di situs

- **Beranda** — 6 kartu indikator utama (penduduk 281,6 jt; PDB Rp22.139 T; pertumbuhan 5,03%; PDB/kapita US$4.960; kemiskinan 8,57%; pengangguran 4,91%) plus grafik tren yang bisa diganti lewat tab (pertumbuhan ekonomi / penduduk / kemiskinan) dan sorotan data.
- **Ekonomi** — PDB 2020–2025, grafik pertumbuhan, PDB per kapita, inflasi Desember, dan perdagangan luar negeri 2024 (ekspor US$264,70 miliar).
- **Penduduk** — tren 2020–2026, sebaran per pulau (Jawa 54,4%), dan struktur usia produktif.
- **Tenaga Kerja** — tingkat pengangguran terbuka Agustus 2020–2024 (7,07% → 4,91%) dan angka angkatan kerja.
- **Kemiskinan** — tren Mar 2024 – Mar 2026 (9,03% → 8,07%), kota vs desa, garis kemiskinan, IPM 75,02.
- **Provinsi** — tabel 10 provinsi berpenduduk terbesar dengan **pencarian** dan **pengurutan kolom** yang berfungsi.
- **Tentang & sumber** — daftar sumber BPS lengkap, metode, dan fakta dasar negara.

Semua grafik digambar sendiri sebagai SVG (tanpa pustaka luar), semua angka tersimpan di `app/data.js` — situs tidak mengambil apa pun dari internet dan bekerja luring. Tata letak responsif untuk desktop dan telepon.

## Menjalankan

```sh
cd app
python3 -m http.server 8080
# buka http://localhost:8080
```

atau buka `app/index.html` langsung di browser.

## Struktur

```
app/
  index.html   kerangka situs (navigasi hash, header, footer)
  style.css    seluruh gaya visual
  data.js      semua angka BPS + sumber dan tahun
  charts.js    pembuat grafik SVG (batang & garis)
  app.js       perute hash + perender halaman + pencarian/pengurutan
main.ts        entrypoint grader: menyalin app/ + screenshots/ ke /output,
               menulis dossier.json via vendor/makefun-frontend.ts
screenshots/  4 tangkapan layar situs yang sedang berjalan
vendor/       pustaka make.fun (tidak diubah)
```

## Sumber data

Badan Pusat Statistik (BPS) — Sensus Penduduk 2020 & Proyeksi Penduduk 2020–2050; Berita Resmi Statistik 5 Feb 2025 & 5 Feb 2026; Indeks Harga Konsumen Des 2024; Statistik Ekspor Impor 2024; Sakernas Agustus 2024; Berita Resmi Statistik Kemiskinan 2025 & 2026; Indeks Pembangunan Manusia 2024. Situs ini bukan situs resmi BPS dan tidak berafiliasi dengan BPS.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
