// Improved script.js — copy & replace your old one with this
document.addEventListener('DOMContentLoaded', init);

function init(){
  try {
    console.log('Surprise init ▶');

    // ====== DATA (same as before) ======
    const DATA = {
      herName: "Keerthana",
      yourName: "— Yours, Yoga",
      headline: "I love you",
      heroPhoto: "",
      playlist: [
        { title:"Perfect — Ed Sheeran", url:"https://youtu.be/2Vv-BfVoq4g" },
        { title:"Tum Se Hi — Jab We Met", url:"https://youtu.be/jvj2wV0vOYU" },
        { title:"Kadhal Sadugudu — Alaipayuthey", url:"https://youtu.be/fX9T2UVv-8A" }
      ],
      reasons: [
        "You make every day lighter.",
        "Your laugh is my favorite sound.",
        "You believe in me when I wobble.",
        "You turn simple moments into magic.",
        "Your kindness inspires me to be better.",
        "Adventures are better holding your hand.",
        "With you, home is a person."
      ],
      timeline: [
        { when: "Our first chat", what: "We talked like we’d known each other forever." },
        { when: "First date", what: "Butterflies. Too many. Worth it." },
        { when: "A tough day", what: "You stayed. That meant everything." },
        { when: "Today", what: "Writing code to say: I choose you, always." }
      ],
      secret: " For the past 3 -4 days cried a lot and relized how much you would have got hurted. But end of the day, you are important than anything and anyone .Thank you for being in my life . From my heart, Sorry for everything . Love u lot my Kanmani."
    };
    // ====================================

    // safe-get helper (warn if missing)
    const $id = (id) => {
      const el = document.getElementById(id);
      if(!el) console.warn("Missing element #${id}check index.html");
      return el;
    };

    // --- Typewriter (safe) ---
    const typeEl = $id('typewriter');
    const text = DATA.headline || '';
    let ti = 0;
    function type(){
      if(!typeEl) return;
      if(ti <= text.length){
        typeEl.textContent = text.slice(0,ti++);
        setTimeout(type, 90);
      }
    }

    // --- Hearts (handles mouse + touch) ---
    function spawnHeartAt(x, y){
      const h = document.createElement('div');
      h.className = 'heart';
      h.style.left = x + 'px';
      h.style.top = y + 'px';
      h.textContent = ['💖','💘','💝','💗','💓'][Math.floor(Math.random()*5)];
      h.style.transform = `translate(-50%, -50%) scale(${0.9 + Math.random() * 1.2})`;


      document.body.appendChild(h);
      setTimeout(()=> h.remove(), 3400);
    }

    function pointerHandler(ev){
      // support PointerEvent, TouchEvent, MouseEvent
      try {
        if(ev.touches && ev.touches[0]) {
          spawnHeartAt(ev.touches[0].clientX, ev.touches[0].clientY);
        } else if(ev.clientX !== undefined && ev.clientY !== undefined) {
          spawnHeartAt(ev.clientX, ev.clientY);
        } else if(ev.changedTouches && ev.changedTouches[0]) {
          spawnHeartAt(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
        }
        // show reasons modal on first click? (optional)
        // document.querySelector('#reasonsModal')?.classList.add('show');
      } catch(err){
        console.error('pointerHandler error', err);
      }
    }

    // attach multiple fallbacks so clicks work on every device
    document.body.addEventListener('pointerdown', pointerHandler, {passive:true});
    document.body.addEventListener('touchstart', pointerHandler, {passive:true});
    document.body.addEventListener('mousedown', pointerHandler);
    document.body.addEventListener('click', pointerHandler);

    // --- starfield canvas setup (safe) ---
    const starCanvas = $id('stars');
    if (starCanvas && starCanvas.getContext) {
      const ctx = starCanvas.getContext('2d');
      function resizeCanvas(){ starCanvas.width = innerWidth; starCanvas.height = innerHeight; }
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const stars = Array.from({length:140}, ()=>({
        x: Math.random()*innerWidth,
        y: Math.random()*innerHeight,
        r: Math.random()*1.2 + .2,
        s: Math.random()*0.6 + 0.2
      }));

      function drawStars(){
        ctx.clearRect(0,0,starCanvas.width, starCanvas.height);
        for(const s of stars){
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
          ctx.fillStyle = `rgba(255,255,255,${0.45 + Math.random() * 0.5})`;

          ctx.fill();
          s.y += s.s * 0.15; if(s.y>innerHeight) s.y = -5;
        }
        requestAnimationFrame(drawStars);
      }
      drawStars();
    } else {
      console.warn('Canvas not supported or missing #stars.');
    }

    // --- Fill UI from DATA (safe) ---
    const herNameEl = $id('Keerthana'); if(herNameEl) herNameEl.textContent = DATA.herName || 'Love';
    const sigEl = $id('signature'); if(sigEl) sigEl.textContent = DATA.yourName || '— Yours';
    const heroPhotoEl = $id('heroPhoto'); if(heroPhotoEl && DATA.heroPhoto) heroPhotoEl.src = DATA.heroPhoto;
    const dateEl = $id('date'); if(dateEl) dateEl.textContent = new Date().toLocaleDateString(undefined, {year:'numeric', month:'long', day:'numeric'});

    // --- Playlist populate ---
    const playlistEl = $id('playlist');
    if(playlistEl) {
      playlistEl.innerHTML = ''; // reset
      DATA.playlist.forEach(p=>{
        const a = document.createElement('a');
        a.href = p.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'reason';
        a.innerHTML = `<h4>▶ ${p.title}</h4><div class="subtitle">Open on YouTube</div>`;

        playlistEl.appendChild(a);
      });
      console.log('Playlist items:', DATA.playlist.length);
    } else {
      console.warn('#playlist element missing');
    }

    // --- Reasons populate ---
    const reasonsGrid = $id('reasonsGrid');
    if(reasonsGrid){
      reasonsGrid.innerHTML = '';
      DATA.reasons.forEach((r,i)=>{
        const d = document.createElement('div');
        d.className = 'reason';
        d.innerHTML = `<h4>${i+1}.</h4><div class="subtitle">${r}</div>`;
        reasonsGrid.appendChild(d);
      });
    }

    // --- Timeline populate ---
    const timelineEl = $id('timeline');
    if(timelineEl){
      timelineEl.innerHTML = '';
      DATA.timeline.forEach(ev=>{
        const d = document.createElement('div');
        d.className = 'event';
        d.innerHTML = `<div class="when">${ev.when}</div><div class="what">${ev.what}</div>`;

        timelineEl.appendChild(d);
      });
    }

    // --- Modals open/close ---
    const $ = s => document.querySelector(s);
    const open = id => {
      const el = $(id);
      if(el) el.classList.add('show');
      else console.warn('Modal open failed, missing:', id);
    };
    const closeAll = () => document.querySelectorAll('.overlay').forEach(o=>o.classList.remove('show'));

    const reasonsBtn = $id('reasonsBtn'), timelineBtn = $id('timelineBtn');
    if(reasonsBtn) reasonsBtn.addEventListener('click', ()=> open('#reasonsModal'));
    if(timelineBtn) timelineBtn.addEventListener('click', ()=> open('#timelineModal'));

    document.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', closeAll));
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeAll(); });

    // --- Secret typing + mobile reveal fallback ---
    const secretSequence = 'love';
    let buffer = [];
    document.addEventListener('keydown', (e)=>{
      buffer.push(e.key.toLowerCase());
      if(buffer.join('').includes(secretSequence)){
        const sm = $id('secretMsg'); if(sm) sm.textContent = DATA.secret;
        open('#secretModal'); buffer = [];
      }
      if(buffer.length > 10) buffer = buffer.slice(-4);
    });

    // If device likely touch-only, add a small button to reveal secret
    if('ontouchstart' in window){
      // add a small floating button if secret modal element exists
      if($id('secretMsg')){
        const btn = document.createElement('button');
        btn.textContent = 'Reveal Secret';
        btn.id = 'revealSecretBtn';
        Object.assign(btn.style, {
          position: 'fixed', right: '12px', bottom: '12px', zIndex: 60,
          padding: '8px 12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(90deg,#ff8bc4,#ff5ea4)',
          color: '#120617', fontWeight: '700'
        });
        btn.addEventListener('click', ()=> {
          const sm = $id('secretMsg'); if(sm) sm.textContent = DATA.secret;
          open('#secretModal');
        });
        document.body.appendChild(btn);
      }
    }

    // kick off typewriter
    type();

    console.log('Surprise init ✓');
  } catch (err) {
    console.error('Initialization failed:', err);
    // visible error banner so you can notice it without opening console
    const errBox = document.createElement('div');
    errBox.style = 'position:fixed;left:10px;right:10px;top:10px;padding:10px;background:#ffebee;color:#610000;z-index:9999;border-radius:8px;font-weight:700';
    errBox.textContent = 'Script error — open Console to see details';
    document.body.appendChild(errBox);
  }
}