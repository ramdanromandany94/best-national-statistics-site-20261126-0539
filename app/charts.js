// Pembuat grafik SVG kecil — tanpa pustaka luar, tanpa jaringan.
// Dua jenis saja, keduanya digambar dari angka yang diberikan:
// barChart untuk deret tahunan, lineChart untuk tren.
window.NUSA_CHARTS = (function () {
  var W = 640, H = 260, PAD_L = 46, PAD_R = 14, PAD_T = 18, PAD_B = 30;

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function niceMax(values) {
    var m = Math.max.apply(null, values.map(Math.abs));
    if (m <= 0) return 1;
    var pow = Math.pow(10, Math.floor(Math.log10(m)));
    var n = m / pow;
    var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return step * pow;
  }

  function fmtNum(v) {
    // Angka Indonesia memakai koma desimal, bukan titik.
    return String(v).replace(".", ",");
  }

  function gridLines(min, max) {
    var out = "", i, y, v;
    var steps = 4;
    for (i = 0; i <= steps; i++) {
      v = min + (max - min) * (i / steps);
      y = PAD_T + (H - PAD_T - PAD_B) * (1 - i / steps);
      out += '<line x1="' + PAD_L + '" y1="' + y.toFixed(1) + '" x2="' + (W - PAD_R) + '" y2="' + y.toFixed(1) + '" class="grid"/>';
      out += '<text x="' + (PAD_L - 6) + '" y="' + (y + 4).toFixed(1) + '" class="axis" text-anchor="end">' + fmtNum(v.toFixed(v % 1 ? 1 : 0)) + "</text>";
    }
    return out;
  }

  // Grafik batang: labels = tahun, values = angka.
  function barChart(labels, values, opts) {
    opts = opts || {};
    var min = opts.min !== undefined ? opts.min : Math.min(0, Math.min.apply(null, values));
    var max = niceMax(values.concat([opts.max || 0]));
    if (min > 0) min = 0;
    var iw = W - PAD_L - PAD_R, ih = H - PAD_T - PAD_B;
    var slot = iw / values.length, bw = Math.min(46, slot * 0.58);
    // Garis nol: batang membentang dari nilainya sampai garis ini, jadi
    // nilai negatif menggantung ke bawah dan tidak pernah ber tinggi nol.
    var yZero = PAD_T + ih * (1 - (0 - min) / (max - min));
    function yOf(v) { return PAD_T + ih * (1 - (v - min) / (max - min)); }
    var s = "", i, x, top, h, labY;
    s += '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(opts.title || "Grafik batang") + '">';
    s += gridLines(min, max);
    for (i = 0; i < values.length; i++) {
      x = PAD_L + slot * i + (slot - bw) / 2;
      top = Math.min(yOf(values[i]), yZero);
      h = Math.abs(yOf(values[i]) - yZero);
      // Label nilai negatif diletakkan di dalam batang (putih) supaya tidak
      // bertabrakan dengan label tahun di bawah sumbu.
      labY = yOf(values[i]) - 5;
      s += '<rect x="' + x.toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(h, 2).toFixed(1) + '" rx="3" class="bar' + (values[i] < 0 ? " neg" : "") + '"/>';
      s += '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + labY.toFixed(1) + '" class="val' + (values[i] < 0 ? " inbar" : "") + '" text-anchor="middle">' + fmtNum(values[i]) + "</text>";
      s += '<text x="' + (PAD_L + slot * i + slot / 2).toFixed(1) + '" y="' + (H - 8) + '" class="axis" text-anchor="middle">' + esc(labels[i]) + "</text>";
    }
    s += '<line x1="' + PAD_L + '" y1="' + (PAD_T + ih) + '" x2="' + (W - PAD_R) + '" y2="' + (PAD_T + ih) + '" class="base"/></svg>';
    return s;
  }

  // Grafik garis: labels = tahun, values = angka, plus titik per tahun.
  function lineChart(labels, values, opts) {
    opts = opts || {};
    var min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    var pad = (max - min) * 0.12 || 1;
    min -= pad; max += pad;
    var iw = W - PAD_L - PAD_R, ih = H - PAD_T - PAD_B;
    function px(i) { return PAD_L + (iw * i) / (values.length - 1); }
    function py(v) { return PAD_T + ih * (1 - (v - min) / (max - min)); }
    var s = "", i, pts = [];
    s += '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(opts.title || "Grafik garis") + '">';
    s += gridLines(min, max);
    for (i = 0; i < values.length; i++) pts.push(px(i).toFixed(1) + "," + py(values[i]).toFixed(1));
    s += '<polyline points="' + pts.join(" ") + '" class="line"/>';
    for (i = 0; i < values.length; i++) {
      s += '<circle cx="' + px(i).toFixed(1) + '" cy="' + py(values[i]).toFixed(1) + '" r="4.5" class="dot"/>';
      s += '<text x="' + px(i).toFixed(1) + '" y="' + (py(values[i]) - 10).toFixed(1) + '" class="val" text-anchor="middle">' + fmtNum(values[i]) + "</text>";
      s += '<text x="' + px(i).toFixed(1) + '" y="' + (H - 8) + '" class="axis" text-anchor="middle">' + esc(labels[i]) + "</text>";
    }
    s += '<line x1="' + PAD_L + '" y1="' + (PAD_T + ih) + '" x2="' + (W - PAD_R) + '" y2="' + (PAD_T + ih) + '" class="base"/></svg>';
    return s;
  }

  return { barChart: barChart, lineChart: lineChart };
})();
