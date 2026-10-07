/**
 * PETAL & CONFETTI PARTICLE SYSTEM
 * Realistic floating rose petals, jasmine flowers, and celebratory burst physics
 */

class PetalSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.burstParticles = [];
    this.maxAmbientPetals = 22; // Gentle on mobile CPU/battery
    this.isRunning = false;
    this.wind = 0.2;
    this.windTarget = 0.2;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Populate initial ambient petals
    for (let i = 0; i < this.maxAmbientPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.start();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    const isJasmine = Math.random() > 0.65;
    // Natural rose petal shades: velvety red, deep crimson, ruby and tender blush
    const shades = [
      { base: '#6b0716', mid: '#b21835', tip: '#d93b5a' }, // Deep Velvet Red
      { base: '#7c0a1e', mid: '#c92042', tip: '#e85d77' }, // Classic Romantic Crimson
      { base: '#5c0410', mid: '#9c102c', tip: '#c92b4a' }, // Rich Burgundy Rose
      { base: '#8f1228', mid: '#d43354', tip: '#f27993' }  // Tender Rose Blush
    ];
    const shade = shades[Math.floor(Math.random() * shades.length)];

    return {
      shade: shade,
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -15 - Math.random() * 30,
      size: Math.random() * 3.5 + 4.5, // Refined smaller size (4.5px - 8px)
      aspect: Math.random() * 0.35 + 0.85,
      speedY: Math.random() * 0.85 + 0.65,
      speedX: Math.random() * 0.7 - 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      flip: Math.random() * Math.PI,
      flipSpeed: (Math.random() - 0.5) * 0.035,
      opacity: Math.random() * 0.25 + 0.75
    };
  }

  // Celebratory explosion of delicate rose petals
  burst(originX = this.width / 2, originY = this.height / 2, count = 50) {
    const shades = [
      { base: '#6b0716', mid: '#b21835', tip: '#d93b5a' },
      { base: '#7c0a1e', mid: '#c92042', tip: '#e85d77' },
      { base: '#5c0410', mid: '#9c102c', tip: '#c92b4a' },
      { base: '#8f1228', mid: '#d43354', tip: '#f27993' }
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 3;
      const shade = shades[Math.floor(Math.random() * shades.length)];

      this.burstParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        gravity: 0.15,
        friction: 0.95,
        size: Math.random() * 3.5 + 4.5,
        aspect: Math.random() * 0.3 + 0.85,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
        flip: Math.random() * Math.PI,
        flipSpeed: (Math.random() - 0.5) * 0.08,
        shade: shade,
        opacity: 1,
        life: 1,
        decay: Math.random() * 0.012 + 0.009
      });
    }
  }

  drawPetal(p) {
    const ctx = this.ctx;
    const s = p.size;
    const aspect = p.aspect || 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    // 3D curl flip
    const flipScale = Math.cos(p.flip || 0);
    ctx.scale(aspect, flipScale);
    ctx.globalAlpha = p.opacity;

    // Realistic rose petal radial gradient
    const grad = ctx.createRadialGradient(0, s * 0.4, 0.5, 0, 0, s * 1.3);
    grad.addColorStop(0, p.shade.base);
    grad.addColorStop(0.55, p.shade.mid);
    grad.addColorStop(0.92, p.shade.tip);
    grad.addColorStop(1, 'rgba(230, 80, 110, 0.7)');

    ctx.fillStyle = grad;

    // Realistic botanical rose petal curve (heart-cleaved top, flared cup, tapered base)
    ctx.beginPath();
    ctx.moveTo(0, s); // Tapered petal base/stem
    // Left petal flank
    ctx.bezierCurveTo(-s * 0.9, s * 0.5, -s * 1.15, -s * 0.3, -s * 0.5, -s * 0.9);
    // Top cleft curve
    ctx.bezierCurveTo(-s * 0.25, -s * 1.1, 0, -s * 0.85, 0, -s * 0.85);
    ctx.bezierCurveTo(0, -s * 0.85, s * 0.25, -s * 1.1, s * 0.5, -s * 0.9);
    // Right petal flank
    ctx.bezierCurveTo(s * 1.15, -s * 0.3, s * 0.9, s * 0.5, 0, s);
    ctx.closePath();
    ctx.fill();

    // Delicate petal vein highlight
    ctx.beginPath();
    ctx.moveTo(0, s * 0.85);
    ctx.quadraticCurveTo(-s * 0.05, 0, 0, -s * 0.6);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Gently fluctuate breeze
    if (Math.random() < 0.01) {
      this.windTarget = (Math.random() - 0.5) * 0.8;
    }
    this.wind += (this.windTarget - this.wind) * 0.02;

    // Update ambient petals
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.y += p.speedY;
      p.x += p.speedX + this.wind;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      // Wrap around screen
      if (p.y > this.height + 25 || p.x < -30 || p.x > this.width + 30) {
        this.petals[i] = this.createPetal(false);
      }

      this.drawPetal(p);
    }

    // Update burst particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];
      bp.vx *= bp.friction;
      bp.vy = bp.vy * bp.friction + bp.gravity;
      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.rotation += bp.rotationSpeed;
      bp.life -= bp.decay;
      bp.opacity = Math.max(0, bp.life);

      if (bp.life <= 0 || bp.y > this.height + 30) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      this.drawPetal(bp);
    }

    if (this.isRunning) {
      requestAnimationFrame(() => this.update());
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.update();
    }
  }

  stop() {
    this.isRunning = false;
  }
}

// Global instance
window.PetalSystem = PetalSystem;
