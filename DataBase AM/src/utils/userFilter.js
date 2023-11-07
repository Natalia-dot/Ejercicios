const filterUsers = (request) => {
  if (request.name) {
    return 'name';
  } else if (request.userEmail) {
    return 'userEmail';
  } else if (request.favAlbum) {
    return 'favAlbums';
  }
};

module.exports = { filterUsers };
