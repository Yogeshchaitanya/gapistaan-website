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
    var tick=function(){ showTc(vid.currentTime||0); if(!vid.paused&&!vid.ended) requestAnimationFrame(tick); };
    vid.addEventListener('play',function(){ if(replay) replay.classList.remove('on'); tick(); });
    vid.addEventListener('ended',function(){ showTc(vid.duration||0); if(replay) replay.classList.add('on'); });
    if(replay) replay.addEventListener('click',function(){ vid.currentTime=0; var p=vid.play(); if(p&&p.catch) p.catch(function(){}); });
    if(calm){
      vid.removeAttribute('autoplay'); vid.pause();
      if(replay){ replay.textContent=replay.getAttribute('data-play'); replay.classList.add('on'); }
    } else {
      var p=vid.play();
      if(p&&p.catch) p.catch(function(){ if(replay){ replay.textContent=replay.getAttribute('data-play'); replay.classList.add('on'); } });
    }
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
    var rail=w.querySelector('.rail'); if(!rail) return;
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
})();
