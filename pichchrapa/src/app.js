(function(){
  var doc=document, root=doc.documentElement;
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=window.matchMedia('(pointer: fine)').matches;

  // hero: the screen leans toward the pointer; the viewfinder timecode follows the clip
  var screen=doc.getElementById('screen');
  var vid=doc.getElementById('intro');
  if(screen&&fine&&!calm){
    var hero=screen.closest('.hero');
    hero.addEventListener('pointermove',function(e){
      var r=hero.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      screen.style.setProperty('--ry',(-5+x*8).toFixed(2)+'deg');
      screen.style.setProperty('--rx',(1-y*6).toFixed(2)+'deg');
    });
    hero.addEventListener('pointerleave',function(){screen.style.removeProperty('--ry');screen.style.removeProperty('--rx');});
  }
  var tc=doc.getElementById('tc'), replay=doc.getElementById('replay');
  function pad(n){return (n<10?'0':'')+n;}
  function showTc(t){
    var f=Math.floor(t*24)%24, s=Math.floor(t)%60, m=Math.floor(t/60);
    if(tc) tc.textContent='00:'+pad(m)+':'+pad(s)+':'+pad(f);
  }
  if(vid){
    // the clip loops for ever; its last second dips to black and its first fades up, so the seam does not jump
    var tick=function(){
      var t=vid.currentTime||0, d=vid.duration;
      showTc(t);
      if(d&&!calm){ var o=Math.min(1,t/.3,(d-t)/.6); vid.style.opacity=o<1?Math.max(0,o).toFixed(2):''; }
      if(!vid.paused&&!vid.ended) requestAnimationFrame(tick);
    };
    vid.addEventListener('play',function(){ if(replay) replay.classList.remove('on'); tick(); });
    vid.addEventListener('pause',function(){ vid.style.opacity=''; });
    vid.addEventListener('ended',function(){ showTc(vid.duration||0); if(replay) replay.classList.add('on'); });
    if(!calm&&'IntersectionObserver' in window){
      var held=false;
      new IntersectionObserver(function(es){
        var on=es[0].isIntersecting;
        if(!on&&!vid.paused){ vid.pause(); held=true; }
        else if(on&&held){ held=false; var q=vid.play(); if(q&&q.catch) q.catch(function(){}); }
      },{threshold:.05}).observe(vid);
    }
    if(replay) replay.addEventListener('click',function(){ vid.currentTime=0; var p=vid.play(); if(p&&p.catch) p.catch(function(){}); });
    if(calm){
      vid.removeAttribute('autoplay'); vid.pause();
      if(replay){ replay.textContent=replay.getAttribute('data-play'); replay.classList.add('on'); }
    } else {
      var p=vid.play();
      if(p&&p.catch) p.catch(function(){ if(replay){ replay.textContent=replay.getAttribute('data-play'); replay.classList.add('on'); } });
    }
  }

  // the film-strip holes around the hero screen turn into marquee bulbs (teal, orange, blue) with a light running round the frame
  if(screen){
    var strips={t:screen.querySelector('.perf-t'),r:screen.querySelector('.perf-r'),b:screen.querySelector('.perf-b'),l:screen.querySelector('.perf-l')};
    var drawn='';
    var bulbs=function(){
      var pf=parseFloat(getComputedStyle(screen).getPropertyValue('--pf'))||30, pitch=pf*1.05;
      var nx=Math.max(4,Math.round((screen.offsetWidth-2*pf)/pitch)), ny=Math.max(3,Math.round((screen.offsetHeight-2*pf)/pitch));
      if((nx+ny)%2) ny++;
      if(drawn===nx+'x'+ny) return;
      drawn=nx+'x'+ny;
      var i=0;
      var fill=function(el,n,across,back){
        var h='';
        for(var k=0;k<n;k++,i++){
          var pos=((back?n-1-k:k)+.5)/n*100;
          h+='<i class="c'+(i%3)+'" style="'+(across?'left':'top')+':'+pos.toFixed(2)+'%;animation-delay:'+((i%4)*.25-1).toFixed(2)+'s"></i>';
        }
        el.innerHTML=h;
      };
      fill(strips.t,nx,true,false); fill(strips.r,ny,false,false); fill(strips.b,nx,true,true); fill(strips.l,ny,false,true);
      screen.classList.add('bulbs-on');
    };
    bulbs();
    if('ResizeObserver' in window) new ResizeObserver(bulbs).observe(screen); else window.addEventListener('resize',bulbs);
  }

  // the reel strips lean into the scroll speed
  var reels=doc.querySelectorAll('.reels');
  if(reels.length&&!calm){
    var lastY=window.scrollY, vel=0, raf=0;
    var loop=function(){
      var y=window.scrollY, d=y-lastY; lastY=y;
      vel+= (Math.max(-9,Math.min(9,d*.35))-vel)*.18;
      if(Math.abs(vel)<.02&&Math.abs(d)<1){ vel=0; reels.forEach(function(r){r.style.setProperty('--vel',0);}); raf=0; return; }
      reels.forEach(function(r){r.style.setProperty('--vel',vel.toFixed(2));});
      raf=requestAnimationFrame(loop);
    };
    window.addEventListener('scroll',function(){ if(!raf) raf=requestAnimationFrame(loop); },{passive:true});
  }
  // the big reel behind the family section turns with the page
  var big=doc.querySelector('.bigreel');
  if(big&&!calm){
    var turn=function(){ big.style.transform='rotate('+(window.scrollY*.12).toFixed(1)+'deg)'; };
    window.addEventListener('scroll',turn,{passive:true}); turn();
  }

  // moments: the gavel, the stamps and the sound bars start when they scroll into view
  var fx=[].slice.call(doc.querySelectorAll('[data-fx]'));
  if(fx.length){
    if(calm||!('IntersectionObserver' in window)){
      fx.forEach(function(e){e.classList.add('in');});
    } else {
      var io=new IntersectionObserver(function(es){
        es.forEach(function(en){
          var el=en.target, live=el.getAttribute('data-fx')==='live';
          if(en.isIntersecting){ el.classList.add('in'); if(!live) io.unobserve(el); }
          else if(live){ el.classList.remove('in'); }
        });
      },{threshold:.35});
      fx.forEach(function(e){io.observe(e);});
    }
  }

  // rails: arrow buttons
  doc.querySelectorAll('.rail-wrap').forEach(function(w){
    var rail=w.querySelector('.rail')||w.querySelector('.shorts'); if(!rail) return;
    var nav=w.querySelector('.rail-nav');
    var check=function(){ if(nav) nav.hidden = rail.scrollWidth<=rail.clientWidth+4; };
    check(); window.addEventListener('resize',check); window.addEventListener('load',check);
    w.querySelectorAll('.rail-nav button').forEach(function(b){
      b.addEventListener('click',function(){
        rail.scrollBy({left:(b.getAttribute('data-dir')==='next'?1:-1)*Math.max(280,rail.clientWidth*.8),behavior:calm?'auto':'smooth'});
      });
    });
  });

  // shorts: cards turn toward the middle of the row
  doc.querySelectorAll('.shorts').forEach(function(row){
    var cards=[].slice.call(row.querySelectorAll('.short'));
    var pending=false;
    var lay=function(){
      pending=false;
      var rc=row.getBoundingClientRect(), mid=rc.left+rc.width/2;
      cards.forEach(function(c){
        var r=c.getBoundingClientRect(), off=(r.left+r.width/2-mid)/r.width;
        var a=Math.max(-1.6,Math.min(1.6,off));
        if(calm){ c.style.transform=''; c.style.opacity=''; return; }
        c.style.transform='rotateY('+(-a*24).toFixed(1)+'deg) scale('+(1-Math.min(.14,Math.abs(a)*.07)).toFixed(3)+')';
        c.style.opacity=(1-Math.min(.45,Math.abs(a)*.2)).toFixed(2);
      });
    };
    var req=function(){ if(!pending){ pending=true; requestAnimationFrame(lay); } };
    row.addEventListener('scroll',req,{passive:true});
    window.addEventListener('resize',req);
    lay();
  });

  // click to play: nothing from YouTube loads until someone asks for it
  function embed(id,short,btn){
    var f=doc.createElement('iframe');
    f.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&playsinline=1&rel=0';
    f.title=btn.getAttribute('data-title')||'YouTube';
    f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.allowFullscreen=true;
    btn.replaceWith(f);
    return f;
  }
  doc.addEventListener('click',function(e){
    var b=e.target.closest('[data-yt]'); if(!b) return;
    e.preventDefault();
    doc.dispatchEvent(new Event('pp:video'));     // a YouTube video is starting: the title song steps aside
    embed(b.getAttribute('data-yt'),b.hasAttribute('data-short'),b);
  });

  // the long episode grid shows 24 at a time
  doc.querySelectorAll('[data-more]').forEach(function(btn){
    var grid=doc.querySelector(btn.getAttribute('data-more'));
    btn.addEventListener('click',function(){
      var hidden=grid.querySelectorAll('[hidden]'), n=0;
      hidden.forEach(function(el){ if(n<24){ el.hidden=false; n++; } });
      if(!grid.querySelector('[hidden]')) btn.remove();
    });
  });
  // 3D stunt lane above the first film strip: load the module only when the lane is near the screen, run it only while visible
  var lane=doc.querySelector('.stunt3d');
  if(lane){
    var sd=navigator.connection&&navigator.connection.saveData;
    if(calm||sd||!('IntersectionObserver' in window)){ lane.classList.add('off'); }
    else {
      var show=false, api=null, loading=false;
      var sync=function(){ if(api){ if(show&&!doc.hidden) api.play(); else api.pause(); } };
      var boot=function(){
        if(loading) return; loading=true;
        import('/js/stunt3d.js').then(function(m){ api=m.start(lane); if(!api) lane.classList.add('off'); else sync(); },function(){ lane.classList.add('off'); });
      };
      new IntersectionObserver(function(es){ show=es[0].isIntersecting; if(show) boot(); sync(); },{rootMargin:'200px 0px'}).observe(lane);
      doc.addEventListener('visibilitychange',sync);
    }
  }

  // Raja Ka Baja title song: plays while the Raja Ka Baja reel is on screen and fades out when it scrolls away.
  // Browsers allow sound only after the visitor has touched the page, so until then the speaker glows and the first
  // tap, click or key anywhere starts it. The speaker turns the song off or on, and the choice is remembered on this device.
  var snd=doc.querySelector('.snd'), zone=doc.querySelector('.reels .strip'), zlabel=snd&&snd.closest('.reel-label');
  if(snd&&zone&&zlabel&&'IntersectionObserver' in window&&window.Audio){
    var KEY='pp-raja-song', pref=null; try{ pref=localStorage.getItem(KEY); }catch(e){}
    var saveData=navigator.connection&&navigator.connection.saveData;
    var au=null, inView=false, want=pref?pref!=='off':!saveData, yielded=false, blocked=false, fadeRaf=0, VOL=.8;
    var word=snd.querySelector('b');
    var paint=function(){
      var on=!!(au&&!au.paused);
      snd.setAttribute('aria-pressed',on?'true':'false');
      snd.classList.toggle('is-on',on);
      snd.classList.toggle('is-wait',!on&&want&&blocked&&inView&&!yielded);
      word.textContent=snd.getAttribute(on?'data-off':'data-on');
    };
    var get=function(){
      if(!au){
        au=new Audio(); au.preload='auto'; au.loop=true;
        au.src=snd.getAttribute(au.canPlayType('audio/mp4; codecs="mp4a.40.2"')?'data-src':'data-src-alt');   // AAC almost everywhere, Opus where AAC is missing
        au.addEventListener('play',paint); au.addEventListener('pause',paint);
      }
      return au;
    };
    var fade=function(to,ms,done){            // a timer, not animation frames: frames stall in some cases and the fade must always finish
      clearInterval(fadeRaf);
      var a=get(), from=a.volume, t0=Date.now();
      fadeRaf=setInterval(function(){
        var k=Math.min(1,(Date.now()-t0)/ms);
        try{ a.volume=Math.max(0,Math.min(1,from+(to-from)*k)); }catch(e){}
        if(k>=1){ clearInterval(fadeRaf); if(done) done(); }
      },30);
    };
    var pending=false;
    var should=function(){ return want&&!yielded&&inView&&!doc.hidden; };
    var start=function(){
      var a=get();
      if(pending) return;
      if(!a.paused){ fade(VOL,400); return; }          // was fading out: bring it back up
      try{ a.volume=0; }catch(e){}
      pending=true;
      var p=a.play();
      if(p&&p.then) p.then(function(){ pending=false; blocked=false; if(should()) fade(VOL,700); else a.pause(); paint(); },
                           function(){ pending=false; blocked=true; paint(); });
      else { pending=false; fade(VOL,700); }
    };
    var stop=function(){ if(!au||au.paused) return; fade(0,350,function(){ if(!should()) au.pause(); else fade(VOL,300); }); };
    var sync=function(){ if(should()) start(); else stop(); paint(); };
    // "on screen" = the Raja Ka Baja label or its film strip is inside the middle three quarters of the window
    var seen={};
    var zio=new IntersectionObserver(function(es){
      es.forEach(function(en){ seen[en.target===zone?'z':'l']=en.isIntersecting; });
      inView=!!(seen.z||seen.l); if(inView) get(); sync();
    },{rootMargin:'-12% 0px -12% 0px'});
    zio.observe(zone); zio.observe(zlabel);
    doc.addEventListener('visibilitychange',sync);
    var unlock=function(e){ if(e.target&&e.target.closest&&e.target.closest('.snd')) return; if(blocked) sync(); };
    ['click','keydown','touchend'].forEach(function(t){ doc.addEventListener(t,unlock,true); });
    snd.addEventListener('click',function(){
      var on=!!(au&&!au.paused);
      want=!on; yielded=false; blocked=false;
      try{ localStorage.setItem(KEY,want?'on':'off'); }catch(e){}
      if(want){ var a=get(); clearInterval(fadeRaf); try{ a.volume=VOL; }catch(e){} var p=a.play(); if(p&&p.catch) p.catch(function(){}); }
      else if(au){ clearInterval(fadeRaf); au.pause(); }
      paint();
    });
    doc.addEventListener('pp:video',function(){ yielded=true; stop(); });
    snd.hidden=false; paint();
  }
})();

// "Honour the artists": the box, its menu link and the page text stay hidden until the server says payments are switched on.
// Then: pick a ticket stub, Razorpay Checkout opens. The server decides nothing about the amount except the limits.
(function(){
  var doc=document, root=doc.documentElement;
  if(!doc.querySelector('.gift,.gift-link')) return;
  var on=function(){ root.classList.add('gift-on'); };
  var cached=false; try{ cached=sessionStorage.getItem('gift-on')==='1'; }catch(e){}
  if(cached) on();
  fetch('/api/status').then(function(r){ return r.json(); }).then(function(j){
    if(j&&j.payments==='on'){ on(); try{ sessionStorage.setItem('gift-on','1'); }catch(e){} }
    else { root.classList.remove('gift-on'); try{ sessionStorage.removeItem('gift-on'); }catch(e){} }
  }).catch(function(){});

  function post(u,b){ return fetch(u,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(b)}).then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ j._status=r.status; return j; }); }); }
  function loadRzp(){ return new Promise(function(ok,no){ if(window.Razorpay) return ok(); var s=doc.createElement('script'); s.src='https://checkout.razorpay.com/v1/checkout.js'; s.onload=ok; s.onerror=no; doc.head.appendChild(s); }); }
  doc.querySelectorAll('.gift').forEach(function(box){
    var T=JSON.parse(box.getAttribute('data-t')), pg=box.getAttribute('data-page')||'';
    var input=box.querySelector('input[name=amt]'), st=box.querySelector('.pay-status'), go=box.querySelector('.gift-go');
    var nm=box.querySelector('input[name=gname]'), msg=box.querySelector('textarea[name=gmsg]');
    var stubs=box.querySelectorAll('.stub');
    var say=function(m){ st.textContent=m||''; };
    function mark(){ stubs.forEach(function(b){ b.classList.toggle('is-on', b.getAttribute('data-amt')===String(+input.value)); }); }
    stubs.forEach(function(b){ b.addEventListener('click',function(){ input.value=b.getAttribute('data-amt'); mark(); say(''); }); });
    input.addEventListener('input',mark);
    function fail(m){ go.disabled=false; say(m); }
    go.addEventListener('click',function(){
      var a=Math.round(+input.value);
      if(!(a>=T.min)){ say(T.amountErr); input.focus(); return; }
      go.disabled=true; say(T.opening);
      post('/api/order',{amount:a,name:nm?nm.value:'',message:msg?msg.value:'',page:pg,lang:root.lang}).then(function(o){
        if(!o.order_id){ fail(o._status===503||o._status===404?T.offline:T.failed); return; }
        return loadRzp().then(function(){
          var paid=false;
          var rz=new window.Razorpay({ key:o.key, amount:o.amount, currency:o.currency, order_id:o.order_id, name:'PICHCHRAPA', description:T.desc, image:location.origin+'/apple-touch-icon.png', prefill:{ name:nm?nm.value:'' }, notes:{ source:'website' }, theme:{ color:'#0a4644' },
            handler:function(r){ paid=true; say(T.verifying); post('/api/verify',r).then(function(v){ if(v.ok){ go.disabled=false; box.classList.add('is-thanked'); say(T.thanks); } else fail(T.failed); },function(){ fail(T.failed); }); },
            modal:{ ondismiss:function(){ if(!paid) fail(''); } } });
          rz.open();
        },function(){ fail(T.offline); });
      },function(){ fail(T.offline); });
    });
  });
})();
