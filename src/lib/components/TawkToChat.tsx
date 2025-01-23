'use client';

import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    // Add Tawk.to script
    var Tawk_API: any = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];

    s1.async = true;
    s1.src = 'https://embed.tawk.to/6791f8ed825083258e09bf44/1ii938oob';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    s0.parentNode?.insertBefore(s1, s0);

    // Cleanup
    return () => {
      s1.remove();
    };
  }, []);

  return null;
};

export default TawkToChat;
