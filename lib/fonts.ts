// app/fonts.ts
import localFont from 'next/font/local';

export const SanaSansAltMedium = localFont({
  src: [
    {
      path: '../public/fonts/SanaSansAlt-Medium.ttf',
      weight: '300 900',
      style: 'normal',
    }
  ],
  variable: '--font-sana-sans-medium',
  display: 'swap',
});

export const SanaSansAltMediumItalic = localFont({
  src: [
    {
      path: '../public/fonts/SanaSansAlt-MediumItalic.ttf',
      weight: '300 900',
      style: 'normal',
    }
  ],
  variable: '--font-sana-sans-medium-italic',
  display: 'swap',
});

export const SanaSansAltHeavy = localFont({
  src: [
    {
      path: '../public/fonts/SanaSansAlt-Heavy.ttf',
      // weight: '300 900',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-sana-sans-heavy',
  display: 'swap',
});

export const SanaSansAltBold = localFont({
  src: [
    {
      path: '../public/fonts/SanaSansAlt-Bold.ttf',
      weight: '300 900',
      style: 'normal',
    },
  ],
  variable: '--font-sana-sans-bold',
  display: 'swap',
});

export const SanaSansAltBlack = localFont({
  src: [
    {
      path: '../public/fonts/SanaSansAlt-Black.ttf',
      weight: '300 900',
      style: 'normal',
    },
  ],
  variable: '--font-sana-sans-black',
  display: 'swap',
});

export const SanaSansAltItalic = localFont({
  src: [
    {
      path: '../public/fonts/SanaSansAlt-Italic.ttf',
      weight: '300 900',
      style: 'normal',
    },
  ],
  variable: '--font-sana-sans-italic',
  display: 'swap',
});