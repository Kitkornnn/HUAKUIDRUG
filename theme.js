/* theme.js : ปุ่มสลับโหมดสว่าง/มืด ใช้ร่วมกันทุกหน้า
   - จำค่าที่เลือกไว้ใน localStorage (คีย์ hk-theme) ใช้ต่อทุกหน้า ถ้ายังไม่เคยเลือกใช้ตามการตั้งค่าเครื่อง
   - โหลดใน <head> แบบไม่ defer เพื่อตั้งสีก่อนหน้าแสดง ไม่กะพริบ
   - หน้า dashboard มีปุ่ม #theme อยู่แล้ว ใช้ปุ่มเดิมและจำค่าให้  หน้าอื่นเพิ่มปุ่มแคปซูลในส่วนหัว */
(function () {
  var KEY = 'hk-theme', root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var sys = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.dataset.theme = saved() === 'dark' || saved() === 'light' ? saved() : sys;

  function label(btn) {
    var dark = root.dataset.theme === 'dark';
    btn.textContent = dark ? '☀ โหมดสว่าง' : '☾ โหมดมืด';
    btn.setAttribute('aria-label', dark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด');
    btn.setAttribute('aria-pressed', String(dark));
  }
  document.addEventListener('DOMContentLoaded', function () {
    var old = document.getElementById('theme');
    if (old) {                                   /* dashboard: ปุ่มเดิมสลับค่าให้แล้ว เราแค่จำค่าและเปลี่ยนป้าย */
      label(old);
      old.addEventListener('click', function () { save(root.dataset.theme); label(old); });
      return;
    }
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'theme-toggle'; label(b);
    b.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      save(root.dataset.theme); label(b);
    });
    /* วางในส่วนหัวของแต่ละหน้า ถ้าไม่มีส่วนหัวให้ลอยมุมขวาบน */
    var home = document.querySelector('.home-link'), idx = document.querySelector('.wrap > header');
    if (home) { home.insertAdjacentElement('afterend', b); }
    else if (idx) { b.classList.add('in-header'); idx.appendChild(b); }
    else { b.classList.add('floating'); document.body.appendChild(b); }
  });

  /* ---------- แพลงก์ตอนเรืองแสง (เฉพาะโหมดมืด) ----------
     - เกิดทุก EVERY มิลลิวินาที (บางครั้ง 2 เม็ด) บนจอพร้อมกันไม่เกิน MAX เม็ด
     - กระจายทั่วจอ: เกิดได้ทั้งขอบล่างและกลางจอ แล้วค่อย ๆ จางเข้า ไม่ได้เรียงเป็นแถว
     - มีความลึก: เม็ดเล็กจาง ลอยช้า  เม็ดใหญ่ฟุ้งเบลอแบบโบเก้ ลอยเร็วกว่า
     - ส่ายซ้ายขวาแบบนุ่ม (ease-in-out) และสว่าง–หรี่ช้า ๆ ไม่เดินเป็นเส้นตรงแข็ง ๆ
     - อยู่หลังเนื้อหา ไม่รับการคลิก ไม่ทำงานเมื่อตั้งค่าลดการเคลื่อนไหวหรือแท็บไม่ได้เปิด */
  var MAX = 24, EVERY = 1200, COLORS = ['#7af0e6', '#5fd0f5', '#5ec5bd', '#c8faff', '#f9a8c9', '#b9a6ff'];
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function spawn(layer, warm) {
    if (layer.childElementCount >= MAX) return;
    var depth = Math.random();                         /* 0 = ไกล (เล็ก จาง ช้า)  1 = ใกล้ (ใหญ่ ฟุ้ง) */
    var size = 4 + depth * depth * 14, dur = rnd(16, 26) - depth * 6;
    var p = document.createElement('span'), i = document.createElement('i');
    p.className = 'pk';
    p.style.cssText = 'left:' + rnd(-2, 100) + 'vw;top:' + rnd(55, 108) + 'vh;width:' + size + 'px;height:' + size + 'px;' +
      '--c:' + COLORS[Math.floor(Math.random() * COLORS.length)] + ';--rise:' + (-rnd(45, 115)) + 'vh;' +
      '--o:' + (0.6 + depth * 0.4).toFixed(2) + ';--blur:' + (depth > .7 ? (depth - .7) * 6 : 0).toFixed(1) + 'px;' +
      'animation-duration:' + dur + 's;' + (warm ? 'animation-delay:' + (-rnd(0, dur * .8)) + 's;' : '');
    i.style.cssText = '--dx:' + rnd(10, 38) * (Math.random() < .5 ? -1 : 1) + 'px;animation-duration:' + rnd(3, 6.5) + 's,' + rnd(2.5, 5) + 's';
    p.appendChild(i);
    p.addEventListener('animationend', function (e) { if (e.target === p) p.remove(); });
    layer.appendChild(p);
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (still) return;
    var layer = document.createElement('div'); layer.className = 'plankton'; layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    var warmed = false;
    function tick() {
      if (root.dataset.theme !== 'dark' || document.hidden) return;
      if (!warmed) { warmed = true; for (var k = 0; k < 12; k++) spawn(layer, true); }   /* เปิดมาแล้วมีเลย ไม่ว่างเปล่า */
      spawn(layer, false); if (Math.random() < .35) spawn(layer, false);
    }
    tick(); setInterval(tick, EVERY);
  });
})();
