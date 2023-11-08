const filterUsers = (request) => {
  if (request.name) {
    return 'name';
  } else if (request.userEmail) {
    return 'userEmail';
  } else if (request.favAlbums) {
    return 'favAlbums';
  } else if (request.favSongs) {
    return 'favSongs';
  }
};

const filterSongs = (request) => {
  if (request.songName) {
    return 'songName';
  } else if (request.album) {
    return 'album';
  } else if (request.genres) {
    return 'genres';
  } else if (request.pace) {
    return 'pace';
  } else if (request.producers) {
    return 'producers';
  } else if (request.likedBy) {
    return 'likedBy';
  }
};

module.exports = { filterUsers, filterSongs };
