/* mascot.js : มาสคอต 3 ตัว ถือเม็ดยาเหมือนกัน (ออกแบบขึ้นใหม่เอง ไม่ได้อิงตัวการ์ตูนใด)
     ปลาทอง  ว่ายซ้าย–ขวาที่ด้านล่างจอ
     กุ้ง     ไต่ขึ้นลงที่ขอบซ้าย
     ปลาดาว  ไต่ขึ้นลงที่ขอบขวา
   ใส่ในหน้าด้วย <script src="./mascot.js" defer></script>  ปิดได้โดยลบบรรทัดนั้น

   กติกาห้ามบังปุ่ม (ทำ 2 ชั้น)
   1) ทุกตัว pointer-events: none คลิก/แตะทะลุได้เสมอ
   2) ทุก 0.15 วินาทีอ่านตำแหน่งของ ปุ่ม ลิงก์ ช่องกรอก แท็บ ป้ายกำกับ แล้วถ้ามาสคอตตัวไหน
      (รวมกล่องคำพูด) เข้าใกล้ในระยะ 24px จะจางหายไปก่อนทับ และกลับมาเมื่อพ้น
   ผู้ใช้ที่ตั้งค่าลดการเคลื่อนไหว จะเห็นมาสคอตนิ่งที่มุมล่าง */
(function () {
  if (window.__mascot) return; window.__mascot = true;
  var NS = 'http://www.w3.org/2000/svg', INK = '#12344d', PAD = 24;
  var SAY = ['ตรวจวันหมดอายุทุกครั้งนะ', 'ถามรหัสผู้ป่วยให้ครบก่อนจ่าย', 'ยาใกล้หมดอายุ จ่ายก่อนนะ',
             'ข้อมูลจำลองนะ ห้ามใส่ชื่อจริง', 'ว่ายมาตรวจสต็อกค้าบ', 'เลือกล็อตให้ระบบ ไม่ต้องเลือกเอง'];

  /* ---------- วาด SVG ---------- */
  function s(tag, a, par) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (par) par.appendChild(e); return e; }
  var ST = { stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
  function P(tag, a, par) { return s(tag, Object.assign({}, ST, a), par); }
  function pill(par, tf, cls) {                       /* เม็ดยา: ครึ่งชมพู ครึ่งอควา */
    var g = s('g', { transform: tf }, par); if (cls) g.setAttribute('class', cls);
    P('rect', { x: -15, y: -7, width: 30, height: 14, rx: 7, fill: '#5ec5bd' }, g);
    P('path', { d: 'M0 -7H-8A7 7 0 0 0-8 7H0Z', fill: '#f9a8c9' }, g);
    s('path', { d: 'M5 -3h6', stroke: '#fff', 'stroke-width': 2, 'stroke-linecap': 'round', opacity: '.8' }, g);
    return g;
  }
  function eye(par, cx, cy, r) {
    P('circle', { cx: cx, cy: cy, r: r, fill: '#fff', 'stroke-width': 2.6 }, par);
    s('circle', { cx: cx + r * .25, cy: cy + r * .1, r: r * .5, fill: INK, 'class': 'mc-eye' }, par);
    s('circle', { cx: cx + r * .45, cy: cy - r * .2, r: r * .18, fill: '#fff' }, par);
  }
  function star(par, x, y) {
    return P('path', { d: 'M' + x + ' ' + y + 'l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z', fill: '#ffe27a', 'stroke-width': 1.8, 'class': 'mc-star' }, par);
  }
  function svgBox(vb) { return s('svg', { viewBox: vb, width: '100%', height: '100%', 'aria-hidden': 'true' }); }

  function drawFish() {                               /* ปลาทอง หันขวา */
    var v = svgBox('0 0 130 90');
    var tail = s('g', { 'class': 'mc-tail', style: 'transform-origin:40px 45px' }, v);
    P('path', { d: 'M38 45C24 38 12 32 9 14C25 14 36 24 44 37Z', fill: '#ff7a45' }, tail);
    P('path', { d: 'M38 45C24 52 12 58 9 76C25 76 36 66 44 53Z', fill: '#ff8f5a' }, tail);
    P('path', { d: 'M48 21C52 6 68 4 76 19Z', fill: '#ff7a45' }, v);
    P('ellipse', { cx: 62, cy: 46, rx: 33, ry: 26, fill: '#ffa530' }, v);
    s('ellipse', { cx: 66, cy: 56, rx: 20, ry: 11, fill: '#ffd08a', opacity: '.7' }, v);
    ['M50 40q5-5 10 0', 'M58 48q5-5 10 0', 'M46 52q5-5 10 0'].forEach(function (d) {
      s('path', { d: d, fill: 'none', stroke: '#e8801a', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, v); });
    eye(v, 80, 38, 9);
    s('circle', { cx: 74, cy: 52, r: 4.5, fill: '#f9a8c9', opacity: '.75' }, v);
    s('path', { d: 'M86 51q4 4 8-1', fill: 'none', stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, v);
    pill(v, 'translate(92 62) rotate(-28)', 'mc-pill');
    P('ellipse', { cx: 84, cy: 60, rx: 9, ry: 6, fill: '#ff8f5a', transform: 'rotate(20 84 60)' }, v);
    star(v, 112, 30);
    return v;
  }
  function drawShrimp() {                             /* กุ้ง ตั้งตรง */
    var v = svgBox('0 0 70 92');
    ['M26 16C18 6 10 8 5 2', 'M31 13C29 4 23 0 15 0'].forEach(function (d) {
      s('path', { d: d, fill: 'none', stroke: INK, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'class': 'mc-ant' }, v); });
    var fan = s('g', { 'class': 'mc-tail', style: 'transform-origin:24px 62px' }, v);
    [[-30, 0], [0, 0], [30, 0]].forEach(function (a) {
      P('ellipse', { cx: 16, cy: 76, rx: 5, ry: 10, fill: '#ff7a5c', transform: 'rotate(' + (a[0] + 20) + ' 24 62)', 'stroke-width': 2.4 }, fan); });
    P('path', { d: 'M34 14C50 14 57 30 51 46C47 58 39 66 29 68C20 70 16 62 22 58C30 52 34 44 32 36C30 28 22 26 22 20C22 16 28 14 34 14Z', fill: '#ff8e72' }, v);
    ['M44 30q5 2 8 0', 'M42 42q5 2 8 -1', 'M36 54q5 2 8 -1'].forEach(function (d) {
      s('path', { d: d, fill: 'none', stroke: '#e0553a', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, v); });
    eye(v, 38, 26, 7.5);
    s('circle', { cx: 44, cy: 33, r: 3.4, fill: '#f9a8c9', opacity: '.8' }, v);
    s('path', { d: 'M30 33q3 3 6 0', fill: 'none', stroke: INK, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, v);
    pill(v, 'translate(56 58) rotate(32)', 'mc-pill2');
    P('ellipse', { cx: 50, cy: 51, rx: 7, ry: 5, fill: '#ff8e72', transform: 'rotate(40 50 51)', 'stroke-width': 2.4 }, v);
    star(v, 58, 18);
    return v;
  }
  function drawStar() {                               /* ปลาดาว */
    var v = svgBox('0 0 92 92');
    var g = s('g', { 'class': 'mc-sway', style: 'transform-origin:45px 48px' }, v);
    P('polygon', { points: '45,8 55,34.2 83,35.6 61.2,53.3 68.5,80.4 45,65 21.5,80.4 28.8,53.3 7,35.6 35,34.2', fill: '#ffb84d', 'stroke-width': 3.4 }, g);
    [[45, 20], [24, 38], [66, 38], [31, 68], [60, 68]].forEach(function (c) {
      s('circle', { cx: c[0], cy: c[1], r: 2.6, fill: '#ff8f5a' }, g); });
    eye(g, 38, 46, 6.2); eye(g, 53, 46, 6.2);
    s('circle', { cx: 32, cy: 55, r: 3.6, fill: '#f9a8c9', opacity: '.8' }, g);
    s('circle', { cx: 59, cy: 55, r: 3.6, fill: '#f9a8c9', opacity: '.8' }, g);
    s('path', { d: 'M40 56q5.5 5 11 0', fill: 'none', stroke: INK, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g);
    pill(g, 'translate(76 40) rotate(-38)', 'mc-pill2');
    star(v, 78, 8);
    return v;
  }

  /* ---------- CSS ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.mc{position:fixed;left:0;top:0;z-index:60;pointer-events:none;will-change:transform,opacity;opacity:0;transition:opacity .18s}' +
    '.mc svg{overflow:visible}.mc.show{opacity:1}.mc .sp{width:var(--w);height:var(--h);transition:transform .35s}.mc .sp.left{transform:scaleX(-1)}' +
    '.mc .mc-tail{animation:mc-wag .55s ease-in-out infinite alternate}' +
    '.mc .mc-pill{animation:mc-pill 1.1s ease-in-out infinite alternate}' +
    '.mc .mc-pill2{animation:mc-pill2 1.1s ease-in-out infinite alternate}' +
    '.mc .mc-sway{animation:mc-sway 2.2s ease-in-out infinite alternate}' +
    '.mc .mc-ant{animation:mc-ant 1.4s ease-in-out infinite alternate;transform-origin:28px 16px}' +
    '.mc .mc-star{animation:mc-tw 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}' +
    '.mc .mc-eye{animation:mc-blink 4.5s infinite;transform-box:fill-box;transform-origin:center}' +
    '.mc .say{position:absolute;bottom:calc(var(--h) + 8px);left:50%;transform:translateX(-50%) scale(.8);opacity:0;white-space:nowrap;' +
    'background:#fff;color:' + INK + ';border:2.5px solid ' + INK + ';border-radius:16px;padding:4px 14px;font:600 15px/1.5 "Noto Sans Thai",sans-serif;' +
    'box-shadow:3px 3px 0 ' + INK + ';transition:opacity .25s,transform .25s}' +
    '.mc.sideL .say{left:0;transform:scale(.8);transform-origin:left bottom}.mc.sideR .say{left:auto;right:0;transform:scale(.8);transform-origin:right bottom}' +
    '.mc .say.on{opacity:1;transform:translateX(-50%) scale(1)}.mc.sideL .say.on,.mc.sideR .say.on{transform:scale(1)}' +
    '@keyframes mc-wag{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}' +
    '@keyframes mc-pill{from{transform:translate(92px,62px) rotate(-32deg)}to{transform:translate(92px,59px) rotate(-22deg)}}' +
    '@keyframes mc-pill2{from{transform:translateY(0)}to{transform:translateY(-3px)}}' +
    '@keyframes mc-sway{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}' +
    '@keyframes mc-ant{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}' +
    '@keyframes mc-tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(12deg)}}' +
    '@keyframes mc-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}' +
    '@media print{.mc{display:none}}';
  document.head.appendChild(css);

  /* ---------- ตัวช่วยตรวจการทับปุ่ม ---------- */
  var SEL = 'a,button,input,select,textarea,summary,label,[role=button],[role=tab],[tabindex]:not([tabindex="-1"])';
  var rects = [];
  function refreshRects() {
    var vw = innerWidth, vh = innerHeight, out = [], els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw) out.push(r);
    }
    rects = out;
  }
  function hits(b) {
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (b.left < r.right + PAD && b.right > r.left - PAD && b.top < r.bottom + PAD && b.bottom > r.top - PAD) return true;
    }
    return false;
  }
  setInterval(refreshRects, 150);
  addEventListener('scroll', refreshRects, { passive: true, capture: true });
  addEventListener('resize', refreshRects);

  /* ---------- ตัวละครแต่ละตัว ---------- */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = function () { return innerWidth < 600; };
  function actor(draw, w, h, ws, hs, side) {
    var box = document.createElement('div'); box.className = 'mc' + (side ? ' side' + side : '');
    var sp = document.createElement('div'); sp.className = 'sp'; sp.appendChild(draw());
    var say = document.createElement('div'); say.className = 'say'; say.setAttribute('aria-hidden', 'true');
    box.appendChild(say); box.appendChild(sp); document.body.appendChild(box);
    return { box: box, sp: sp, say: say, w: w, h: h, ws: ws, hs: hs, x: 0, y: 0, sayOff: 0, k: Math.floor(Math.random() * SAY.length) };
  }
  function resize(a) { var sm = small(); a.cw = sm ? a.ws : a.w; a.ch = sm ? a.hs : a.h;
    a.box.style.setProperty('--w', a.cw + 'px'); a.box.style.setProperty('--h', a.ch + 'px'); }
  function boundsOf(a) {                               /* กรอบตัวมาสคอต รวมกล่องคำพูดถ้ากำลังแสดง */
    var b = { left: a.x, top: a.y, right: a.x + a.cw, bottom: a.y + a.ch };
    if (a.say.classList.contains('on')) {
      var r = a.say.getBoundingClientRect();
      b.left = Math.min(b.left, r.left); b.right = Math.max(b.right, r.right); b.top = Math.min(b.top, r.top);
    }
    return b;
  }
  function put(a, now) {
    a.box.style.transform = 'translate(' + Math.round(a.x) + 'px,' + Math.round(a.y) + 'px)';
    a.box.classList.toggle('show', !hits(boundsOf(a)));
    if (a.nextSay && now > a.nextSay) { a.say.textContent = SAY[a.k++ % SAY.length]; a.say.classList.add('on'); a.sayOff = now + 3200; a.nextSay = now + 12000 + Math.random() * 6000; }
    if (a.sayOff && now > a.sayOff) { a.say.classList.remove('on'); a.sayOff = 0; }
  }

  var fish = actor(drawFish, 118, 82, 84, 58, '');
  var shrimp = actor(drawShrimp, 58, 76, 44, 58, 'L');
  var starfish = actor(drawStar, 66, 66, 48, 48, 'R');
  var all = [fish, shrimp, starfish];
  fish.nextSay = performance.now() + 4000; shrimp.nextSay = performance.now() + 8000; starfish.nextSay = performance.now() + 12000;
  all.forEach(resize); addEventListener('resize', function () { all.forEach(resize); });
  fish.x = 40; fish.dir = 1; shrimp.dir = 1; starfish.dir = -1; shrimp.y = 120; starfish.y = 420;
  refreshRects();

  if (reduce) {                                        /* ไม่เคลื่อนที่: วางนิ่งที่มุมล่าง */
    document.querySelectorAll('.mc *').forEach(function (n) { n.style.animation = 'none'; });
    var vh0 = innerHeight;
    fish.x = innerWidth - fish.cw - 16; fish.y = vh0 - fish.ch - 12;
    shrimp.x = 6; shrimp.y = vh0 - shrimp.ch - 12; starfish.x = innerWidth - starfish.cw - 6; starfish.y = vh0 - fish.ch - starfish.ch - 24;
    all.forEach(function (a) { a.nextSay = 0; put(a, 0); }); setInterval(function () { all.forEach(function (a) { put(a, 0); }); }, 300);
    return;
  }

  var t0 = performance.now(), last = t0;
  function frame(now) {
    var dt = Math.min(now - last, 60) / 1000; last = now;
    var vw = innerWidth, vh = innerHeight, t = now - t0;
    /* ปลาทอง: ซ้าย–ขวาที่ด้านล่าง */
    fish.x += fish.dir * (small() ? 45 : 70) * dt;
    if (fish.x > vw - fish.cw - 8) { fish.x = vw - fish.cw - 8; fish.dir = -1; }
    if (fish.x < 8) { fish.x = 8; fish.dir = 1; }
    fish.sp.classList.toggle('left', fish.dir < 0);
    fish.y = vh - fish.ch - 32 - Math.sin(t / 900) * 12 - Math.sin(t / 2300) * 18;
    /* กุ้ง: ไต่ขึ้นลงที่ขอบซ้าย  ปลาดาว: ขอบขวา */
    [[shrimp, 4, 38], [starfish, vw - starfish.cw - 4, 30]].forEach(function (c) {
      var a = c[0]; a.y += a.dir * c[2] * dt;
      var lo = 8, hi = vh - a.ch - 8;
      if (a.y > hi) { a.y = hi; a.dir = -1; } if (a.y < lo) { a.y = lo; a.dir = 1; }
      a.x = c[1] + Math.sin(t / 1100 + (a === shrimp ? 0 : 2)) * 3;
    });
    all.forEach(function (a) { put(a, now); });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
