function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const generateConfirmationCode = () => {
  return getRndInteger(10000, 99999);
};
