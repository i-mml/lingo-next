export const toEnDigit = (n: string): string =>
  // @ts-ignore
  n.replace(/[٠-٩۰-۹]/g, (n) => 15 & n.charCodeAt(0));

export const generateRandomKey = () => {
  return Math.random().toString(36).substring(2, 15);
};
