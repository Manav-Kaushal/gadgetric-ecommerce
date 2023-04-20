export const classNames = (...classNames: any[]): string => {
  return classNames.filter(Boolean).join(" ");
};

export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas && canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL as string;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file: string | Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file as Blob);
  });

export const getContrastingColor = (color: string) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};

export function hexToRgb(hex: string) {
  // Convert the hex color string to a number
  const hexNumber = parseInt(hex.replace("#", ""), 16);

  // Extract the red, green, and blue components from the number
  const red = (hexNumber >> 16) & 255;
  const green = (hexNumber >> 8) & 255;
  const blue = hexNumber & 255;

  // Return the RGB color as an object with red, green, and blue properties
  return { red, green, blue };
}
