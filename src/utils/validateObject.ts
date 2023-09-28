const validateObject = (body: Object) => {
  let obj = { error: false, key: "" };

  Object.entries(body).forEach((e) => {
    if (e[1].length === 0) {
      obj.error = true;
      obj.key = e[0];
      return;
    }
  });

  return obj;
};

export default validateObject;
