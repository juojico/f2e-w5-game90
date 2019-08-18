//數字限制在範圍內
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

//判斷數字是否在範圍內
export const isInRange = (num, min, max) => {
  if (typeof num !== "number") {
    return false;
  }
  if (num >= min && num <= max) {
    return true;
  }
  return false;
};

//百分比
export const toPercent = (num, total) => {
  return ((num / total) * 100).toFixed(1);
};

//範圍內隨機數字
export const ranNum = (max, min = 0) => {
  return Math.round(Math.random() * (max - min)) + min;
};

//隨機抽取陣列中一項
export const ranArr = arr => {
  if (Array.isArray(arr)) {
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
  } else {
    return arr;
  }
};

//產生物件列表
export const generateList = (arr, amount = 0, totalTime = 1, maxTop = 400) => {
  if (Array.isArray(arr)) {
    const list = [];
    for (let i = 1; i <= amount; i++) {
      const thisObs = ranArr(arr);
      const top = Math.round(Math.random() * maxTop);
      const space = Math.round(totalTime / (amount + 1));
      list.push({
        id: i * space + thisObs + top,
        name: thisObs,
        game_time: i * space,
        top: top
      });
    }
    return list;
  } else {
    return arr;
  }
};

//更新敵人位置列表
export const allBossPos = arr => {
  const list = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i].forEach(item => {
      if (item.name !== "evilHand") {
        list.push(item.game_time + i * 30);
      }
    });
  }
  return list;
};
