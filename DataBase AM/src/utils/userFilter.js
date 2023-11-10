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

// const sortUsers = (request) => {
//   if (request.followers) {
//     return 'followers';
//   } else if (request.favSongs) {
//     return 'favSongs';
//   } else if (request.favAlbums) {
//     return 'favAlbums';
//   }
// };

// const sortSongs = (request) => { DEPRECATEDD
//   if (request.sort) {
//     return 'likes';
//   } else if (request.likesInAlbum) {
//     return 'likesInAlbum';
//   } else if (request.length) {
//     return 'length';
//   }
// };

// const sortAlbums = (request) => {
//   if (request.likes) {
//     return 'likes';
//   } else if (request.length) {
//     return 'length';
//   } else if (request.year) {
//     return 'year';
//   }
// };

module.exports = {
  filterUsers,
  filterSongs,
  filterAlbums,
  // sortUsers,
  // sortAlbums,
  // sortSongs,
};
