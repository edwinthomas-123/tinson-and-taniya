/**
 * WEDDING COUNTDOWN TIMER
 * Accurately counts down to the wedding ceremony timestamp
 */

class WeddingCountdown {
  constructor(targetDateString) {
    this.targetDate = new Date(targetDateString).getTime();
    this.daysEl = document.getElementById('countDays');
    this.hoursEl = document.getElementById('countHours');
    this.minsEl = document.getElementById('countMinutes');
    this.secsEl = document.getElementById('countSeconds');
    this.noteEl = document.getElementById('countdownNote');

    this.timerId = null;
    this.init();
  }

  init() {
    this.update();
    this.timerId = setInterval(() => this.update(), 1000);
  }

  pad(num) {
    return num < 10 ? '0' + num : num;
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      if (this.daysEl) this.daysEl.textContent = '00';
      if (this.hoursEl) this.hoursEl.textContent = '00';
      if (this.minsEl) this.minsEl.textContent = '00';
      if (this.secsEl) this.secsEl.textContent = '00';
      if (this.noteEl) {
        this.noteEl.textContent = '🥂 Today is the Auspicious Day! Celebrating Tinson & Taniya! 🥂';
      }
      if (this.timerId) clearInterval(this.timerId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = this.pad(days);
    if (this.hoursEl) this.hoursEl.textContent = this.pad(hours);
    if (this.minsEl) this.minsEl.textContent = this.pad(minutes);
    if (this.secsEl) this.secsEl.textContent = this.pad(seconds);
  }
}

window.WeddingCountdown = WeddingCountdown;
