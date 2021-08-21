const ASCII_START = 65;

export const convertColumnTitle = position => {
  if(position <= 26) {
    return String.fromCharCode(ASCII_START - 1 + position ); // 64 + 1 = A
  }
  const initialString = convertColumnTitle(position / 26);
  const endingAlphabet = convertColumnTitle(position % 26);
  return initialString + endingAlphabet
}

export const compareObjectEntryAsc = (arr1, arr2) => {
  const a = String(arr1[1]).toLowerCase();
  const b = String(arr2[1]).toLowerCase();
  if (a < b) {
      return -1;
  } else if (a > b) {
      return 1;
  } else {
      return 0;
  }
}

export const compareObjectEntryDesc = (arr1, arr2) => {
  const a = String(arr1[1]).toLowerCase();
  const b = String(arr2[1]).toLowerCase();
  if (a < b) {
      return 1;
  } else if (a > b) {
      return -1;
  } else {
      return 0;
  }
}