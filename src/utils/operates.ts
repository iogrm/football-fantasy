export const xor = (a: boolean, b: boolean) => {
  if (a && b) return false;
  else if (!a && !b) return false;
  else return true;
};
