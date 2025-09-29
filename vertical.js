(() => {
  if (window.__pageVerticalActive) {
    console.warn("Vertical lines already active. Press Esc to remove.");
    return;
  }
  window.__pageVerticalActive = true;

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 2147483647,
    pointerEvents: "none",
  });
  document.documentElement.appendChild(container);

  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
  });
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let thickness = 1;
  let spacing = 50;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,0,150,0.4)";
    for (let x = 0; x <= window.innerWidth; x += spacing) {
      ctx.fillRect(x, 0, thickness, window.innerHeight);
    }
  }

  function onKey(e) {
    if (e.key === "Escape") {
      cleanup();
      return;
    }
    if (/^[0-9]$/.test(e.key)) {
      const num = parseInt(e.key, 10);
      thickness = num === 0 ? 10 : num;
      draw();
    }
    if (e.key === "[") {
      spacing = Math.max(5, spacing - 5);
      draw();
    }
    if (e.key === "]") {
      spacing += 5;
      draw();
    }
  }

  window.addEventListener("keydown", onKey);

  function cleanup() {
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", resizeCanvas);
    if (container.parentNode) container.parentNode.removeChild(container);
    window.__pageVerticalActive = false;
  }

  window.__pageVerticalCleanup = cleanup;

  console.log("Vertical lines active. 1–9/0 = thickness, [ ] = spacing, Esc = close.");
})();
