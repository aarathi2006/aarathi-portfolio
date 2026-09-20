(function () {
  /* theme toggle */
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function label() { btn.textContent = isDark() ? 'Light mode' : 'Dark mode'; }
  label();
  btn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });

  /* waveform */
  var canvas = document.getElementById('wave');
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w = 0, h = 0, t = 0, target = -1, mx = -1, visible = true, raf = null;

  function size() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function colour(a) {
    var hue = (265 + a * 135) % 360;
    return 'hsl(' + hue.toFixed(0) + ' 78% 54%)';
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    var step = 7, bw = 4;
    var n = Math.floor(w / step);
    var pad = (w - n * step + (step - bw)) / 2;
    for (var i = 0; i < n; i++) {
      var u = i / (n - 1);
      var env = 0.45 + 0.55 * Math.sin(u * Math.PI);
      var amp = 0.08 +
        Math.abs(Math.sin(u * 11 + t * 1.3)) * 0.33 * env +
        Math.abs(Math.sin(u * 4.7 - t * 0.8)) * 0.25 * env;
      var x = pad + i * step;
      if (mx >= 0) {
        var d = (x - mx) / 80;
        amp += 0.85 * Math.exp(-d * d);
      }
      amp = Math.min(amp, 1);
      var bh = Math.max(4, amp * h * 0.92);
      ctx.fillStyle = colour(amp);
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, (h - bh) / 2, bw, bh, 2); } else { ctx.rect(x, (h - bh) / 2, bw, bh); }
      ctx.fill();
    }
  }
  function loop() {
    t += 0.018;
    if (target >= 0) { mx = mx < 0 ? target : mx + (target - mx) * 0.2; }
    else if (mx >= 0) { mx = -1; }
    draw();
    raf = visible ? requestAnimationFrame(loop) : null;
  }
  function pos(e) {
    var r = canvas.getBoundingClientRect();
    target = e.clientX - r.left;
  }
  size();
  if (reduce) {
    draw();
    window.addEventListener('resize', function () { size(); draw(); });
  } else {
    canvas.addEventListener('pointermove', pos);
    canvas.addEventListener('pointerleave', function () { target = -1; });
    window.addEventListener('resize', size);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && !raf) loop();
      }).observe(canvas);
    }
    loop();
  }
})();
