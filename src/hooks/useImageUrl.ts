import { useEffect, useState } from 'react';

// hook personalizado que transforma um array de bytes em uma URL de imagem
export function useImageUrl(imageData?: number[] | Uint8Array, enabled: boolean = true) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Efeito colateral que reage à mudança de imageData ou enabled
  useEffect(() => {
    if (enabled && imageData) {
      // Garante que imageData seja do tipo Uint8Array
      const byteArray = new Uint8Array(imageData);

      const blob = new Blob([byteArray], { type: 'image/png' });

      // Gera uma URL temporária do tipo blob:// que pode ser usada em <img src={...}>
      const url = URL.createObjectURL(blob);

      // Salva essa URL no estado para ser usada no componente
      setImageUrl(url);

      // Função de limpeza: libera a URL da memória quando o componente for desmontado
      // ou quando imageData for alterado, evitando vazamentos de memória
      return () => URL.revokeObjectURL(url);
    }
  }, [imageData, enabled]);

  return imageUrl;
}

