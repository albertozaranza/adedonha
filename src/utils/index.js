export const formatNumber = number => `0${number}`.slice(-2);

export const getRemaining = time => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};
