const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Album = require("../models/Album.model");
const Song = require("../models/Song.model");


const createAlbum = async(req, res, next) =>{
    let catchImage = req.file?.path;                 
    try {
        await Album.syncIndexes();                  
        const newAlbum = new Album(req.body);   
        if (req.file){                          
            newAlbum.image = catchImage;          
        }   else newAlbum.image = "https://res.cloudinary.com/drbssyzr7/image/upload/v1699118903/NODE_project/default-album-art_ne6z69.png";

        const savedAlbum = await newAlbum.save(); 

        if (savedAlbum) {                          
            return res.status(200).json(savedAlbum);  
        }   else return res.status(404).json("Album was not saved. Please retry.")   

    } catch (error) {
        req.file?.path && deleteImgCloudinary(catchImage);
        next(error);
        return (
            res.status(404).json({
                message: "Error in album creation.",
                error: error,}) 
                && next(error)
        );
    };
};

const albumById = async (req, res, next) => {
    try {                                                  
      const { id } = req.params;
      const albumById = await Album.findById(id);
      if (albumById) {
        return res.status(200).json(albumById);
      } else {
        return res.status(404).json("That Album isn't in the database yet.");
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  };


  const getAll = async (req, res, next) => {
    try{
      const allAlbums = await Album.find();
      if (allAlbums.length > 0) {
        return res.status(200).json(allAlbums);
      } else {
        return res.status(404).json("No Albums in the database.");
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error while searching for all Albums.",
        message: error.message,
      });
    }
  };

  const albumByName = async (req, res, next) => {
    try {
      let { name } = req.body;
      name = name.toLowerCase(); 
      
      const albumByName = await Album.find({ albumName : name });
      if (albumByName.length > 0) {
        return res.status(200).json(albumByName);
      } else {
        return res.status(404).json("That Album's name doesn't show up in our database.");
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error in the get by name Album catch.",
        message: error.message,
      });
    }
  };

  const addAndRemoveManySongsById = async (req,res,next) =>{        
    try {
        const { id } = req.params;                      
        const { songs } = req.body;    

        const albumById = await Album.findById(id);           
        if (albumById) {                                        
            const requestSongsInArray1 = songs.split(",");
            const requestSongsInArray = [];
            requestSongsInArray1.forEach(song => {
                song = song.toLowerCase().trim();
                requestSongsInArray.push(song)
            });

            Promise.all(
                requestSongsInArray.map(async (singleSong, index) => {
                    if (albumById.songs.includes(singleSong)){      
                        try {  
                            await Album.findByIdAndUpdate(id, { 
                            $pull: {songs: singleSong}
                        });
                        try {
                            await Song.findByIdAndUpdate(singleSong, { 
                                $pull: {album : id}
                            })
                        } catch (error) {
                            return res.status(404).json({error: error.message, update:"Error pulling album"}) && next(error)
                        }
                    } catch (error) {
                        return res.status(404).json({error: error.message, update:"Error pulling songs"}) && next(error)
                    }
                 } else { 
                    try {  
                        await 
                        Album.findByIdAndUpdate(id, {  
                        $push: {songs: singleSong}
                    });
                    try {
                        await Song.findByIdAndUpdate(singleSong, {
                            $push: {album : id}
                        })
                    } catch (error) {
                        return res.status(404).json({error: error.message, update:"Error pushing album"}) && next(error)
                    }
                } catch (error) {
                    return res.status(404).json({error: error.message, update:"Error pushing songs"}) && next(error)
                }


                 }
                })
            ).then(async ()=>  {
                return res.status(200).json({
                  dataUpdate: await Album.findById(id).populate('songs'),
                });
              });
        } else {
            return res.status(404).json("El album no se ha encontrado")
        }
    } catch (error) {
        return (res.status(404)
        .json({error:error.message, message: "Error in the Controller Catch"}) && next (error));
    }
}



module.exports = { createAlbum, albumById, albumByName, getAll, addAndRemoveManySongsById };