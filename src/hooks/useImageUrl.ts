import { useEffect, useState } from 'react';

export function useImageUrl(imageData?: number[] | Uint8Array, enabled: boolean = true) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (enabled && imageData) {
      const byteArray = new Uint8Array(imageData);
      const blob = new Blob([byteArray], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [imageData, enabled]);

  return imageUrl;
}
