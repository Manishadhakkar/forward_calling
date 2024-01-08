import _ from "lodash";

export function removeSpacesAndBraces(inputString) {
  var result = inputString?.replace(/[\s()+]/g, "");
  return result;
}

export function updateParentFromChild(arr1, arr2) {
  const result = [];

  arr1.forEach((item1) => {
    const matchingItem2 = arr2.find((item2) => item1.id === item2.id);

    if (matchingItem2) {
      result.push({
        ...item1,
        name: matchingItem2.name,
        status: matchingItem2.status,
      });
    }
  });

  return result;
}


export function compareArrays(arr1, arr2) {
  return !_.isEqual(arr1, arr2);
}


const authdata = JSON.parse(localStorage.getItem("authorization"));

const isAuthorizedFunc = (funcCode) => {
  if (authdata?.includes(funcCode)) {
    return true;
  } else {
    return false;
  }
};
export { isAuthorizedFunc };


export const convertFormatNumber = (inputNumber, format_type) => {
  const numberString = inputNumber.toString();
  let result = "";
  let patternIndex = 0;
  for (let i = 0; i < format_type.length; i++) {
    const currentChar = format_type[i];
    if (currentChar === "#") {
      result += numberString[patternIndex] || "";
      patternIndex++;
    } else {
      result += currentChar;
    }
  }
  return result;
};