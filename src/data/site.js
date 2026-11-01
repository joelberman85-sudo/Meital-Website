// Contact constants — preserved exactly from app.jsx:69-79.
export const CONTACT = {
  phone: '052-4250242',
  phoneRaw: '972524250242',
  email: 'maytaloz@gmail.com',
  // Maytal's own Facebook page (by page id, so it survives a rename).
  facebookUrl: 'https://www.facebook.com/100057450467949',
  facebookLabel: 'מיטל עוז, M.A — פסיכותרפיסטית',
  whatsappMsg: 'היי מיטל, אשמח להתייעץ איתך',
  location: 'קליניקה במרכז תל אביב · מפגשים פרונטליים ובזום',
  tvUrl: 'https://13tv.co.il/item/special/recommended/health-2/meitaloz-902508561/',
};

export const waHref = `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(CONTACT.whatsappMsg)}`;
export const telHref = `tel:+${CONTACT.phoneRaw}`;

// Baked-in defaults from the deleted tweaks panel (app.jsx:85-90).
export const CTA_TEXT = 'בואו נדבר';
export const OPENING_QUOTE = 'frankl';
export const SHOW_STICKY_DESKTOP_BAR = true;

export const SITE_URL = 'https://maytaloz.com';
