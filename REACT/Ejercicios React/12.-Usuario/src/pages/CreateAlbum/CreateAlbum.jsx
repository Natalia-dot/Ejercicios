import { useForm } from "react-hook-form";
import "./CreateAlbum.css";
import { useEffect, useState } from "react";
import { createAlbumService } from "../../services/AlbumService/albums.service";
import { Uploadfile } from "../../components";
import { genres } from "../../data/genresArray";
import { Navigate, useNavigate } from "react-router-dom";
import { useCreateAlbumError } from "../../hooks";

export const CreateAlbum = () => {
  const { register, handleSubmit } = useForm();
  const [isSent, setIsSent] = useState(false);
  const [res, setRes] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [albumCreatedSuccesfully, setAlbumCreatedSuccesfully] = useState(false)
  const navigate = useNavigate();

  const performSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length != 0) {
      const customFormData = {
        ...formData,
        image: inputFile[0],
        genres: selectedGenres.length > 0 && selectedGenres.join(','),
      };
      setIsSent(true);
      setRes(await createAlbumService(customFormData));
      setIsSent(false);
    } else {
      {
        const customFormData = {
          ...formData,
          genres: selectedGenres.length > 0 && selectedGenres.join(',') ,
        };
        setIsSent(true);
        setRes(await createAlbumService(customFormData));
        setIsSent(false);
      }
    }
  };

  useEffect(() => {
    useCreateAlbumError(res, setAlbumCreatedSuccesfully, setRes)
  }, [res])
  

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };
  console.log(selectedGenres);

  if(albumCreatedSuccesfully) {
    return <Navigate to='/dashboard'/>
  }
  return (
    <>
      <div className="formWrap">
        <h1>Create a new Album</h1>
        <form onSubmit={handleSubmit(performSubmit)}>
          <div className="userContainer formGroup">
            <label htmlFor="customInput" className="customPlaceholder">
              Album Name (required)
            </label>

            <input
              className="inputUser"
              type="text"
              id="albumName"
              name="albumName"
              autoComplete="false"
              {...register("albumName", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Album Length in Minutes
            </label>
            <input
              className="inputUser"
              type="number"
              id="albumLength"
              name="albumLength"
              autoComplete="false"
              {...register("albumLength", { required: false })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Release year (required)
            </label>
            <input
              className="inputUser"
              type="number"
              id="year"
              name="year"
              autoComplete="false"
              {...register("year", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Artists, separated by commas please. (required)
            </label>
            <input
              className="inputUser"
              type="text"
              id="artist"
              name="artist"
              autoComplete="false"
              {...register("artist", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Producers, separated by commas please.
            </label>
            <input
              className="inputUser"
              type="text"
              id="producers"
              name="producers"
              autoComplete="false"
              {...register("producers", { required: false })}
            />

            {genres.map((genre) => (
              <div key={genre} className="checkboxContainer">
                <input
                  type="checkbox"
                  id={genre}
                  name={genre}
                  value={genre}
                  onChange={handleGenreChange}
                  checked={selectedGenres.includes(genre)}
                />
                <label htmlFor={`genre-${genre}`}>{genre}</label>
              </div>
            ))}

            <Uploadfile />
            <div className="btnContainer">
              <button
                className="btn"
                type="submit"
                disabled={isSent}
                style={{
                  background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)",
                }}
              >
                {isSent ? "Loading..." : "Create Album"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
