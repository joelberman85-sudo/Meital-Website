/** @type {import('tailwindcss').Config} */
// Colours / fonts / shadows lifted verbatim from the inline `tailwind.config`
// that used to sit next to the cdn.tailwindcss.com script in index.html.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage:        '#9DAC97',
        'sage-deep': '#7c8d77',
        'sage-soft': '#c4cfbe',
        'sage-mist': '#E8ECDF',
        cta:         '#AF6340',
        'cta-deep':  '#965334',
        peach:       '#C59974',
        'peach-soft':'#e3cdb6',
        'peach-deep':'#C59974',
        cream:       '#FAF5EE',
        'cream-2':   '#F0ECE2',
        card:        '#FFFDF8',
        sand:        '#F0ECE2',
        line:        '#E2D8CB',
        ink:         '#5C4C3A',
        'ink-soft':  '#766350',
        'ink-mute':  '#9c8b78',
        'ink-strong':'#321F10',
      },
      fontFamily: {
        serif:     ['"Frank Ruhl Libre"','serif'],
        sans:      ['Assistant','"Noto Sans Hebrew"','Heebo','sans-serif'],
        assistant: ['Assistant','system-ui','sans-serif'],
        heebo:     ['Heebo','system-ui','sans-serif'],
      },
      boxShadow: {
        'soft':  '0 8px 30px -14px rgba(79,59,49,0.14)',
        'lift':  '0 22px 60px -26px rgba(79,59,49,0.26)',
      },
    },
  },
  plugins: [],
};
