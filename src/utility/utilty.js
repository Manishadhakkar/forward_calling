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