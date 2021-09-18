export const checkObjEmpty = (obj) => {
  return !(obj && Object.keys(obj).length === 0 && obj.constructor === Object);
};

export const friendlyStringMoney = (s) => {
  if (typeof s === "string") {
    return [...s]
      .reverse()
      .join("")
      .match(/.{1,3}/g)
      .join(".")
      .split("")
      .reverse()
      .join("");
  } else {
    let numberToString = s.toString()
    return [...numberToString]
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .join(".")
    .split("")
    .reverse()
    .join("");
  }
};

export const flattenNestedObjects = (obj) => {
  console.log("OBJ: ", obj);
  return Object.assign(
    {}, 
    ...function _flatten(o) { 
      return [].concat(...Object.keys(o)
        .map(k => 
          typeof o[k] === Object ?
            _flatten(o[k]) : 
            ({[k]: o[k]})
        )
      );
    }(obj)
  )
}

export const getArrayObjectName = (obj) => {
  const arr = []
  for (const property in obj) {
    arr.push(obj[property].name)
  }
  return arr
}

