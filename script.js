/* ===================================================
   Matrix Rain Background
   =================================================== */

(function () {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, columns, drops;
    const FS = 13;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>{}[]|/\\~^';

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Math.floor(w / FS);
        drops = new Array(columns).fill(1);
    }

    function draw() {
        ctx.fillStyle = 'rgba(7,7,9,0.06)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.font = FS + 'px "Share Tech Mono", monospace';
        for (let i = 0; i < columns; i++) {
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * FS, drops[i] * FS);
            if (drops[i] * FS > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 50);
})();


/* ===================================================
   Glitch Generator (Requires Transparent PNGs for BG)
   =================================================== */
(function () {
    document.querySelectorAll('.statue-img').forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', () => createGlitchEffects(img));
        } else {
            createGlitchEffects(img);
        }
    });

    function createGlitchEffects(img) {
        if (img.dataset.glitched) return;
        img.dataset.glitched = "true";

        const wrap = img.parentElement;
        wrap.classList.add('glitch-active');

        // Clone 1 (Cyan Glitch)
        const g1 = document.createElement('img');
        g1.src = img.src;
        g1.className = 'statue-glitch glitch-layer-1';

        // Clone 2 (Red Glitch)
        const g2 = document.createElement('img');
        g2.src = img.src;
        g2.className = 'statue-glitch glitch-layer-2';

        wrap.appendChild(g1);
        wrap.appendChild(g2);
    }
})();
