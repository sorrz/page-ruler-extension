(() => {
  if (window.__pageRulerActive) {
    console.warn("Ruler already active. Press Esc to remove.");
    return;
  }
  window.__pageRulerActive = true;

  // --- Create overlay container ---
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'fixed',
    left: 0, top: 0,
    width: '100%', height: '100%',
    zIndex: 2147483647,
    pointerEvents: 'auto',
    cursor: 'crosshair'
  });
  document.documentElement.appendChild(container);

  // --- Canvas ---
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Object.assign(canvas.style, {
    width: '100%',
    height: '100%',
    display: 'block',
    pointerEvents: 'none'
  });
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // --- Info box ---
  const info = document.createElement('div');
  Object.assign(info.style, {
    position: 'fixed',
    left: '12px', top: '12px',
    padding: '8px 10px',
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: '13px',
    borderRadius: '6px',
    zIndex: 2147483648,
    pointerEvents: 'none'
  });
  info.innerText = "Click and drag to draw — hold Ctrl to snap to 90° — Esc to close";
  container.appendChild(info);

  // --- Close button ---
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close Ruler';
  Object.assign(closeBtn.style, {
    position: 'fixed',
    right: '12px', top: '12px',
    zIndex: 2147483648,
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    cursor: 'pointer'
  });
  closeBtn.addEventListener('click', cleanup);
  container.appendChild(closeBtn);

  // --- State ---
  let dragging = false, start = null, end = null, ctrlHeld = false;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  window.addEventListener('resize', resizeCanvas);

  function getMousePos(e) { return { x: e.clientX, y: e.clientY }; }
  function distance(a, b) { return Math.hypot(b.x - a.x, b.y - a.y); }
  function angleDeg(a, b) { return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI; }
  function snap90(a, b) {
    const len = distance(a, b);
    const deg = angleDeg(a, b);
    const snapped = Math.round(deg / 90) * 90;
    const rad = snapped * Math.PI / 180;
    return { x: a.x + Math.cos(rad) * len, y: a.y + Math.sin(rad) * len, deg: snapped };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!start || !end) return;
    let drawEnd = end;
    let shownAngle = angleDeg(start, end);
    if (ctrlHeld) {
      const snapped = snap90(start, end);
      drawEnd = { x: snapped.x, y: snapped.y };
      shownAngle = snapped.deg;
    }

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,200,0,0.95)';
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(drawEnd.x, drawEnd.y);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,200,0,0.95)';
    [start, drawEnd].forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI*2); ctx.fill(); });

    const len = distance(start, drawEnd);
    const mid = { x: (start.x + drawEnd.x)/2, y: (start.y + drawEnd.y)/2 };
    const label = `${Math.round(len)} px — ${Math.round(((shownAngle % 360)+360)%360)}°`;

    const padding = 6;
    ctx.font = '12px Arial';
    const metrics = ctx.measureText(label);
    const labelW = metrics.width + padding*2;
    const labelH = 18;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(mid.x-labelW/2, mid.y-labelH-8, labelW, labelH);

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(label, mid.x, mid.y-labelH/2-8);
  }

  function onPointerDown(e) {
    if (e.button !== 0) return;
    dragging = true;
    start = getMousePos(e);
    end = getMousePos(e);
    ctrlHeld = e.ctrlKey || e.metaKey;
    draw();
    e.preventDefault();
  }
  function onPointerMove(e) { if (!dragging) return; end = getMousePos(e); ctrlHeld = e.ctrlKey || e.metaKey; draw(); }
  function onPointerUp(e) { if (!dragging) return; end = getMousePos(e); ctrlHeld = e.ctrlKey || e.metaKey; dragging = false; draw(); }

  function onKeyDown(e) { if (e.key==='Escape'){cleanup(); return;} if(e.key==='Control'||e.key==='Meta'){ctrlHeld=true; draw();} }
  function onKeyUp(e) { if(e.key==='Control'||e.key==='Meta'){ctrlHeld=false; draw();} }

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  container.addEventListener('click', e=>e.stopPropagation(), true);

  function cleanup() {
    try {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('click', e=>e.stopPropagation(), true);
      if(container.parentNode) container.parentNode.removeChild(container);
    } catch(err){ console.error(err); }
    window.__pageRulerActive = false;
  }

  window.__pageRulerCleanup = cleanup;

  draw();
  console.log("Page ruler active. Click+drag to draw; hold Ctrl to snap 90°. Esc or 'Close Ruler' to remove.");
})();
