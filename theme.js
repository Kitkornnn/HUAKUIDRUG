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
})();
