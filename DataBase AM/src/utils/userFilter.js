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
  } else if (request.singleGenre) {
    return 'singleGenre';
  } else if (request.pace) {
    return 'pace';
  } else if (request.year) {
    return 'year';
  } else if (request.producers) {
    return 'producers';
  } else if (request.length) {
    return 'length';
  }
  // } else if (request.producers) {
  //   return 'producers';
  // } else if (request.likedBy) {
  //   return 'likedBy';
  // }
};

const filterAlbums = (request) => {
  if (request.albumName) {
    return 'albumName';
  } else if (request.genres) {
    return 'genres';
  } else if (request.songs) {
    return 'songs';
  } else if (request.singleGenre) {
    return 'singleGenre';
  } else if (request.year) {
    return 'year';
  } else if (request.producers) {
    return 'producers';
  }
};

module.exports = { filterUsers, filterSongs, filterAlbums };
