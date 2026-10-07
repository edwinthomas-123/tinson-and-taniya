/**
 * MAIN WEDDING APPLICATION CONTROLLER
 * Connects configuration, animations, calendar generation, and social sharing
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.WEDDING_CONFIG || {};

  // 1. Initialize Petal Physics System
  const petals = new PetalSystem('petalCanvas');
  window.petalEffect = petals;

  // 2. Initialize Background Audio Player
  const audioSrc = config.media?.music?.src || 'assets/music/wedding-melody.mp3';
  const audioPlayer = new WeddingAudioPlayer(audioSrc);
  window.audioPlayer = audioPlayer;

  // 3. Initialize Opening Envelope Cover
  const envelope = new WeddingEnvelopeCover('coverOverlay', 'waxSealBtn', (x, y) => {
    // Play music when guest unlocks the invitation
    audioPlayer.play();
    // Burst rose petals & gold dust
    petals.burst(x, y, 65);
  });
  window.envelopeCover = envelope;

  // 4. Initialize Scratch-to-Reveal Card
  const scratchCard = new ScratchCard('scratchCanvas', 'scratchCardContainer', (cx, cy) => {
    // Burst celebratory petals upon card reveal
    petals.burst(cx, cy, 70);
  });
  window.scratchCard = scratchCard;

  // Fallback reveal button
  const fallbackBtn = document.getElementById('scratchFallbackBtn');
  if (fallbackBtn) {
    fallbackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const rect = fallbackBtn.getBoundingClientRect();
      scratchCard.revealCompletely();
      petals.burst(rect.left + rect.width / 2, rect.top, 50);
    });
  }

  // 5. Initialize Live Countdown
  const targetDate = config.dates?.wedding?.targetTimestamp || '2026-10-19T10:30:00+05:30';
  new WeddingCountdown(targetDate);

  // 6. Initialize Lightbox Gallery
  new WeddingGallery(config.media?.gallery || []);

  // 7. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 8. Add to Calendar (Google Calendar & iCal / .ics)
  setupCalendarIntegration(config);

  // 9. WhatsApp Sharing
  setupWhatsAppSharing(config);

  // 10. Generate ambient twinkling stars in cover
  generateCoverStars();
});

/**
 * Generates ambient twinkling stars in cover background
 */
function generateCoverStars() {
  const container = document.getElementById('coverStars');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    container.appendChild(star);
  }
}

/**
 * WhatsApp Sharing Integration
 */
function setupWhatsAppSharing(config) {
  const whatsappBtns = document.querySelectorAll('.btn-share-whatsapp');
  if (!whatsappBtns.length) return;

  const currentUrl = window.location.href;
  const shareText = encodeURIComponent(
    `💍 You're cordially invited to celebrate the Wedding of Tinson & Taniya!\n\n` +
    `🗓 Date: Monday, October 19, 2026 at 10:30 AM\n` +
    `📍 Venue: OLPH Church, Ayathuppady\n` +
    `💒 Reception: Parish Hall, OLPH Church\n\n` +
    `Open our cinematic digital invitation here: ${currentUrl}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  whatsappBtns.forEach(btn => {
    btn.setAttribute('href', whatsappUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * Calendar Integrations (.ics download & Google Calendar link)
 */
function setupCalendarIntegration(config) {
  const gCalBtns = document.querySelectorAll('.btn-add-gcal');
  const icsBtns = document.querySelectorAll('.btn-download-ics');

  const title = encodeURIComponent("Wedding Ceremony: Tinson & Taniya");
  const details = encodeURIComponent(
    "Holy Matrimony of Tinson Esthappan & Taniya George followed by Wedding Reception at Parish Hall, OLPH Church Ayathuppady."
  );
  const location = encodeURIComponent("OLPH Church, Ayathuppady, Kerala");
  
  // October 19, 2026, 10:30 AM - 02:00 PM IST (UTC: 05:00 - 08:30)
  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261019T050000Z/20261019T083000Z&details=${details}&location=${location}`;

  gCalBtns.forEach(btn => {
    btn.setAttribute('href', gCalUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Downloadable iCalendar (.ics) file
  icsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadIcsFile();
    });
  });
}

function downloadIcsFile() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tinson & Taniya Wedding//Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:Wedding of Tinson & Taniya',
    'DESCRIPTION:Holy Matrimony of Tinson Esthappan & Taniya George at OLPH Church\\, Ayathuppady followed by Reception.',
    'LOCATION:OLPH Church\\, Ayathuppady',
    'DTSTART:20261019T050000Z',
    'DTEND:20261019T083000Z',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Tinson & Taniya Wedding Tomorrow!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Tinson-Taniya-Wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
