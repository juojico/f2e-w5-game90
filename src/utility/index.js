const range = (num, max, min) => {
  if (!num) {
    return 0;
  }
  if (num > max) {
    return max;
  }
  if (min && num < min) {
    return min;
  }
  return num;
};

export { range };
