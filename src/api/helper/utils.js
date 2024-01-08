
export function convert_Object_format_with_all_false(arr) {
  const obj = {};
  arr.forEach((str) => {
    const [commonName, propName] = str.split('.');
    if (!obj[commonName]) {
      obj[commonName] = {};
    }
    obj[commonName][propName] = false;
  });

  return obj
}

export function convert_Object_format_with_all_true(arr) {
  const obj = {};
  arr.forEach((str) => {
    const [commonName, propName] = str.split('.');
    if (!obj[commonName]) {
      obj[commonName] = {};
    }
    obj[commonName][propName] = true;
  });

  return obj
}