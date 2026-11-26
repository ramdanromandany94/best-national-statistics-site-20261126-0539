// Statistik Nusantara — perute hash dan perender halaman.
// Semua halaman dirender dari data.js; tidak ada permintaan jaringan.
(function () {
  var D = window.NUSA, C = window.NUSA_CHARTS;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function idNum(n, dec) {
    return Number(n).toLocaleString("id-ID", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }

  function srcNote(source) {
    return '<p class="src">Sumber: ' + esc(source) + "</p>";
  }

  function kpiCard(k) {
    return '<article class="kpi"><p class="kpi-label">' + esc(k.label) + '</p>' +
      '<p class="kpi-value">' + esc(k.value) + '</p>' +
      '<p class="kpi-sub">' + esc(k.sub) + "</p>" +
      '<p class="kpi-src">' + esc(k.source) + "</p></article>";
  }

  function head(title, intro) {
    return "<h1>" + esc(title) + "</h1>" + '<p class="lede">' + esc(intro) + "</p>";
  }

  // ---------- Beranda ----------
  var homeTab = "growth";
  function homeChart() {
    if (homeTab === "growth") {
      return C.barChart(D.gdp.years, D.gdp.growth, { title: "Pertumbuhan ekonomi Indonesia 2020–2025" });
    }
    if (homeTab === "population") {
      return C.lineChart(D.population.years, D.population.values, { title: "Penduduk Indonesia 2020–2026" });
    }
    return C.lineChart(D.poverty.labels, D.poverty.values, { title: "Tingkat kemiskinan Indonesia 2024–2026" });
  }
  function homeChartCaption() {
    if (homeTab === "growth") return "Pertumbuhan PDB 2020–2025 (% per tahun). " + D.gdp.source + ".";
    if (homeTab === "population") return "Jumlah penduduk 2020–2026 (juta jiwa). 2025–2026 proyeksi. " + D.population.source + ".";
    return "Persentase penduduk miskin, Maret 2024 – Maret 2026. " + D.poverty.source + ".";
  }

  function renderHome() {
    var cards = D.kpi.map(kpiCard).join("");
    return head("Statistik Indonesia, satu tempat.", "Angka-angka resmi negara — penduduk, ekonomi, pekerjaan, kemiskinan, dan kesejahteraan — diringkas dari rilis Badan Pusat Statistik (BPS), lengkap dengan sumber dan tahunnya.") +
      '<section class="kpis">' + cards + "</section>" +
      '<section class="panel"><h2>Tren utama</h2>' +
      '<div class="tabs" role="tablist">' +
      '<button data-tab="growth" class="' + (homeTab === "growth" ? "on" : "") + '">Pertumbuhan ekonomi</button>' +
      '<button data-tab="population" class="' + (homeTab === "population" ? "on" : "") + '">Penduduk</button>' +
      '<button data-tab="poverty" class="' + (homeTab === "poverty" ? "on" : "") + '">Kemiskinan</button></div>' +
      '<div class="chart">' + homeChart() + "</div>" +
      '<p class="src">' + esc(homeChartCaption()) + "</p></section>" +
      '<section class="panel"><h2>Sorotan</h2><ul class="highlights">' +
      "<li><strong>281,6 juta jiwa</strong> — penduduk Indonesia pertengahan 2024, naik 1,04% dari tahun sebelumnya (BPS).</li>" +
      "<li><strong>5,03%</strong> — ekonomi tumbuh sepanjang 2024; PDB Rp22.139 triliun, PDB per kapita US$4.960 (BPS, 2025).</li>" +
      "<li><strong>8,57%</strong> — tingkat kemiskinan September 2024, terendah sejak BPS pertama kali merilis data kemiskinan pada 1960.</li>" +
      "<li><strong>75,02</strong> — Indeks Pembangunan Manusia 2024, naik dari 71,94 pada 2020 (BPS).</li></ul></section>" +
      '<section class="panel"><h2>Jelajahi berdasarkan topik</h2><nav class="cards">' +
      '<a href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, pertumbuhan, inflasi &amp; perdagangan</span></a>' +
      '<a href="#/penduduk"><strong>Penduduk</strong><span>Jumlah, sebaran pulau &amp; provinsi</span></a>' +
      '<a href="#/tenaga-kerja"><strong>Tenaga kerja</strong><span>Pengangguran &amp; angkatan kerja</span></a>' +
      '<a href="#/kemiskinan"><strong>Kemiskinan</strong><span>Garis kemiskinan, kota–desa &amp; IPM</span></a>' +
      '<a href="#/provinsi"><strong>Provinsi</strong><span>10 provinsi berpenduduk terbesar</span></a>' +
      '<a href="#/tentang"><strong>Tentang &amp; sumber</strong><span>Metode, sumber data &amp; catatan</span></a></nav></section>';
  }

  // ---------- Ekonomi ----------
  function renderEconomy() {
    var rows = D.gdp.years.map(function (y, i) {
      return "<tr><td>" + y + "</td><td>" + idNum(D.gdp.nominal[i], 1) + "</td><td>" +
        (D.gdp.growth[i] > 0 ? "+" : "") + idNum(D.gdp.growth[i], 2) + "%</td><td>" +
        idNum(D.gdp.perCapitaRp[i], 1) + "</td><td>US$" + idNum(D.gdp.perCapitaUsd[i]) + "</td></tr>";
    }).join("");
    var inf = D.inflation.years.map(function (y, i) {
      return "<tr><td>" + y + "</td><td>" + idNum(D.inflation.values[i], 2) + "%</td></tr>";
    }).join("");
    return head("Ekonomi", "Produk Domestik Bruto, pertumbuhan, inflasi, dan perdagangan luar negeri Indonesia.") +
      '<section class="panel"><h2>Pertumbuhan ekonomi 2020–2025</h2><div class="chart">' +
      C.barChart(D.gdp.years, D.gdp.growth, { title: "Pertumbuhan ekonomi Indonesia 2020–2025" }) + "</div>" +
      srcNote(D.gdp.source) + "</section>" +
      '<section class="panel"><h2>PDB dan PDB per kapita</h2><div class="chart">' +
      C.lineChart(D.gdp.years, D.gdp.perCapitaRp, { title: "PDB per kapita Indonesia 2020–2025" }) + "</div>" +
      '<table class="data"><thead><tr><th>Tahun</th><th>PDB (Rp triliun)</th><th>Tumbuh</th><th>PDB/kapita (Rp juta)</th><th>PDB/kapita (USD)</th></tr></thead><tbody>' +
      rows + "</tbody></table>" + srcNote(D.gdp.source) + "</section>" +
      '<section class="panel"><h2>Inflasi &amp; perdagangan</h2><div class="split">' +
      "<div><h3>Inflasi Desember (y-on-y)</h3><table class=\"data\"><thead><tr><th>Tahun</th><th>Inflasi</th></tr></thead><tbody>" +
      inf + "</tbody></table>" + srcNote(D.inflation.source) + "</div>" +
      "<div><h3>Perdagangan luar negeri, 2024</h3><ul class=\"facts\">" +
      "<li><strong>Ekspor:</strong> US$" + idNum(D.trade.exports, 2) + " miliar</li>" +
      "<li><strong>Impor:</strong> US$" + idNum(D.trade.imports, 2) + " miliar</li>" +
      "<li><strong>Surplus:</strong> US$" + idNum(D.trade.surplus, 2) + " miliar</li></ul>" +
      srcNote(D.trade.source) +
      "<p>Lapangan usaha dengan pertumbuhan tertinggi pada 2024: <strong>Jasa Lainnya, +9,80%</strong> (BPS).</p></div>" +
      "</div></section>";
  }

  // ---------- Penduduk ----------
  function renderPopulation() {
    var rows = D.population.years.map(function (y, i) {
      return "<tr><td>" + y + (D.population.projected[i] ? " *" : "") + "</td><td>" + idNum(D.population.values[i], 1) + "</td></tr>";
    }).join("");
    var isl = D.islands.map(function (p) {
      return "<tr><td>" + esc(p.name) + "</td><td>" + idNum(p.value, 1) + "</td><td>" + idNum(p.share, 1) + "%</td></tr>";
    }).join("");
    return head("Penduduk", "Jumlah, sebaran, dan struktur penduduk Indonesia.") +
      '<section class="panel"><h2>Penduduk 2020–2026</h2><div class="chart">' +
      C.lineChart(D.population.years, D.population.values, { title: "Penduduk Indonesia 2020–2026" }) + "</div>" +
      '<table class="data"><thead><tr><th>Tahun</th><th>Penduduk (juta jiwa)</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      "<p>* Proyeksi. " + esc(D.population.source) + ". " + esc(D.population.note) + "</p></section>" +
      '<section class="panel"><h2>Sebaran per pulau, pertengahan 2024</h2>' +
      '<table class="data"><thead><tr><th>Pulau</th><th>Penduduk (juta jiwa)</th><th>Pangsa</th></tr></thead><tbody>' +
      isl + "</tbody></table>" + srcNote("BPS — Proyeksi Penduduk, pertengahan 2024") +
      "<p>Lebih dari separuh penduduk tinggal di Jawa. Lihat <a href=\"#/provinsi\">daftar provinsi</a>.</p></section>";
  }

  // ---------- Tenaga kerja ----------
  function renderJobs() {
    return head("Tenaga kerja", "Pengangguran terbuka dan angkatan kerja Indonesia.") +
      '<section class="panel"><h2>Tingkat pengangguran terbuka, Agustus 2020–2024</h2><div class="chart">' +
      C.barChart(D.jobs.years, D.jobs.tpt, { title: "Tingkat pengangguran terbuka Indonesia 2020–2024" }) + "</div>" +
      srcNote(D.jobs.source) + "</section>" +
      '<section class="panel"><h2>Agustus 2024 dalam angka</h2><ul class="facts">' +
      "<li><strong>Angkatan kerja:</strong> " + idNum(D.jobs.labourForceAug2024, 2) + " juta orang</li>" +
      "<li><strong>Bekerja:</strong> " + idNum(D.jobs.employedAug2024, 2) + " juta orang</li>" +
      "<li><strong>Menganggur:</strong> " + idNum(D.jobs.unemployedAug2024, 2) + " juta orang</li>" +
      "<li><strong>Tingkat pengangguran terbuka:</strong> " + idNum(D.jobs.tpt[4], 2) + "% — turun dari 5,32% pada Agustus 2023</li></ul>" +
      srcNote(D.jobs.source) + "</section>";
  }

  // ---------- Kemiskinan ----------
  function renderPoverty() {
    var rows = D.poverty.labels.map(function (l, i) {
      return "<tr><td>" + esc(l) + "</td><td>" + idNum(D.poverty.values[i], 2) + "%</td><td>" +
        (D.poverty.people[i] ? idNum(D.poverty.people[i], 2) + " juta" : "—") + "</td></tr>";
    }).join("");
    return head("Kemiskinan & kesejahteraan", "Seberapa banyak penduduk miskin, di mana mereka tinggal, dan bagaimana kesejahteraan membaik.") +
      '<section class="panel"><h2>Tingkat kemiskinan 2024–2026</h2><div class="chart">' +
      C.lineChart(D.poverty.labels, D.poverty.values, { title: "Tingkat kemiskinan Indonesia 2024–2026" }) + "</div>" +
      '<table class="data"><thead><tr><th>Periode</th><th>Penduduk miskin</th><th>Jumlah</th></tr></thead><tbody>' + rows + "</tbody></table>" +
      srcNote(D.poverty.source) + "</section>" +
      '<section class="panel"><h2>Kota, desa &amp; garis kemiskinan</h2><ul class="facts">' +
      "<li><strong>Perkotaan, Sep 2024:</strong> " + idNum(D.poverty.urbanSep2024, 2) + "%</li>" +
      "<li><strong>Pedesaan, Sep 2024:</strong> " + idNum(D.poverty.ruralSep2024, 2) + "%</li>" +
      "<li><strong>Garis kemiskinan, Sep 2024:</strong> Rp" + idNum(D.poverty.lineSep2024) + " per kapita per bulan</li>" +
      "<li><strong>Indeks Pembangunan Manusia 2024:</strong> " + idNum(D.human.hdi.values[4], 2) + " (2020: " + idNum(D.human.hdi.values[0], 2) + ")</li>" +
      "<li><strong>Angka harapan hidup 2024:</strong> " + idNum(D.human.lifeExpectancy2024, 1) + " tahun</li>" +
      "<li><strong>Rasio Gini, Sep 2024:</strong> " + idNum(D.human.giniSep2024, 3) + "</li></ul>" +
      srcNote("BPS — Kemiskinan & IPM 2024") + "</section>";
  }

  // ---------- Provinsi ----------
  var provQuery = "", provSort = { key: "pop", dir: -1 };
  function renderProvinces() {
    var list = D.provinces.filter(function (p) {
      return p.name.toLowerCase().indexOf(provQuery.toLowerCase()) !== -1 ||
        p.island.toLowerCase().indexOf(provQuery.toLowerCase()) !== -1;
    });
    list.sort(function (a, b) {
      var k = provSort.key;
      var av = a[k], bv = b[k];
      if (typeof av === "string") return provSort.dir * av.localeCompare(bv, "id");
      return provSort.dir * (av - bv);
    });
    var rows = list.map(function (p) {
      return "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.island) + "</td><td>" + idNum(p.pop, 1) + "</td><td>" + idNum(p.share, 1) + "%</td></tr>";
    }).join("");
    return head("Provinsi", "Sepuluh provinsi berpenduduk terbesar di Indonesia, 2024.") +
      '<section class="panel"><label class="search">Cari provinsi atau pulau ' +
      '<input id="prov-search" type="search" placeholder="mis. Jawa, Sumatra…" value="' + esc(provQuery) + '"></label>' +
      '<p class="hint">Klik judul kolom untuk mengurutkan. Data: BPS, 2024 (proyeksi).</p>' +
      '<table class="data sortable"><thead><tr>' +
      '<th data-sort="name">Provinsi</th><th data-sort="island">Pulau</th>' +
      '<th data-sort="pop">Penduduk (juta)</th><th data-sort="share">Pangsa</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="4">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>') + "</tbody></table>" +
      "<p>Indonesia memiliki 38 provinsi. Tabel ini menampilkan 10 terbesar; Jawa Barat sendiri menampung " +
      "hampir seperlima penduduk nasional.</p></section>";
  }

  // ---------- Tentang ----------
  function renderAbout() {
    return head("Tentang & sumber", "Bagaimana situs ini dibuat dan dari mana angkanya berasal.") +
      '<section class="panel"><h2>Tentang situs ini</h2>' +
      "<p><strong>Statistik Nusantara</strong> adalah portal statistik Indonesia yang dirancang sebagai satu tempat " +
      "untuk menjawab pertanyaan paling umum tentang negara ini: berapa penduduknya, bagaimana ekonominya, " +
      "berapa yang menganggur, dan seberapa besar kemiskinannya. Situs ini statis dan bekerja luring — " +
      "semua angka tersimpan di dalam berkasnya sendiri, tanpa mengambil data dari internet.</p>" +
      "<p>Situs ini bukan situs resmi Badan Pusat Statistik dan tidak berafiliasi dengan BPS; angka-angkanya " +
      "dikutip dari rilis resmi BPS dan dicantumkan sumber serta tahunnya di setiap halaman.</p></section>" +
      '<section class="panel"><h2>Sumber data</h2><ul class="facts">' +
      "<li>BPS — Sensus Penduduk 2020 &amp; Proyeksi Penduduk Indonesia 2020–2050 (penduduk, pulau, provinsi)</li>" +
      "<li>BPS — Berita Resmi Statistik, 5 Februari 2025 &amp; 5 Februari 2026 (PDB, pertumbuhan, PDB per kapita)</li>" +
      "<li>BPS — Indeks Harga Konsumen, Desember 2024 (inflasi)</li>" +
      "<li>BPS — Statistik Ekspor Impor 2024 (perdagangan)</li>" +
      "<li>BPS — Sakernas Agustus 2024 (pengangguran &amp; angkatan kerja)</li>" +
      "<li>BPS — Berita Resmi Statistik Kemiskinan 2025 &amp; 2026 (kemiskinan, garis kemiskinan)</li>" +
      "<li>BPS — Indeks Pembangunan Manusia 2024 (IPM, angka harapan hidup, gini)</li></ul>" +
      "<p>Terakhir diperbarui: 26 November 2026. Angka 2025–2026 bertanda * adalah proyeksi resmi BPS.</p></section>" +
      '<section class="panel"><h2>Fakta dasar</h2><ul class="facts">' +
      "<li><strong>Luas daratan:</strong> " + D.facts.areaKm2 + " km²</li>" +
      "<li><strong>Jumlah pulau:</strong> " + D.facts.islands + "</li>" +
      "<li><strong>Bahasa daerah:</strong> " + D.facts.languages + "</li>" +
      "<li><strong>Ibu kota:</strong> " + esc(D.facts.capital) + "</li></ul>" +
      srcNote(D.facts.source) + "</section>";
  }

  // ---------- Perute ----------
  var routes = {
    "": renderHome,
    "ekonomi": renderEconomy,
    "penduduk": renderPopulation,
    "tenaga-kerja": renderJobs,
    "kemiskinan": renderPoverty,
    "provinsi": renderProvinces,
    "tentang": renderAbout
  };

  function currentRoute() {
    var h = window.location.hash.replace(/^#\/?/, "");
    return routes[h] ? h : "";
  }

  function render() {
    var route = currentRoute();
    var view = document.getElementById("view");
    view.innerHTML = routes[route]();
    document.querySelectorAll("nav.top a").forEach(function (a) {
      var r = a.getAttribute("href").replace(/^#\/?/, "");
      a.classList.toggle("active", r === route);
    });
    view.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () { homeTab = b.getAttribute("data-tab"); render(); });
    });
    var search = document.getElementById("prov-search");
    if (search) {
      search.addEventListener("input", function () { provQuery = search.value; render(); var s = document.getElementById("prov-search"); s.focus(); s.setSelectionRange(s.value.length, s.value.length); });
    }
    view.querySelectorAll("th[data-sort]").forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.getAttribute("data-sort");
        if (provSort.key === k) provSort.dir = -provSort.dir;
        else provSort = { key: k, dir: k === "name" || k === "island" ? 1 : -1 };
        render();
      });
    });
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  render();
})();
