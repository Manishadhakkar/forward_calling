import _ from "lodash";
import moment from "moment";

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

export const concatenateDidNumbers = (data) => {
  const didNumbers = data.map((item) => item.did_number);
  const result = didNumbers.join("-");
  return result;
};

export const convertIvrArray = (inputArray) => {
  const query = [
    "id",
    "campaign_id",
    "destination_id",
    "destination_type",
    "input_digit",
    "ivr_id",
    "parent_id",
    "destination_name",
  ];
  const map = {};
  const result = [];

  inputArray.forEach((item) => {
    const node = {};

    query.forEach((prop) => {
      if (item[prop] !== undefined) {
        node[prop] = item[prop];
      }
    });

    node.children = [];
    map[node.id] = node;

    if (node.parent_id === 0) {
      result.push(node);
    } else {
      const parentNode = map[node.parent_id] || { children: [] };
      parentNode.children.push(node);
      map[node.parent_id] = parentNode;
    }
  });

  return result;
};