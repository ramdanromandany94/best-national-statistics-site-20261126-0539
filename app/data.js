// Data Statistik Indonesia — angka resmi Badan Pusat Statistik (BPS).
// Setiap angka di bawah disertai sumber dan tahunnya; daftar sumber lengkap
// ada di halaman "Tentang". Angka bertanda * adalah proyeksi BPS.
window.NUSA = {
  meta: {
    country: "Indonesia",
    source: "Badan Pusat Statistik (BPS)",
    updated: "26 November 2026",
    note: "Angka 2025–2026 bertanda * adalah proyeksi resmi BPS."
  },

  // Kartu indikator utama di beranda.
  kpi: [
    { label: "Penduduk", value: "281,6 jt", sub: "pertengahan 2024", source: "BPS, 2024" },
    { label: "PDB", value: "Rp22.139 T", sub: "harga berlaku, 2024", source: "BPS, 2025" },
    { label: "Pertumbuhan ekonomi", value: "5,03%", sub: "2024 (y-on-y)", source: "BPS, 2025" },
    { label: "PDB per kapita", value: "US$4.960", sub: "Rp78,6 juta, 2024", source: "BPS, 2025" },
    { label: "Kemiskinan", value: "8,57%", sub: "Sep 2024 — terendah sejak 1960", source: "BPS, 2025" },
    { label: "Pengangguran", value: "4,91%", sub: "Agustus 2024", source: "BPS, 2024" }
  ],

  // Penduduk per tahun (juta jiwa), Sensus 2020 + proyeksi BPS 2020–2050.
  population: {
    years: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
    values: [270.2, 272.7, 275.8, 278.7, 281.6, 284.4, 287.2],
    projected: [false, false, false, false, false, true, true],
    source: "BPS — Sensus Penduduk 2020 & Proyeksi Penduduk 2020–2050",
    note: "Laju tumbuh 2024: 1,04% per tahun. Penduduk usia produktif (15–64 th) sekitar 68% dari total."
  },

  // Sebaran penduduk per pulau, pertengahan 2024 (juta jiwa).
  islands: [
    { name: "Jawa", value: 151.6, share: 54.4 },
    { name: "Sumatra", value: 57.8, share: 20.7 },
    { name: "Kalimantan", value: 16.2, share: 5.8 },
    { name: "Sulawesi", value: 12.2, share: 4.4 },
    { name: "Papua", value: 4.2, share: 1.5 },
    { name: "Bali, Nusa Tenggara & Maluku", value: 36.7, share: 13.2 }
  ],

  // 10 provinsi berpenduduk terbesar, 2024 (juta jiwa).
  provinces: [
    { name: "Jawa Barat", pop: 49.9, share: 17.7, island: "Jawa" },
    { name: "Jawa Timur", pop: 41.8, share: 14.8, island: "Jawa" },
    { name: "Jawa Tengah", pop: 37.9, share: 13.5, island: "Jawa" },
    { name: "Sumatera Utara", pop: 15.6, share: 5.5, island: "Sumatra" },
    { name: "Banten", pop: 12.4, share: 4.4, island: "Jawa" },
    { name: "DKI Jakarta", pop: 10.6, share: 3.8, island: "Jawa" },
    { name: "Sulawesi Selatan", pop: 9.5, share: 3.4, island: "Sulawesi" },
    { name: "Lampung", pop: 9.3, share: 3.3, island: "Sumatra" },
    { name: "Sumatera Selatan", pop: 8.8, share: 3.1, island: "Sumatra" },
    { name: "Riau", pop: 6.6, share: 2.3, island: "Sumatra" }
  ],

  // Ekonomi: PDB harga berlaku (Rp triliun), pertumbuhan, PDB per kapita.
  gdp: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    nominal: [15443.6, 16976.7, 19588.4, 20892.4, 22139.0, 23821.1],
    growth: [-2.07, 3.70, 5.31, 5.05, 5.03, 5.11],
    perCapitaRp: [57.3, 62.2, 71.0, 75.0, 78.6, 83.7],
    perCapitaUsd: [3887, 4349, 4788, 4872, 4960, 5083],
    source: "BPS — Berita Resmi Statistik, 5 Februari 2025 & 5 Februari 2026",
    note: "Lapangan usaha tumbuh tercepat 2024: Jasa Lainnya, +9,80%."
  },

  // Inflasi Desember (y-on-y, %).
  inflation: {
    years: [2020, 2021, 2022, 2023, 2024],
    values: [1.68, 1.87, 5.51, 2.61, 1.57],
    source: "BPS — Indeks Harga Konsumen, Desember 2024"
  },

  // Perdagangan luar negeri 2024 (miliar USD).
  trade: {
    year: 2024,
    exports: 264.70,
    imports: 233.66,
    surplus: 31.04,
    source: "BPS — Statistik Ekspor Impor 2024"
  },

  // Kemiskinan (% penduduk), Maret & September.
  poverty: {
    labels: ["Mar 2024", "Sep 2024", "Mar 2025", "Sep 2025", "Mar 2026"],
    values: [9.03, 8.57, 8.47, 8.25, 8.07],
    people: [25.22, 24.06, 23.85, null, 22.93],
    urbanSep2024: 6.66,
    ruralSep2024: 11.34,
    lineSep2024: 595242,
    source: "BPS — Berita Resmi Statistik Kemiskinan, 2025 & 2026"
  },

  // Ketenagakerjaan: tingkat pengangguran terbuka Agustus (%).
  jobs: {
    years: [2020, 2021, 2022, 2023, 2024],
    tpt: [7.07, 6.49, 5.86, 5.32, 4.91],
    labourForceAug2024: 152.11,
    employedAug2024: 144.64,
    unemployedAug2024: 7.47,
    source: "BPS — Sakernas Agustus 2024"
  },

  // Pembangunan manusia.
  human: {
    hdi: { years: [2020, 2021, 2022, 2023, 2024], values: [71.94, 72.29, 73.37, 74.39, 75.02] },
    lifeExpectancy2024: 74.2,
    giniSep2024: 0.379,
    source: "BPS — Indeks Pembangunan Manusia 2024"
  },

  // Fakta dasar negara.
  facts: {
    areaKm2: "1.890.180",
    islands: "17.380",
    languages: "718",
    capital: "Jakarta (Ibu Kota Nusantara dalam pembangunan)",
    source: "BPS, 2024"
  }
};
