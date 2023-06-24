export const getRunTime = (mins: number) => {
  const hours = Math.trunc(mins / 60),
    minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};
