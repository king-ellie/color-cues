export const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (rgb: number[]) => {
    return (
      '#' +
      rgb
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
    );
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const interpolatedRgb = rgb1.map((value, index) =>
    Math.round(value + factor * (rgb2[index] - value))
  );

  return rgbToHex(interpolatedRgb);
};
