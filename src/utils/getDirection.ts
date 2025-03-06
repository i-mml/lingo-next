export const getDirection = (lang: string) => {
  if (lang === "FA" || lang === "KO" || lang === "AR") return "rtl";
  return "ltr";
};
