// Wedding date: 21 December 2026, 11:00 AM IST (UTC+5:30)
export const WEDDING_DATE = new Date('2026-12-21T11:00:00+05:30');

export const WEDDING_INFO = {
  groom: {
    name: 'SUJITH',
    fatherName: 'Samuel John',
    motherName: 'Alice Samuel',
  },
  bride: {
    name: 'PRATIKSHA',
    fatherName: 'Sanjay Bhagat',
    motherName: 'Madhuri Bhagat',
  },
  date: {
    full: '21 December 2026',
    day: 'Monday',
    time: '11:00 AM',
    iso: '2026-12-21T11:00:00+05:30',
  },
  venue: {
    name: 'Ashirwad Celebration',
    city: 'Wardha',
    state: 'Maharashtra',
    country: 'India',
    fullAddress: 'Ashirwad Celebration, Wardha, Maharashtra, India',
    mapsQuery: 'Ashirwad+Celebration+Wardha+Maharashtra+India',
  },
} as const;

export function getTimeRemaining() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

export function shareOnWhatsApp() {
  const text = encodeURIComponent(
    `You are cordially invited to the wedding celebration of Sujith & Pratiksha!\n\n📅 21 December 2026 | 11:00 AM\n📍 Ashirwad Celebration, Wardha, Maharashtra\n\nWe would love to celebrate this special day with you.\n\nWith Love,\nSujith & Pratiksha`
  );
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

export function openGoogleMaps() {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${WEDDING_INFO.venue.mapsQuery}`,
    '_blank'
  );
}

