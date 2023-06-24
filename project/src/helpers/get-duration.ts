export const getDuration = (date: number): string => {
  if (date >= 3600) {
    const hours = Math.trunc(date / 3600),
      minutes = Math.trunc((date - hours * 3600) / 60),
      seconds = date - (minutes * 60) - (hours * 3600);
    return `${hours}:${minutes}:${seconds}`;
  } else {
    const minutes = Math.trunc(date / 60),
      seconds = date - (minutes * 60);
    return `- ${minutes}:${seconds}`;
  }
};
