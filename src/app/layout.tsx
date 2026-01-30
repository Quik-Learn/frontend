
import type { Metadata, Viewport } from 'next';
import './styles.css';
import Providers from '~/app/providers';
import TawkToChat from '~/lib/components/TawkToChat';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'quik-learn';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '' },
  description: 'We share knowledge with the world',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: '',
    title: 'quik learn',
    description: 'We share knowledge with the world',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" style={{ fontFamily: 'heading' }}>
      <body>
        <Providers>{children}</Providers>
        <TawkToChat />
      </body>
    </html>
  );
};

export default RootLayout;
