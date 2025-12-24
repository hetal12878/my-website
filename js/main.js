// Tương tác cơ bản cho trang AuraTown (tiếng Việt)
document.addEventListener('DOMContentLoaded',()=>{
  // cập nhật năm tự động ở footer
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // Demo số người chơi (thay bằng API trạng thái máy chủ thật nếu có)
  const playerCountEl = document.getElementById('player-count');
  function updatePlayers(){
    // TODO: Thay logic này bằng cuộc gọi tới API trạng thái Minecraft
    const p = Math.floor(Math.random()*200)+1;
    if(playerCountEl) playerCountEl.textContent = p + ' người';
  }
  updatePlayers();
  setInterval(updatePlayers,15000);

  // Cuộn mượt cho liên kết nội bộ
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href && href.length>1){
        const el = document.querySelector(href);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    })
  })
  // Toggle menu cho mobile
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if(navToggle && mobileNav){
    navToggle.addEventListener('click',()=>{
      const open = mobileNav.style.display === 'block';
      mobileNav.style.display = open ? 'none' : 'block';
      navToggle.setAttribute('aria-expanded', String(!open));
    });
    // close when clicking a mobile link
    mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ mobileNav.style.display='none'; navToggle.setAttribute('aria-expanded','false')}));
  }
  // copy IP buttons
  document.querySelectorAll('.copy-ip').forEach(btn=>{
    btn.addEventListener('click',async()=>{
      const ip = btn.getAttribute('data-ip');
      try{
        await navigator.clipboard.writeText(ip);
        showToast('Đã sao chép: ' + ip);
      }catch(e){
        showToast('Không thể sao chép, xin hãy sao chép thủ công.');
      }
    })
  })

  // toast helper
  function showToast(text,timeout=2500){
    let t = document.getElementById('site-toast');
    if(!t){
      t = document.createElement('div');
      t.id = 'site-toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(t._hide);
    t._hide = setTimeout(()=>{t.classList.remove('show')},timeout);
  }

  // contact form handling: prevent mailto navigation and show demo toast
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      // collect values (could send via API)
      const name = contactForm.querySelector('[name="name"]').value || '';
      const email = contactForm.querySelector('[name="email"]').value || '';
      // show confirmation toast
      showToast('Cảm ơn ' + (name||'bạn') + '. Tin nhắn đã được nhận (demo).');
      contactForm.reset();
    })
  }
  
  
  // --- Page transition animation (load + internal link navigation) ---
  (function pageTransitions(){
    // create overlay
    let overlay = document.getElementById('page-transition-overlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'page-transition-overlay';
      overlay.className = 'page-transition visible';
      const ripple = document.createElement('div'); ripple.className = 'center-ripple'; overlay.appendChild(ripple);
      document.body.appendChild(overlay);
    }

    function getTransitionMs(){
      const cs = getComputedStyle(overlay);
      // try CSS variable first
      const varVal = cs.getPropertyValue('--pt-duration').trim();
      if(varVal){
        if(varVal.endsWith('ms')) return parseFloat(varVal);
        if(varVal.endsWith('s')) return parseFloat(varVal) * 1000;
      }
      // fallback to transitionDuration
      const td = cs.transitionDuration.split(',')[0].trim();
      if(td.endsWith('ms')) return parseFloat(td);
      if(td.endsWith('s')) return parseFloat(td) * 1000;
      return 480;
    }

    // reveal page: small delay then hide overlay smoothly
    requestAnimationFrame(()=>{ setTimeout(()=>{ overlay.classList.add('hidden'); overlay.classList.remove('visible'); }, 40); });

    // utility: determine if a link is internal and should animate
    function isInternalLink(a){
      try{
        const href = a.getAttribute('href') || '';
        if(!href) return false;
        if(href.startsWith('#')) return false;
        if(href.startsWith('mailto:') || href.startsWith('tel:')) return false;
        if(a.target && a.target.toLowerCase() === '_blank') return false;
        const url = new URL(a.href, window.location.href);
        if(url.protocol.indexOf('http') === 0 && url.host !== window.location.host) return false;
        return true;
      }catch(e){return false}
    }

    // intercept internal link clicks and perform smooth fade
    document.addEventListener('click',(e)=>{
      const a = e.target.closest('a');
      if(!a) return;
      if(!a.href) return;
      if(!isInternalLink(a)) return;
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      // if overlay already visible, block
      if(overlay.classList.contains('visible') && !overlay.classList.contains('hidden')) return;
      // show overlay then navigate after transitionend for smoothness
      overlay.classList.remove('hidden'); overlay.classList.add('visible');
      // wait for overlay opacity transition to finish then navigate
      const onEnd = (ev)=>{
        if(ev.propertyName !== 'opacity') return;
        overlay.removeEventListener('transitionend', onEnd);
        // small safety paint tick
        requestAnimationFrame(()=> window.location.href = a.href);
      };
      overlay.addEventListener('transitionend', onEnd);
    }, true);
  })();

});