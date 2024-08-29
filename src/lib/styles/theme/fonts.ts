import type { DeepPartial, Theme } from '@chakra-ui/react';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';

export const fontBody = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});
export const InterFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const fonts: DeepPartial<Theme['fonts']> = {
  heading: fontBody.style.fontFamily,
  body: InterFont.style.fontFamily,
};
