const enumGenres = (genres) => {
  const enumGenres = [
    'indie rock',
    'post-punk revival',
    'garage rock',
    'alternative rock',
    'psychedelic rock',
    'pop rock',
    'experimental',
  ];
  for (let genre of genres) {
    if (!enumGenres.includes(genre)) {
      return { check: false };
    } else return { check: true };
  }
};

const enumPace = (pace) => {
  const enumPace = ['quick', 'medium', 'slow'];
  if (enumPace.includes(pace)) {
    return { check: true, pace };
  } else {
    return {
      check: false,
    };
  }
};

module.exports = { enumGenres, enumPace };
