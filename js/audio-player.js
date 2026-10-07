/**
 * FLOATING BACKGROUND MUSIC CONTROLLER
 * Compliant with iOS Safari and Android Chrome autoplay user-gesture policies
 */

class WeddingAudioPlayer {
  constructor(audioSrc) {
    this.audioSrc = audioSrc;
    this.audio = new Audio(audioSrc);
    this.audio.loop = true;
    this.audio.preload = 'auto';

    this.isPlaying = false;
    this.toggleBtn = document.getElementById('musicToggleBtn');
    this.container = document.getElementById('musicController');
    this.iconEl = document.getElementById('musicIcon');
    this.labelEl = document.getElementById('musicLabel');
    this.waveBars = document.querySelectorAll('.wave-bar');

    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    if (this.container) {
      this.container.addEventListener('click', () => {
        this.toggle();
      });
    }

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI(false);
    });

    this.audio.addEventListener('error', (err) => {
      console.warn('Audio playback error, fallback may be required:', err);
    });
  }

  play() {
    if (!this.audio) return;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.updateUI(true);
        })
        .catch((e) => {
          console.log('Autoplay deferred until user interaction:', e);
        });
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (this.toggleBtn) {
      if (playing) {
        this.toggleBtn.classList.add('music-spinning');
        this.toggleBtn.classList.remove('music-paused');
      } else {
        this.toggleBtn.classList.remove('music-spinning');
        this.toggleBtn.classList.add('music-paused');
      }
    }

    if (this.waveBars) {
      this.waveBars.forEach(bar => {
        bar.style.animationPlayState = playing ? 'running' : 'paused';
        if (!playing) {
          bar.style.height = '4px';
        }
      });
    }

    if (this.labelEl) {
      this.labelEl.textContent = playing ? 'Music: Playing' : 'Music: Paused';
    }
  }
}

window.WeddingAudioPlayer = WeddingAudioPlayer;
