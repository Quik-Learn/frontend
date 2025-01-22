import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  brand: {
    100: '#F7F8FA',
    200: '#E9EAF0',
    300: '#8C94A3',
    400: '#1D2026',
    500: '#1D2026',
    600: '#1D2026',
    700: '#1D2026',
    800: '#1D2026',
    900: '#1D2026',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {
  // Force light mode colors
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
