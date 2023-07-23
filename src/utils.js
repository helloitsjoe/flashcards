export const shuffle = (arr) => {
  const temp = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
};

// TODO: Convert words in JSON and remove this function
export const convertWords = (words) => {
  return Object.entries(words).map(([english, japanese]) => {
    return { english, japanese };
  });
};
