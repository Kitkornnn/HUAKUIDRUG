/* mascot.js : มาสคอตปลาทองถือเม็ดยา ว่ายไปมาด้านล่างของทุกหน้า
   ตัวละครออกแบบขึ้นใหม่เอง ไม่ได้อิงตัวการ์ตูนใด
   ใส่ในหน้าด้วย <script src="./mascot.js" defer></script>  ปิดได้โดยลบบรรทัดนั้น
   - ว่ายซ้าย–ขวาและโยกขึ้นลงเบา ๆ กลับตัวเมื่อชนขอบจอ  - ไม่รับการคลิก ไม่บังปุ่ม (pointer-events: none)
   - ผู้ใช้ที่ตั้งค่าลดการเคลื่อนไหว (prefers-reduced-motion) จะเห็นปลานิ่งที่มุมขวาล่าง */
(function () {
  if (window.__mascot) return; window.__mascot = true;
  var NS = 'http://www.w3.org/2000/svg';
  var INK = '#12344d';
  var SAY = ['ตรวจวันหมดอายุทุกครั้งนะ', 'ถามรหัสผู้ป่วยให้ครบก่อนจ่าย', 'ยาใกล้หมดอายุ จ่ายก่อนนะ',
             'ข้อมูลจำลองนะ ห้ามใส่ชื่อจริง', 'ว่ายน้ำมาตรวจสต็อกค้าบ', 'เลือกล็อตให้ระบบ ไม่ต้องเลือกเอง'];

  function s(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e); return e;
  }
  function build() {
    var svg = s('svg', { viewBox: '0 0 130 90', width: '100%', height: '100%', 'aria-hidden': 'true' });
    var st = { stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
    function P(tag, a, par) { var o = Object.assign({}, st, a); return s(tag, o, par); }
    /* หาง (โบกได้) */
    var tail = s('g', { 'class': 'mc-tail' }, svg);
    P('path', { d: 'M38 45C24 38 12 32 9 14C25 14 36 24 44 37Z', fill: '#ff7a45' }, tail);
    P('path', { d: 'M38 45C24 52 12 58 9 76C25 76 36 66 44 53Z', fill: '#ff8f5a' }, tail);
    /* ครีบหลัง */
    P('path', { d: 'M48 21C52 6 68 4 76 19Z', fill: '#ff7a45' }, svg);
    /* ตัว */
    P('ellipse', { cx: 62, cy: 46, rx: 33, ry: 26, fill: '#ffa530' }, svg);
    s('ellipse', { cx: 66, cy: 56, rx: 20, ry: 11, fill: '#ffd08a', opacity: '.7' }, svg);
    /* เกล็ด */
    ['M50 40q5-5 10 0', 'M58 48q5-5 10 0', 'M46 52q5-5 10 0'].forEach(function (d) {
      s('path', { d: d, fill: 'none', stroke: '#e8801a', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, svg);
    });
    /* ตา แก้ม ปาก */
    P('circle', { cx: 80, cy: 38, r: 9, fill: '#fff' }, svg);
    var pupil = s('circle', { cx: 82.5, cy: 39, r: 4.4, fill: INK, 'class': 'mc-eye' }, svg);
    s('circle', { cx: 84, cy: 37, r: 1.5, fill: '#fff' }, svg);
    s('circle', { cx: 74, cy: 52, r: 4.5, fill: '#f9a8c9', opacity: '.75' }, svg);
    s('path', { d: 'M86 51q4 4 8-1', fill: 'none', stroke: INK, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, svg);
    /* ครีบข้างทำหน้าที่เป็นมือ + เม็ดยา */
    var pill = s('g', { transform: 'translate(92 62) rotate(-28)', 'class': 'mc-pill' }, svg);
    P('rect', { x: -15, y: -7, width: 30, height: 14, rx: 7, fill: '#5ec5bd' }, pill);
    P('path', { d: 'M0 -7H-8A7 7 0 0 0-8 7H0Z', fill: '#f9a8c9' }, pill);
    s('path', { d: 'M5 -3h6', stroke: '#fff', 'stroke-width': 2, 'stroke-linecap': 'round', opacity: '.8' }, pill);
    P('ellipse', { cx: 84, cy: 60, rx: 9, ry: 6, fill: '#ff8f5a', transform: 'rotate(20 84 60)' }, svg);
    /* ประกายดาว */
    P('path', { d: 'M112 30l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z', fill: '#ffe27a', 'stroke-width': 1.8, 'class': 'mc-star' }, svg);
    return svg;
  }

  var css = document.createElement('style');
  css.textContent =
    '#mascot{position:fixed;left:0;top:0;z-index:60;pointer-events:none;will-change:transform}' +
    '#mascot .fish{width:118px;height:82px;transition:transform .35s}' +
    '#mascot .fish.left{transform:scaleX(-1)}' +
    '#mascot .mc-tail{transform-origin:40px 45px;animation:mc-wag .55s ease-in-out infinite alternate}' +
    '#mascot .mc-pill{animation:mc-pill 1.1s ease-in-out infinite alternate;transform-box:fill-box}' +
    '#mascot .mc-star{transform-origin:112px 36px;animation:mc-tw 1.6s ease-in-out infinite}' +
    '#mascot .mc-eye{animation:mc-blink 4.5s infinite;transform-origin:82px 39px}' +
    '#mascot .say{position:absolute;left:50%;bottom:92px;transform:translateX(-50%) scale(.8);opacity:0;white-space:nowrap;' +
    'background:#fff;color:' + INK + ';border:2.5px solid ' + INK + ';border-radius:16px;padding:4px 14px;font:600 15px/1.5 "Noto Sans Thai",sans-serif;' +
    'box-shadow:3px 3px 0 ' + INK + ';transition:opacity .25s,transform .25s}' +
    '#mascot .say.on{opacity:1;transform:translateX(-50%) scale(1)}' +
    '@keyframes mc-wag{from{transform:rotate(-12deg)}to{transform:rotate(12deg)}}' +
    '@keyframes mc-pill{from{transform:translate(92px,62px) rotate(-32deg)}to{transform:translate(92px,59px) rotate(-22deg)}}' +
    '@keyframes mc-tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(12deg)}}' +
    '@keyframes mc-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}' +
    '@media (max-width:600px){#mascot .fish{width:84px;height:58px}#mascot .say{bottom:66px;font-size:14px}}' +
    '@media print{#mascot{display:none}}';
  document.head.appendChild(css);

  var box = document.createElement('div'); box.id = 'mascot';
  var fish = document.createElement('div'); fish.className = 'fish'; fish.appendChild(build());
  var say = document.createElement('div'); say.className = 'say'; say.setAttribute('aria-hidden', 'true');
  box.appendChild(say); box.appendChild(fish); document.body.appendChild(box);

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var x = 40, dir = 1, t0 = performance.now(), last = t0, nextSay = t0 + 4000, sayOff = 0, k = 0;
  function size() { return { w: fish.offsetWidth, h: fish.offsetHeight }; }
  function place(xx, yy) { box.style.transform = 'translate(' + Math.round(xx) + 'px,' + Math.round(yy) + 'px)'; }

  if (reduce) {
    document.querySelectorAll('#mascot *').forEach(function (n) { n.style.animation = 'none'; });
    var z = size(); place(innerWidth - z.w - 16, innerHeight - z.h - 12); return;
  }
  function frame(now) {
    var dt = Math.min(now - last, 60) / 1000; last = now;
    var z = size(), speed = innerWidth < 600 ? 45 : 70;
    x += dir * speed * dt;
    if (x > innerWidth - z.w - 8) { x = innerWidth - z.w - 8; dir = -1; }
    if (x < 8) { x = 8; dir = 1; }
    fish.classList.toggle('left', dir < 0);
    /* โยกขึ้นลงเป็นคลื่น ว่ายอยู่ช่วงล่างของจอ */
    var base = innerHeight - z.h - 18, y = base - 14 - Math.sin((now - t0) / 900) * 12 - Math.sin((now - t0) / 2300) * 18;
    place(x, y);
    if (now > nextSay) {
      say.textContent = SAY[k++ % SAY.length]; say.classList.add('on');
      sayOff = now + 3200; nextSay = now + 11000;
    }
    if (sayOff && now > sayOff) { say.classList.remove('on'); sayOff = 0; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
