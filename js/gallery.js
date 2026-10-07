/**
 * PHOTO GALLERY & LIGHTBOX
 * Touch swipe, keyboard navigation, and full-screen view for couple photos
 */

class WeddingGallery {
  constructor(images) {
    this.images = images || [];
    this.currentIndex = 0;
    this.modal = document.getElementById('lightboxModal');
    this.imgEl = document.getElementById('lightboxImage');
    this.captionEl = document.getElementById('lightboxCaption');
    this.closeBtn = document.getElementById('lightboxClose');
    this.prevBtn = document.getElementById('lightboxPrev');
    this.nextBtn = document.getElementById('lightboxNext');

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (!this.modal) return;

    // Attach click events to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.open(index);
      });
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Modal background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Prev / Next buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Mobile touch swipe gestures
    this.modal.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.modal.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.next(); // swiped left
      } else {
        this.prev(); // swiped right
      }
    }
  }

  open(index) {
    if (!this.images || this.images.length === 0) return;
    this.currentIndex = index >= 0 && index < this.images.length ? index : 0;
    this.updateImage();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    const item = this.images[this.currentIndex];
    if (!item) return;

    this.imgEl.style.opacity = '0.3';
    this.imgEl.src = item.src;
    this.imgEl.alt = item.alt || 'Tinson & Taniya';

    this.imgEl.onload = () => {
      this.imgEl.style.opacity = '1';
    };

    if (this.captionEl) {
      this.captionEl.textContent = item.caption || '';
    }
  }
}

window.WeddingGallery = WeddingGallery;
