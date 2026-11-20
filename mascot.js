/* mascot.js : มาสคอต 3 ตัว ถือเม็ดยา (ออกแบบขึ้นใหม่เอง ไม่ได้อิงตัวการ์ตูนใด) ใช้เฉพาะหน้าแรก index.html
     โหมดสว่าง: ปลาทอง กุ้ง ปลาดาว   โหมดมืด: ฉลาม แมงกะพรุน ปลาแองเกลอร์
     ว่ายอิสระทั่วจอ ถูกดึงเข้าหากลางจอเบา ๆ
   เล่นได้: แตะ = เด้งดึ๋ง พูด และมีหัวใจ   แตะรัว 5 ครั้ง = หมุนติ้ว   ลาก = จับย้ายแล้วปล่อยให้ว่ายต่อ

   กติกาห้ามทับปุ่ม (ตรวจทุกเฟรม)
   - อ่านกรอบของปุ่ม ลิงก์ ช่องกรอก แท็บ หัวเว็บ กล่องหมายเหตุ ทุกเฟรม แล้วกันระยะห่าง 14px
   - ก้าวถัดไปที่จะทับ จะไม่ถูกเดิน มาสคอตเด้งกลับแทน (ทั้งตอนว่ายเองและตอนผู้ใช้ลาก)
   - ถ้าหน้าเปลี่ยนจนทับอยู่แล้ว (ย่อจอ เลื่อนหน้า) ย้ายไปจุดว่างที่ใกล้ที่สุดทันที ไม่มีจุดว่างก็ซ่อน
   - กล่องคำพูดแสดงเฉพาะเมื่อไม่ทับปุ่ม หัวใจลอยอยู่ในกรอบของตัวมาสคอตเท่านั้น
   ผู้ใช้ที่ตั้งค่าลดการเคลื่อนไหว: มาสคอตไม่ว่ายเอง แต่ยังแตะและลากได้ */
(function () {
  if (window.__mascot) return; window.__mascot = true;
  var NS = 'http://www.w3.org/2000/svg', INK = '#12344d', PAD = 14;
  /* ---------- วาด SVG ---------- */
  function s(tag, a, par) { var e = document.createElementNS(NS, tag); for (var k in a) e.setAttribute(k, a[k]); if (par) par.appendChild(e); return e; }
  var ST = { stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
  function P(tag, a, par) { return s(tag, Object.assign({}, ST, a), par); }
  function pill(par, tf, cls) {                       /* เม็ดยา: ครึ่งชมพู ครึ่งอควา */
    /* กลุ่มนอกกำหนดตำแหน่ง กลุ่มในใส่แอนิเมชัน (แอนิเมชัน CSS จะทับ transform ของกลุ่มเดียวกัน) */
    var g = s('g', {}, s('g', { transform: tf }, par)); if (cls) g.setAttribute('class', cls);
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

  /* ---------- ชุดโหมดมืด: ฉลาม แมงกะพรุน ปลาแองเกลอร์ (ถือเม็ดยาเหมือนกัน) ---------- */
  function drawShark() {                              /* ฉลามน้อย หันขวา ขนาดเท่าปลาทอง */
    var v = svgBox('0 0 130 90');
    var tail = s('g', { 'class': 'mc-tail', style: 'transform-origin:30px 46px' }, v);
    P('path', { d: 'M32 46L8 22C6 34 10 42 14 46C10 50 6 58 8 70Z', fill: '#7d9cb8' }, tail);
    P('path', { d: 'M56 24C60 8 70 4 78 6C74 12 72 18 72 25Z', fill: '#7d9cb8' }, v);
    P('path', { d: 'M28 46C34 28 60 20 86 24C104 27 118 36 120 46C118 58 102 66 84 68C58 72 34 64 28 46Z', fill: '#98b6cf' }, v);
    s('path', { d: 'M40 52C56 64 86 66 112 54C104 64 86 68 70 67C56 66 46 60 40 52Z', fill: '#eaf3f8' }, v);
    ['M66 38v12', 'M71 37v13', 'M76 37v12'].forEach(function (d) {
      s('path', { d: d, fill: 'none', stroke: '#5f7f9b', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, v); });
    eye(v, 96, 38, 7.5);
    s('circle', { cx: 92, cy: 50, r: 3.8, fill: '#f9a8c9', opacity: '.8' }, v);
    s('path', { d: 'M100 52q6 5 13 0', fill: '#fff', stroke: INK, 'stroke-width': 2.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, v);
    s('path', { d: 'M103 53l1.5 3 1.5-3M108 53l1.5 3 1.5-3', fill: '#fff', stroke: INK, 'stroke-width': 1.4, 'stroke-linejoin': 'round' }, v);
    pill(v, 'translate(94 70) rotate(-24)', 'mc-pill2');
    P('path', { d: 'M74 58C82 60 88 66 86 74C80 72 74 66 74 58Z', fill: '#7d9cb8' }, v);
    star(v, 118, 18);
    return v;
  }
  function drawJelly() {                              /* แมงกะพรุน ตั้งตรง ขนาดเท่ากุ้ง */
    var v = svgBox('0 0 70 92');
    var tents = s('g', { 'class': 'mc-tent' }, v);
    ['M20 44c-4 10 4 16 0 26s4 14 0 20', 'M30 46c-3 10 3 16 0 26', 'M40 46c3 10-3 16 0 26s-3 10 0 16'].forEach(function (d) {
      s('path', { d: d, fill: 'none', stroke: '#c79cf2', 'stroke-width': 3.2, 'stroke-linecap': 'round' }, tents); });
    s('path', { d: 'M49 44c5 6 6 12 8 18', fill: 'none', stroke: '#c79cf2', 'stroke-width': 3.2, 'stroke-linecap': 'round' }, v);
    var bell = s('g', { 'class': 'mc-bob' }, v);
    P('path', { d: 'M8 42C8 18 22 6 35 6S62 18 62 42C56 46 50 42 44 46C38 42 32 46 26 42C20 46 14 42 8 42Z', fill: '#e2c6ff', opacity: '.95' }, bell);
    s('path', { d: 'M18 20q6-8 16-8', fill: 'none', stroke: '#fff', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: '.8' }, bell);
    eye(bell, 27, 28, 5.4); eye(bell, 43, 28, 5.4);
    s('circle', { cx: 20, cy: 36, r: 3.2, fill: '#f9a8c9', opacity: '.85' }, bell);
    s('circle', { cx: 50, cy: 36, r: 3.2, fill: '#f9a8c9', opacity: '.85' }, bell);
    s('path', { d: 'M31 37q4 3.5 8 0', fill: 'none', stroke: INK, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, bell);
    pill(v, 'translate(58 66) rotate(64)', 'mc-pill2');
    star(v, 60, 6);
    return v;
  }
  function drawAngler() {                             /* ปลาแองเกลอร์ หันขวา มีโคมไฟบนหัว ขนาดเท่าปลาดาว */
    var v = svgBox('0 0 92 92');
    s('path', { d: 'M46 26C48 12 60 6 72 10', fill: 'none', stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, v);
    var lure = s('g', { 'class': 'mc-lure', style: 'transform-origin:74px 12px' }, v);
    s('circle', { cx: 74, cy: 12, r: 11, fill: '#fff3a6', opacity: '.35' }, lure);
    P('circle', { cx: 74, cy: 12, r: 5.5, fill: '#ffe27a', 'stroke-width': 2.2 }, lure);
    var tail = s('g', { 'class': 'mc-tail', style: 'transform-origin:20px 52px' }, v);
    P('path', { d: 'M22 52L6 38C4 46 4 58 6 66Z', fill: '#7b6fd0' }, tail);
    P('path', { d: 'M20 52C20 34 36 24 54 24C72 24 84 38 84 54C84 70 70 80 52 80C34 80 20 70 20 52Z', fill: '#958ae6' }, v);
    s('path', { d: 'M30 60c8 10 30 14 46 4', fill: 'none', stroke: '#7b6fd0', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, v);
    eye(v, 60, 42, 7.5);
    s('circle', { cx: 50, cy: 54, r: 3.6, fill: '#f9a8c9', opacity: '.8' }, v);
    P('path', { d: 'M62 58Q74 54 84 56Q80 68 66 66Z', fill: '#3a2b55', 'stroke-width': 2.4 }, v);
    s('path', { d: 'M66 58l2 4 2-4.5M72 57l2 4 2-4.5M78 56.5l2 3.5', fill: '#fff', stroke: INK, 'stroke-width': 1.3, 'stroke-linejoin': 'round' }, v);
    pill(v, 'translate(48 80) rotate(-14)', 'mc-pill2');
    P('path', { d: 'M38 66C44 70 46 76 42 82C36 78 34 72 38 66Z', fill: '#7b6fd0' }, v);
    return v;
  }

  /* ---------- CSS ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.mc{position:fixed;left:0;top:0;z-index:60;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}' +
    '.mc.drag{cursor:grabbing}.mc.off{visibility:hidden;pointer-events:none}' +
    '.mc svg{overflow:visible;display:block}.mc .fx{width:var(--w);height:var(--h)}.mc .sp{width:100%;height:100%;transition:transform .35s}.mc .sp.left{transform:scaleX(-1)}' +
    '.mc .fx.boing{animation:mc-boing .6s ease}.mc .fx.spin{animation:mc-spin .9s ease}.mc .fx.pop{animation:mc-pop .35s ease}' +
    '.mc.drag .fx{transform:scale(1.12) rotate(-6deg)}' +
    '.mc .mc-tail{animation:mc-wag .55s ease-in-out infinite alternate}' +
    '.mc .mc-pill{animation:mc-pill 1.1s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}' +
    '.mc .mc-pill2{animation:mc-pill2 1.1s ease-in-out infinite alternate}' +
    '.mc .mc-sway{animation:mc-sway 2.2s ease-in-out infinite alternate}' +
    '.mc .mc-ant{animation:mc-ant 1.4s ease-in-out infinite alternate;transform-origin:28px 16px}' +
    '.mc .mc-tent{animation:mc-tent 1.3s ease-in-out infinite alternate;transform-origin:35px 44px}' +
    '.mc .mc-bob{animation:mc-bob 1.3s ease-in-out infinite alternate}' +
    '.mc .mc-lure{animation:mc-lure 1.8s ease-in-out infinite alternate}' +
    '.mc .mc-star{animation:mc-tw 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}' +
    '.mc .mc-eye{animation:mc-blink 4.5s infinite;transform-box:fill-box;transform-origin:center}' +
    '.mc .say{position:absolute;bottom:calc(var(--h) + 8px);left:50%;transform:translateX(-50%) scale(.8);opacity:0;white-space:nowrap;pointer-events:none;' +
    'background:#fff;color:' + INK + ';border:2.5px solid ' + INK + ';border-radius:16px;padding:4px 14px;font:600 15px/1.5 "Noto Sans Thai",sans-serif;' +
    'box-shadow:3px 3px 0 ' + INK + ';transition:opacity .2s,transform .2s}' +
    '.mc .say.on{opacity:1;transform:translateX(-50%) scale(1)}' +
    '.mc .say.al{left:0;transform:scale(.8);transform-origin:left bottom}.mc .say.ar{left:auto;right:0;transform:scale(.8);transform-origin:right bottom}' +
    '.mc .say.dn{bottom:auto;top:calc(var(--h) + 8px)}.mc .say.al.on,.mc .say.ar.on{transform:scale(1)}' +
    '.mc .ht{position:absolute;pointer-events:none;font-size:18px;color:#f06a9b;text-shadow:1px 1px 0 ' + INK + ';animation:mc-heart .9s ease-out forwards}' +
    '@keyframes mc-wag{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}' +
    '@keyframes mc-pill{from{transform:rotate(-4deg)}to{transform:translateY(-3px) rotate(6deg)}}' +
    '@keyframes mc-pill2{from{transform:translateY(0)}to{transform:translateY(-3px)}}' +
    '@keyframes mc-sway{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}' +
    '@keyframes mc-ant{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}' +
    '@keyframes mc-tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(12deg)}}' +
    '@keyframes mc-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}' +
    '@keyframes mc-tent{from{transform:skewX(-6deg)}to{transform:skewX(6deg) scaleY(.94)}}' +
    '@keyframes mc-bob{from{transform:translateY(0) scale(1,1)}to{transform:translateY(-2px) scale(1.04,.96)}}' +
    '@keyframes mc-lure{from{transform:rotate(-8deg);filter:brightness(1)}to{transform:rotate(8deg);filter:brightness(1.4) drop-shadow(0 0 6px #ffe27a)}}' +
    '@keyframes mc-boing{0%{transform:scale(1)}30%{transform:scale(1.25,.8)}55%{transform:scale(.85,1.2) translateY(-6px)}80%{transform:scale(1.06,.95)}100%{transform:scale(1)}}' +
    '@keyframes mc-spin{from{transform:rotate(0)}to{transform:rotate(720deg)}}' +
    '@keyframes mc-pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}' +
    '@keyframes mc-heart{from{transform:translateY(0) scale(.6);opacity:1}to{transform:translateY(-28px) scale(1.1);opacity:0}}' +
    '@media (prefers-reduced-motion:reduce){.mc *{animation:none !important}}' +
    '@media print{.mc{display:none}}';
  document.head.appendChild(css);

  /* ---------- สิ่งที่ห้ามทับ ---------- */
  var OBST = 'a,button,input,select,textarea,summary,label,[role=button],[role=tab],[tabindex]:not([tabindex="-1"]),.wrap > header,.note,footer';
  var obst = [];
  function readObst() {
    obst = [];
    var els = document.querySelectorAll(OBST);
    for (var i = 0; i < els.length; i++) {
      if (els[i].closest('.mc')) continue;
      var r = els[i].getBoundingClientRect();
      if (r.width > 0 && r.height > 0) obst.push(r);
    }
  }
  function free(l, t, w, h) {                          /* กรอบนี้อยู่ในจอ และห่างทุกปุ่มอย่างน้อย PAD */
    if (l < 4 || t < 4 || l + w > innerWidth - 4 || t + h > innerHeight - 4) return false;
    for (var i = 0; i < obst.length; i++) {
      var r = obst[i];
      if (l < r.right + PAD && l + w > r.left - PAD && t < r.bottom + PAD && t + h > r.top - PAD) return false;
    }
    return true;
  }
  function freeBox(b) { return free(b.left, b.top, b.right - b.left, b.bottom - b.top); }

  /* ---------- ตัวละคร ---------- */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LINES = {
    fish:   ['บลุ๊บ บลุ๊บ!', 'จั๊กจี้นะ!', 'ตรวจวันหมดอายุทุกครั้งนะ', 'ว่ายมาตรวจสต็อกค้าบ', 'ยาใกล้หมดอายุ จ่ายก่อนนะ'],
    shrimp: ['ดีดตัวหนีค้าบ!', 'กุ้งไม่ใช่ของกินนะ!', 'ถามรหัสผู้ป่วยให้ครบก่อนจ่าย', 'ข้อมูลจำลองนะ ห้ามใส่ชื่อจริง'],
    star:   ['หมุนติ้ว~', 'ดาวประจำร้านมาแล้ว', 'เลือกล็อตให้ระบบ ไม่ต้องเลือกเอง', 'กินยาให้ตรงเวลานะ']
  };
  var SPIN_LINE = { fish: 'เวียนหัวแล้ววว', shrimp: 'กุ้งงงหมุนนน', star: 'ดาวหมุนรอบตัวเอง!' };
  /* ชุดโหมดมืด: ตำแหน่งเดียวกัน เปลี่ยนตัวละครและคำพูด */
  var DARK = {
    fish:   { draw: drawShark,  flip: true,  lines: ['ฉลามใจดีนะ ไม่กัด', 'ฟันสะอาดเพราะแปรงทุกวัน', 'ดึกแล้ว ตรวจสต็อกก่อนนอนนะ', 'ยาใกล้หมดอายุ จ่ายก่อนนะ'], spin: 'ฉลามหมุนวนนน' },
    shrimp: { draw: drawJelly,  flip: false, lines: ['ดึ๋ง ๆ ลอยไปลอยมา', 'แมงกะพรุนเรืองแสงได้นะ', 'ถามรหัสผู้ป่วยให้ครบก่อนจ่าย', 'ข้อมูลจำลองนะ ห้ามใส่ชื่อจริง'], spin: 'หนวดพันกันแล้ว!' },
    star:   { draw: drawAngler, flip: true,  lines: ['ส่องไฟให้ทางมืดเอง', 'ในทะเลลึกก็ต้องกินยาตรงเวลา', 'เลือกล็อตให้ระบบ ไม่ต้องเลือกเอง', 'ไฟบนหัวไม่ใช่ขนมนะ'], spin: 'ไฟหมุนติ้ว~' }
  };
  var LIGHT_FLIP = { fish: true, shrimp: true, star: false };
  function isDark() { return document.documentElement.dataset.theme === 'dark'; }
  function linesOf(a) { return isDark() ? DARK[a.kind].lines : LINES[a.kind]; }
  function spinOf(a) { return isDark() ? DARK[a.kind].spin : SPIN_LINE[a.kind]; }
  function flips(a) { return isDark() ? DARK[a.kind].flip : LIGHT_FLIP[a.kind]; }
  function skin(a) {                                   /* วาดตัวละครตามโหมดสีปัจจุบัน */
    var mode = isDark() ? 'dark' : 'light';
    if (a.skin === mode) return;
    a.skin = mode; a.sp.textContent = '';
    a.sp.appendChild(mode === 'dark' ? DARK[a.kind].draw() : a.draw());
    if (!flips(a)) a.sp.classList.remove('left');
    if (a.fx) restart(a.fx, 'pop');
  }
  function make(kind, draw, w, h, ws, hs, speed) {
    var el = document.createElement('div'); el.className = 'mc off'; el.setAttribute('aria-hidden', 'true');
    var say = document.createElement('div'); say.className = 'say';
    var fx = document.createElement('div'); fx.className = 'fx';
    var sp = document.createElement('div'); sp.className = 'sp';
    fx.appendChild(sp); el.appendChild(say); el.appendChild(fx); document.body.appendChild(el);
    var a = { kind: kind, el: el, say: say, fx: fx, sp: sp, W: w, H: h, WS: ws, HS: hs, speed: speed,
              draw: draw, skin: '', x: 0, y: 0, vx: 0, vy: 0, placed: false, boost: 0, sayOff: 0, nextSay: 0, taps: [], li: 0, drag: null };
    skin(a); size(a); bindPointer(a); return a;
  }
  function size(a) {
    var sm = innerWidth < 600; a.w = sm ? a.WS : a.W; a.h = sm ? a.HS : a.H;
    a.el.style.setProperty('--w', a.w + 'px'); a.el.style.setProperty('--h', a.h + 'px');
  }
  function put(a) { a.el.style.transform = 'translate(' + Math.round(a.x) + 'px,' + Math.round(a.y) + 'px)'; }
  function show(a, on) { a.el.classList.toggle('off', !on); if (!on) hideSay(a); }

  /* หาจุดว่าง: สุ่มหลายจุด เลือกจุดที่ใกล้จุดอ้างอิง (ค่าเริ่มต้นคือกลางจอ) */
  function findSpot(a, px, py) {
    var best = null, bd = 1e9, cx = px == null ? innerWidth / 2 : px, cy = py == null ? innerHeight / 2 : py;
    for (var i = 0; i < 500; i++) {
      var x = 4 + Math.random() * Math.max(1, innerWidth - a.w - 8), y = 4 + Math.random() * Math.max(1, innerHeight - a.h - 8);
      if (!free(x, y, a.w, a.h)) continue;
      var d = Math.hypot(x + a.w / 2 - cx, y + a.h / 2 - cy);
      if (d < bd) { bd = d; best = { x: x, y: y }; }
    }
    return best;
  }
  function randomVel(a, k) { var t = Math.random() * Math.PI * 2; a.vx = Math.cos(t) * a.speed * (k || 1); a.vy = Math.sin(t) * a.speed * (k || 1) * (a.kind === 'fish' ? .4 : 1); }

  /* ---------- กล่องคำพูด ---------- */
  function hideSay(a) { a.say.classList.remove('on'); a.sayOff = 0; }
  /* ลองวางกล่องคำพูดหลายตำแหน่ง (บน/ล่าง × กลาง/ชิดซ้าย/ชิดขวา) ใช้ตำแหน่งแรกที่ไม่ทับปุ่ม */
  var SAY_POS = [[], ['al'], ['ar'], ['dn'], ['dn', 'al'], ['dn', 'ar']];
  function speak(a, text, now) {
    a.say.textContent = text;
    for (var i = 0; i < SAY_POS.length; i++) {
      a.say.className = 'say ' + SAY_POS[i].join(' ');
      var r = a.say.getBoundingClientRect(), gx = r.width * .14, gy = r.height * .14;   /* วัดตอนย่อ .8 จึงขยายเผื่อ */
      if (freeBox({ left: r.left - gx, top: r.top - gy, right: r.right + gx, bottom: r.bottom + gy })) {
        a.say.classList.add('on'); a.sayOff = now + 2600; return true;
      }
    }
    a.say.className = 'say'; return false;
  }
  function sayBoxFree(a) { var r = a.say.getBoundingClientRect(); return freeBox(r); }

  /* ---------- การเล่น ---------- */
  function restart(node, cls) { node.classList.remove('boing', 'spin', 'pop'); void node.offsetWidth; node.classList.add(cls); }
  function hearts(a) {                                  /* หัวใจลอยอยู่ในกรอบตัวมาสคอตเท่านั้น */
    for (var i = 0; i < 3; i++) {
      var hz = document.createElement('span'); hz.className = 'ht'; hz.textContent = '♥';
      hz.style.left = (10 + Math.random() * (a.w - 30)) + 'px'; hz.style.top = (a.h * .45 + Math.random() * a.h * .2) + 'px';
      hz.style.animationDelay = (i * .12) + 's';
      a.el.appendChild(hz); setTimeout(function (n) { return function () { n.remove(); }; }(hz), 1300);
    }
  }
  function onTap(a, now) {
    a.taps = a.taps.filter(function (t) { return now - t < 2000; }); a.taps.push(now);
    if (a.taps.length >= 5) {
      a.taps = []; restart(a.fx, 'spin'); hideSay(a); speak(a, spinOf(a), now);
    } else {
      restart(a.fx, 'boing'); hearts(a); hideSay(a); speak(a, linesOf(a)[a.li++ % linesOf(a).length], now);
    }
    if (!reduce) { randomVel(a, 2.6); a.boost = now + 1200; }   /* ตกใจ ว่ายหนีเร็วขึ้นชั่วครู่ */
  }

  function bindPointer(a) {
    a.el.addEventListener('pointerdown', function (e) {
      if (a.el.classList.contains('off')) return;
      e.preventDefault(); a.el.setPointerCapture(e.pointerId);
      a.drag = { id: e.pointerId, ox: e.clientX - a.x, oy: e.clientY - a.y, sx: e.clientX, sy: e.clientY, t: performance.now(),
                 moved: 0, lx: a.x, ly: a.y, lt: performance.now(), vx: 0, vy: 0 };
      a.el.classList.add('drag'); hideSay(a);
    });
    a.el.addEventListener('pointermove', function (e) {
      var d = a.drag; if (!d || e.pointerId !== d.id) return;
      d.moved = Math.max(d.moved, Math.hypot(e.clientX - d.sx, e.clientY - d.sy));
      var tx = e.clientX - d.ox, ty = e.clientY - d.oy;
      readObst();
      /* ลากได้เฉพาะไปจุดที่ว่าง ทับปุ่มไม่ได้: ลองทั้งสองแกน แล้วทีละแกน */
      if (free(tx, ty, a.w, a.h)) { a.x = tx; a.y = ty; }
      else { if (free(tx, a.y, a.w, a.h)) a.x = tx; if (free(a.x, ty, a.w, a.h)) a.y = ty; }
      var now = performance.now(), dt = Math.max(16, now - d.lt) / 1000;
      d.vx = (a.x - d.lx) / dt; d.vy = (a.y - d.ly) / dt; d.lx = a.x; d.ly = a.y; d.lt = now;
      put(a);
    });
    function end(e) {
      var d = a.drag; if (!d || e.pointerId !== d.id) return;
      a.drag = null; a.el.classList.remove('drag');
      var now = performance.now();
      if (d.moved < 8 && now - d.t < 400) onTap(a, now);
      else if (!reduce) {                                  /* ปล่อยแล้วพุ่งต่อตามแรงเหวี่ยง (จำกัดความเร็ว) */
        var sp = Math.hypot(d.vx, d.vy), cap = a.speed * 5;
        if (sp > cap) { d.vx *= cap / sp; d.vy *= cap / sp; }
        if (sp > 30) { a.vx = d.vx; a.vy = d.vy; a.boost = now + 900; } else randomVel(a);
      }
    }
    a.el.addEventListener('pointerup', end);
    a.el.addEventListener('pointercancel', end);
  }

  /* ---------- สร้างและเริ่ม ---------- */
  var all = [
    make('fish', drawFish, 118, 82, 84, 58, 64),
    make('shrimp', drawShrimp, 58, 76, 44, 58, 48),
    make('star', drawStar, 66, 66, 48, 48, 40)
  ];
  addEventListener('resize', function () { all.forEach(size); });
  /* สลับโหมดสี -> เปลี่ยนตัวละครทันที (ปลาทอง→ฉลาม กุ้ง→แมงกะพรุน ปลาดาว→ปลาแองเกลอร์) */
  new MutationObserver(function () { all.forEach(function (a) { skin(a); hideSay(a); }); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function spawn(now) {
    readObst();
    var cx = innerWidth / 2, cy = innerHeight / 2;
    var pref = { fish: [cx, innerHeight - 60], shrimp: [cx - 260, cy], star: [cx + 260, cy] };
    all.forEach(function (a, i) {
      var p = pref[a.kind], s = findSpot(a, p[0], p[1]);
      if (s) { a.x = s.x; a.y = s.y; a.placed = true; put(a); show(a, true); restart(a.fx, 'pop'); }
      if (!reduce) randomVel(a);
      a.nextSay = now + 3500 + i * 4500;
    });
  }

  var last = performance.now();
  function frame(now) {
    var dt = Math.min(now - last, 50) / 1000; last = now;
    readObst();
    var cx = innerWidth / 2, cy = innerHeight / 2;
    all.forEach(function (a) {
      if (!a.drag && !reduce && a.placed) {
        /* ว่ายอิสระ: เปลี่ยนทิศสุ่มทีละน้อย และถูกดึงเข้าหากลางจอเบา ๆ */
        var ang = (Math.random() - .5) * 2.2 * dt, c = Math.cos(ang), s = Math.sin(ang);
        var vx = a.vx * c - a.vy * s, vy = a.vx * s + a.vy * c;
        vx += Math.sign(cx - (a.x + a.w / 2)) * 14 * dt;
        vy += Math.sign(cy - (a.y + a.h / 2)) * 6 * dt;
        if (a.kind === 'fish') vy = Math.max(-a.speed * .45, Math.min(a.speed * .45, vy));
        var spd = Math.hypot(vx, vy) || 1, target = a.speed * (now < a.boost ? 2.4 : 1);
        var f = 1 + (target / spd - 1) * Math.min(1, dt * 2.5); vx *= f; vy *= f;
        a.vx = vx; a.vy = vy;
        /* เดินทีละแกน ก้าวไหนจะทับปุ่มหรือออกนอกจอ ไม่เดิน แต่เด้งกลับ */
        var nx = a.x + a.vx * dt; if (free(nx, a.y, a.w, a.h)) a.x = nx; else a.vx = -a.vx;
        var ny = a.y + a.vy * dt; if (free(a.x, ny, a.w, a.h)) a.y = ny; else a.vy = -a.vy;
        if (flips(a) && Math.abs(a.vx) > 4) a.sp.classList.toggle('left', a.vx < 0);
      }
    });
    /* มาสคอตชนกันเองแล้วเด้งออก */
    for (var i = 0; i < all.length; i++) for (var j = i + 1; j < all.length; j++) {
      var p = all[i], q = all[j]; if (!p.placed || !q.placed || p.drag || q.drag) continue;
      var dx = (q.x + q.w / 2) - (p.x + p.w / 2), dy = (q.y + q.h / 2) - (p.y + p.h / 2);
      var dist = Math.hypot(dx, dy) || 1, min = (Math.min(p.w, p.h) + Math.min(q.w, q.h)) / 2;
      if (dist < min) {
        var nx2 = dx / dist, ny2 = dy / dist, push = (min - dist) / 2;
        if (free(p.x - nx2 * push, p.y - ny2 * push, p.w, p.h)) { p.x -= nx2 * push; p.y -= ny2 * push; }
        if (free(q.x + nx2 * push, q.y + ny2 * push, q.w, q.h)) { q.x += nx2 * push; q.y += ny2 * push; }
        var pv = p.vx * nx2 + p.vy * ny2, qv = q.vx * nx2 + q.vy * ny2;
        if (pv - qv > 0) { p.vx += (qv - pv) * nx2; p.vy += (qv - pv) * ny2; q.vx += (pv - qv) * nx2; q.vy += (pv - qv) * ny2; }
      }
    }
    all.forEach(function (a) {
      /* ตรวจซ้ำทุกเฟรม: ถ้าทับ (หน้าเปลี่ยน/เลื่อน) ย้ายไปจุดว่างใกล้สุด ไม่มีที่ว่างก็ซ่อน */
      if (!free(a.x, a.y, a.w, a.h)) {
        if (a.drag) { a.drag = null; a.el.classList.remove('drag'); }
        var s = findSpot(a, a.x + a.w / 2, a.y + a.h / 2);
        if (s) { a.x = s.x; a.y = s.y; a.placed = true; show(a, true); restart(a.fx, 'pop'); }
        else { a.placed = false; show(a, false); }
      } else if (!a.placed) { a.placed = true; show(a, true); }
      put(a);
      if (a.say.classList.contains('on') && (now > a.sayOff || !sayBoxFree(a))) hideSay(a);
      if (a.placed && !a.drag && a.nextSay && now > a.nextSay) {
        speak(a, linesOf(a)[a.li++ % linesOf(a).length], now);
        a.nextSay = now + 12000 + Math.random() * 6000;
      }
    });
    requestAnimationFrame(frame);
  }
  function start() { setTimeout(function () { spawn(performance.now()); last = performance.now(); requestAnimationFrame(frame); }, 300); }
  if (document.readyState === 'complete') start(); else addEventListener('load', start);
})();
