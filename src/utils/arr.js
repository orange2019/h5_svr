class ArrUtils {
  moveLeft(list) {
    let newList = [];
    for (let index = 0; index < list.length; index++) {
      if (index == list.length - 1) {
        newList[index] = list[0];
      } else {
        newList[index] = list[index + 1];
      }
    }
    return newList
  }

  moveRight(list) {
    let newList = [];
    for (let index = 0; index < list.length; index++) {
      if (index == 0) {
        newList[index] = list[list.length - 1];
      } else {
        newList[index] = list[index - 1];
      }
    }
    return newList
  }
}

export default new ArrUtils