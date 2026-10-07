/**
 * ENVELOPE OPENING COVER CONTROLLER
 * Unfolds the invitation cover, plays music, and bursts petals on user tap
 */

class WeddingEnvelopeCover {
  constructor(coverId, sealBtnId, onOpenCallback) {
    this.cover = document.getElementById(coverId);
    this.sealBtn = document.getElementById(sealBtnId);
    this.onOpenCallback = onOpenCallback;
    this.isOpened = false;

    this.init();
  }

  init() {
    if (!this.cover || !this.sealBtn) return;

    // Trigger open on wax seal click or tap
    this.sealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openCover(e);
    });

    // Also allow tapping anywhere on the envelope card
    const envelopeCard = document.querySelector('.envelope-card');
    if (envelopeCard) {
      envelopeCard.addEventListener('click', (e) => {
        if (!this.isOpened) {
          this.openCover(e);
        }
      });
    }
  }

  openCover(event) {
    if (this.isOpened) return;
    this.isOpened = true;

    // Trigger visual seal break animation
    if (this.sealBtn) {
      this.sealBtn.classList.add('breaking-seal');
    }

    // Get click coordinates for particle burst
    const clientX = event.clientX || window.innerWidth / 2;
    const clientY = event.clientY || window.innerHeight / 2;

    // Callback to play audio and trigger petal explosion
    if (typeof this.onOpenCallback === 'function') {
      this.onOpenCallback(clientX, clientY);
    }

    // Fade and scale out the cover overlay
    setTimeout(() => {
      this.cover.classList.add('opened');
      document.body.style.overflow = '';
      
      // Trigger scroll reveal on hero
      const heroEl = document.querySelector('.hero-section');
      if (heroEl) {
        heroEl.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
      }
    }, 450);
  }
}

window.WeddingEnvelopeCover = WeddingEnvelopeCover;
