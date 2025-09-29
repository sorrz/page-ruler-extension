(() => {
  if (window.__pageBoxActive) return;
  window.__pageBoxActive = true;

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2147483647,
    cursor: "crosshair",
    pointerEvents: "auto", // important
  });
  document.body.appendChild(container);

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
    pointerEvents: "none",
  });
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const tooltip = document.createElement("div");
  Object.assign(tooltip.style, {
    position: "fixed",
    left: "0px",
    top: "0px",
    padding: "4px 6px",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    fontSize: "12px",
    fontFamily: "Arial, sans-serif",
    borderRadius: "4px",
    pointerEvents: "none",
    zIndex: 2147483648,
  });
  container.appendChild(tooltip);

  let start = null;
  let end = null;
  let dragging = false;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!start || !end) return;

    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const w = Math.abs(end.x - start.x);
    const h = Math.abs(end.y - start.y);

    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "black";
    ctx.setLineDash([6, 4]);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);

    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(`${w}px`, x + w/2, y - 10);
    ctx.fillText(`${w}px`, x + w/2, y + h + 10);

    ctx.save();
    ctx.translate(x - 12, y + h/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(`${h}px`, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(x + w + 12, y + h/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(`${h}px`, 0, 0);
    ctx.restore();
  }

  function onPointerDown(e) {
    dragging = true;
    start = getMousePos(e);
    end = start;
    draw();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    end = getMousePos(e);
    draw();

    const w = Math.abs(end.x - start.x);
    const h = Math.abs(end.y - start.y);
    tooltip.innerText = `W: ${w}px H: ${h}px`;
    tooltip.style.left = e.clientX + 12 + "px";
    tooltip.style.top = e.clientY + 12 + "px";
  }

  function onPointerUp(e) {
    if (!dragging) return;
    end = getMousePos(e);
    dragging = false;
    draw();
    tooltip.innerText = "";
  }

  function onKey(e) {
    if (e.key === "Escape") cleanup();
  }

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  window.addEventListener("keydown", onKey);

  function cleanup() {
    window.removeEventListener("keydown", onKey);
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerup", onPointerUp);
    if (container.parentNode) container.parentNode.removeChild(container);
    window.__pageBoxActive = false;
  }

  window.__pageBoxCleanup = cleanup;

  console.log("Box tool active. Drag to draw. Esc to close.");
})();