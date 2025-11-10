'use client';

import { useEffect } from 'react';

export default function DarkReaderClient() {
  useEffect(() => {
    import('darkreader').then(DarkReader => {
      DarkReader.auto({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    });
    return () => {
      import('darkreader').then(DarkReader => DarkReader.disable());
    };
  }, []);

  return null;
}
