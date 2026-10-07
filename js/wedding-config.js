/**
 * WEDDING INVITATION CONFIGURATION
 * ----------------------------------------------------
 * You can easily edit all names, dates, venues, photos,
 * messages, and links in this single file.
 */

const WEDDING_CONFIG = {
  // Couple Information
  groom: {
    fullName: "Tinson Esthappan",
    shortName: "Tinson",
    parents: "Son of Mr. Esthappan M.O. & Mrs. Mary Esthappan",
    father: "Mr. Esthappan M.O.",
    mother: "Mrs. Mary Esthappan",
    role: "The Groom"
  },
  bride: {
    fullName: "Taniya George",
    shortName: "Taniya",
    parents: "Daughter of Mr. George M.A. & Mrs. Gigi George",
    father: "Mr. George M.A.",
    mother: "Mrs. Gigi George",
    role: "The Bride"
  },

  // Key Dates & Timings
  dates: {
    // Engagement
    engagement: {
      title: "Engagement Ceremony",
      dateFormatted: "Monday, October 12, 2026",
      time: "11:30 AM",
      venueName: "OLPH Church",
      venueLocation: "Ayathuppady",
      venueDetails: "Our Lady of Perpetual Help Church, Ayathuppady",
      mapLink: "https://maps.app.goo.gl/BtRUFekoZUrCKaZU7"
    },

    // Holy Matrimony (Main Wedding)
    wedding: {
      title: "Holy Matrimony",
      dateFormatted: "Monday, October 19, 2026",
      day: "Monday",
      dateNumber: "19",
      month: "October",
      year: "2026",
      time: "10:30 AM",
      venueName: "OLPH Church",
      venueLocation: "Ayathuppady",
      venueDetails: "Our Lady of Perpetual Help Church, Ayathuppady",
      // Target ISO timestamp for Countdown Timer (Indian Standard Time +05:30)
      targetTimestamp: "2026-10-19T10:30:00+05:30",
      mapLink: "https://maps.app.goo.gl/BtRUFekoZUrCKaZU7"
    },

    // Reception
    reception: {
      title: "Wedding Reception",
      dateFormatted: "Monday, October 19, 2026",
      time: "Following the Ceremony",
      venueName: "Parish Hall, OLPH Church",
      venueLocation: "Ayathuppady",
      venueDetails: "Parish Hall, OLPH Church, Ayathuppady",
      mapLink: "https://maps.app.goo.gl/BtRUFekoZUrCKaZU7"
    }
  },

  // Emotional & Spiritual Messages
  messages: {
    invitationSubtitle: "Together with their families",
    invitationHeading: "Request the honour of your presence",
    scriptureQuote: "“So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.”",
    scriptureRef: "— Matthew 19:6",
    emotionalNote: "Two souls, two hearts, joined in friendship and united forever in love. With the abundant grace of Almighty God and the loving blessings of our parents, we invite you to celebrate this sacred milestone and bless our union as we begin our lifelong voyage together.",
    withLoveFrom: "With love from TINCY & TINTO",
    scratchPrompt: "Gently scratch the golden seal to reveal the auspicious wedding date ✨",
    scratchSuccess: "Save the Date! We cannot wait to celebrate with you! 🥂"
  },

  // Photos & Media
  media: {
    heroPhoto: "assets/images/photo-2.jpg",      // Couple tender close-up
    introPhoto: "assets/images/photo-1.jpg",     // Walking on beach
    storyPhoto: "assets/images/photo-5.jpg",     // Looking at each other
    scratchBackgroundPhoto: "assets/images/photo-4.jpg", // Ocean wave silhouette
    
    // Lightbox Gallery Photos
    gallery: [
      {
        src: "assets/images/photo-2.jpg",
        caption: "A whisper of forever & sweet beginnings",
        alt: "Tinson & Taniya together"
      },
      {
        src: "assets/images/photo-1.jpg",
        caption: "Walking hand in hand through every season",
        alt: "Tinson & Taniya walking"
      },
      {
        src: "assets/images/photo-3.jpg",
        caption: "Joy in every laughter, solace in every stride",
        alt: "Tinson & Taniya smiling"
      },
      {
        src: "assets/images/photo-4.jpg",
        caption: "Against the serene ocean, anchored in love",
        alt: "Tinson & Taniya by the shore"
      },
      {
        src: "assets/images/photo-5.jpg",
        caption: "Two souls, one timeless promise",
        alt: "Tinson & Taniya tender moment"
      }
    ],

    // Background Audio Track
    music: {
      src: "assets/music/wedding-melody.mp3",
      title: "Canon in D Major",
      artist: "Romantic Wedding Orchestra"
    }
  },

  // WhatsApp & Social Sharing
  sharing: {
    shareTitle: "Wedding Invitation • Tinson & Taniya",
    shareText: "Join us in celebrating the holy matrimony of Tinson & Taniya on Monday, October 19, 2026 at OLPH Church, Ayathuppady. View our digital invitation here: ",
    shareUrl: window.location.href
  }
};

// Export to window
window.WEDDING_CONFIG = WEDDING_CONFIG;
