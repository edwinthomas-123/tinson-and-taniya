# Cinematic Digital Wedding Invitation • Tinson & Taniya 💍✨

A mobile-first digital wedding invitation website crafted for **Tinson Esthappan & Taniya George**.

---

## 🌟 Key Features

- **Cinematic Opening Envelope Cover**: Tap to unseal the 3D gold wax seal with sound, music, and rose petals.
- **Background Music**: Romantic *Canon in D Major* instrumental with a floating vinyl player and audio wave visualizer.
- **Scratch-to-Reveal Card**: Interactive golden foil scratch card on mobile touch or desktop mouse, bursting with petals upon revealing the wedding date.
- **Live Countdown Timer**: Live countdown clock down to the second for the Holy Matrimony ceremony (October 19, 2026, 10:30 AM).
- **Event Timeline**: Detailed schedule cards for Engagement (Oct 12), Holy Matrimony (Oct 19), and Wedding Reception with Google Maps links.
- **Interactive Lightbox Photo Gallery**: Touch swipe and zoom preview of photoshoot photos.
- **Google Maps Integration**: Direct navigation links for OLPH Church, Ayathuppady.
- **Calendar Reminders**: One-tap "Save to Google Calendar" and downloadable Apple/Outlook `.ics` calendar invitation file.
- **WhatsApp Sharing**: One-tap WhatsApp sharing with customized preview text and link.
- **100% Mobile Optimized**: Tested for iPhone notch safe-areas and Android smartphones.

---

## 📂 Project Structure

```
f:/tinson and taniya wedding/
├── index.html               # Main website structure & Open Graph sharing tags
├── css/
│   ├── style.css            # Luxury mobile-first design, gold gradients & glassmorphism
│   └── animations.css       # Shimmer foil, petal drift, wax seal pulse animations
├── js/
│   ├── wedding-config.js    # ⚙️ ALL editable texts, dates, venues, parents & photos
│   ├── main.js              # Core controller, calendar integration & WhatsApp share
│   ├── envelope.js          # Opening cover unfold & audio trigger
│   ├── scratch-card.js      # Interactive touch/mouse scratch canvas
│   ├── petals.js            # Rose petal and confetti particle system
│   ├── countdown.js         # Real-time countdown timer
│   ├── gallery.js           # Full-screen touch lightbox
│   └── audio-player.js      # Floating music controller
├── assets/
│   ├── images/              # Couple photos (photo-1.jpg to photo-5.jpg)
│   └── music/               # wedding-melody.mp3
└── README.md
```

---

## ✏️ How to Edit Details (Zero Code Knowledge Needed)

All names, dates, times, venues, parents, messages, and photos are configured in **`js/wedding-config.js`**.

To modify anything, open **`js/wedding-config.js`**:

```javascript
const WEDDING_CONFIG = {
  // 1. Change Couple Information
  groom: {
    fullName: "Tinson Esthappan",
    parents: "Son of Mr. Esthappan M.O. & Mrs. Mary Esthappan",
  },
  bride: {
    fullName: "Taniya George",
    parents: "Daughter of Mr. George M.A. & Mrs. Gigi George",
  },

  // 2. Change Dates & Timings
  dates: {
    engagement: {
      dateFormatted: "Monday, October 12, 2026",
      time: "11:30 AM",
      venueName: "OLPH Church, Ayathuppady"
    },
    wedding: {
      dateFormatted: "Monday, October 19, 2026",
      time: "10:30 AM",
      targetTimestamp: "2026-10-19T10:30:00+05:30", // Countdown date
      venueName: "OLPH Church, Ayathuppady"
    }
  },
  
  // 3. Change Music or Photos
  media: {
    music: {
      src: "assets/music/wedding-melody.mp3" // Put your custom mp3 here or paste audio URL
    }
  }
};
```

---

## 🚀 How to Host & Share with Guests for Free

### Option 1: GitHub Pages (Free & Easiest)
1. Push this folder to a GitHub repository (e.g., `tinson-taniya-wedding`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/root`, then click **Save**.
4. Your website will be live at `https://yourusername.github.io/tinson-taniya-wedding/`!

### Option 2: Netlify (Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Simply drag and drop this entire project folder into the browser.
3. You will instantly get a live URL to share on WhatsApp!

### Option 3: Vercel
1. Install Vercel CLI (`npm i -g vercel`) and run `vercel` in this folder, or connect your GitHub repository to Vercel.
