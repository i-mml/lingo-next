export const onlyNumberInput = (input: string) => {
  const regex = /^[0-9]*$/;
  if (!regex.test(input)) return false;
  return true;
};
