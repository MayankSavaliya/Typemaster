export const generateRandomWords = (wordList, count = 25) => {
  return [...wordList]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const checkCharacterMatch = (typed, target, index) => {
  return typed[index] === target[index];
};
