export const toRange = (num, min, max) => {
  if (typeof num !== "number") {
    return 0;
  }
  if (num > max) {
    return max;
  }
  if (num < min) {
    return min;
  }
  return num;
};

export const inRange = (num, min, max) => {
  if (typeof num !== "number") {
    return false;
  }
  if (num >= min && num <= max) {
    return true;
  }
  return false;
};
