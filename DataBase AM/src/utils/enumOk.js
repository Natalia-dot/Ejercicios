const enumOk = (gender) => {
  const enumGender = ['hombre', 'mujer', 'otro'];
  if (enumGender.includes(gender)) {
    return { check: true, gender };
  } else {
    return {
      check: false,
    };
  }
};



module.exports = enumOk;

