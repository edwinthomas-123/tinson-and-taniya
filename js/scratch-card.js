/**
 * INTERACTIVE SCRATCH-TO-REVEAL CARD
 * Mobile touch & desktop mouse golden foil scratch card with petal pop
 */

class ScratchCard {
  constructor(canvasId, containerId, onComplete) {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    if (!this.canvas || !this.container) return;

    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.isRevealed = false;
    this.brushRadius = 26;
    this.lastPoint = null;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.paintGoldFoil();
    this.attachEvents();
  }

  setupCanvas() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  paintGoldFoil() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#a57924');
    grad.addColorStop(0.2, '#fbeea4');
    grad.addColorStop(0.4, '#d8ac44');
    grad.addColorStop(0.65, '#fff6ce');
    grad.addColorStop(0.85, '#b48529');
    grad.addColorStop(1, '#8e6216');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle brushed noise texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 40; i++) {
      ctx.fillRect(0, (h / 40) * i, w, 1);
    }

    // Elegant inner border line
    ctx.strokeStyle = 'rgba(110, 77, 13, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = 'rgba(255, 245, 205, 0.7)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // Decorative corner flourishes
    this.drawCorner(ctx, 22, 22, 1, 1);
    this.drawCorner(ctx, w - 22, 22, -1, 1);
    this.drawCorner(ctx, 22, h - 22, 1, -1);
    this.drawCorner(ctx, w - 22, h - 22, -1, -1);

    // Center icon & prompt text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Star sparkles
    ctx.font = '22px "Cormorant Garamond", serif';
    ctx.fillStyle = '#4f3707';
    ctx.fillText('✦   T & T   ✦', w / 2, h / 2 - 32);

    ctx.font = 'bold 15px "Montserrat", sans-serif';
    ctx.fillStyle = '#362402';
    ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 + 2);

    ctx.font = '500 11px "Montserrat", sans-serif';
    ctx.fillStyle = '#59410d';
    ctx.fillText('The Auspicious Wedding Date', w / 2, h / 2 + 24);

    ctx.font = '12px "Montserrat", sans-serif';
    ctx.fillStyle = '#6e5114';
    ctx.fillText('👆 Touch & Swipe', w / 2, h / 2 + 46);

    ctx.restore();
  }

  drawCorner(ctx, x, y, scaleX, scaleY) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.strokeStyle = '#6e4d0d';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 12);
    ctx.lineTo(0, 0);
    ctx.lineTo(12, 0);
    ctx.stroke();
    ctx.restore();
  }

  attachEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        screenX: clientX,
        screenY: clientY
      };
    };

    const start = (e) => {
      if (this.isRevealed) return;
      this.isDrawing = true;
      this.lastPoint = getPos(e);
      this.scratch(this.lastPoint);
      if (e.cancelable && e.type.startsWith('touch')) {
        e.preventDefault();
      }
    };

    const move = (e) => {
      if (!this.isDrawing || this.isRevealed) return;
      const current = getPos(e);
      this.scratchLine(this.lastPoint, current);
      this.lastPoint = current;
      this.checkProgress();
      if (e.cancelable && e.type.startsWith('touch')) {
        e.preventDefault();
      }
    };

    const end = () => {
      this.isDrawing = false;
      this.lastPoint = null;
    };

    // Touch events for phones
    this.canvas.addEventListener('touchstart', start, { passive: false });
    this.canvas.addEventListener('touchmove', move, { passive: false });
    this.canvas.addEventListener('touchend', end);
    this.canvas.addEventListener('touchcancel', end);

    // Mouse events for desktop
    this.canvas.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);

    // Responsive resize
    window.addEventListener('resize', () => {
      if (!this.isRevealed) {
        this.setupCanvas();
        this.paintGoldFoil();
      }
    });
  }

  scratch(pos) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  scratchLine(p1, p2) {
    if (!p1 || !p2) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = this.brushRadius * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  }

  checkProgress() {
    if (this.isRevealed) return;

    // Sample pixels efficiently every 24 pixels
    const dpr = window.devicePixelRatio || 1;
    const sampleStep = 18 * dpr;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    try {
      const imgData = this.ctx.getImageData(0, 0, w, h).data;
      let clearedPixels = 0;
      let totalChecked = 0;

      for (let y = 0; y < h; y += sampleStep) {
        for (let x = 0; x < w; x += sampleStep) {
          const alphaIndex = (y * w + x) * 4 + 3;
          if (imgData[alphaIndex] === 0) {
            clearedPixels++;
          }
          totalChecked++;
        }
      }

      const percent = (clearedPixels / totalChecked) * 100;
      const progressEl = document.getElementById('scratchProgressText');
      if (progressEl && !this.isRevealed) {
        progressEl.textContent = `Scratched: ${Math.round(percent)}% (Keep going!)`;
      }

      // If scratched > 40%, automatically complete the reveal with celebration!
      if (percent >= 38) {
        this.revealCompletely();
      }
    } catch (e) {
      // In case of any cross-origin image issue
    }
  }

  revealCompletely() {
    if (this.isRevealed) return;
    this.isRevealed = true;

    // Smooth fade out of canvas
    this.canvas.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    this.canvas.style.opacity = '0';
    this.canvas.style.transform = 'scale(1.05)';
    this.canvas.style.pointerEvents = 'none';

    setTimeout(() => {
      this.canvas.style.display = 'none';
    }, 850);

    const progressEl = document.getElementById('scratchProgressText');
    if (progressEl) {
      progressEl.innerHTML = '✨ <strong>Wedding Date Revealed!</strong> Join us in celebrating! ✨';
      progressEl.style.color = '#fbeea4';
    }

    const fallbackBtn = document.getElementById('scratchFallbackBtn');
    if (fallbackBtn) {
      fallbackBtn.style.display = 'none';
    }

    if (typeof this.onComplete === 'function') {
      const rect = this.canvas.getBoundingClientRect();
      this.onComplete(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }
}

window.ScratchCard = ScratchCard;
