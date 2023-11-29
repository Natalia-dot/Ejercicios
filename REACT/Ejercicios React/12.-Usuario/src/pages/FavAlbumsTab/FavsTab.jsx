import { useEffect, useState } from "react";
import { giveAppropriateComponent } from "./giveAppropriateComponent";
import { AlbumComponent } from "./AlbumComponent";
import { SongComponent } from "./SongComponent";



export const FavsTab = () => {
  const [changePage, setChangePage] = useState("albums");
//este estado es para que re-renderice la pagina cuando tocamos el boton. Si no, no cambia nada.
//lo seteo al valor albums para que cuando renderice por primera vez renderice favAlbums. Si pones songs,
//te saldra la pantalla de songs.


//este switch lo que va a hacer es llevarnos a la funcion   
  const switchToGetSpecificCategory = (value) => {
    setChangePage(value)

  };
  return (
    <>
      <button
        value="albums"
        onClick={(e) => {
          switchToGetSpecificCategory(e.target.value);
        }}
      >
        Albums
      </button>

      <button
        value="songs"
        onClick={(e) => {
          switchToGetSpecificCategory(e.target.value);
        }}
      >
        Songs
      </button>
      {changePage && giveAppropriateComponent(changePage)}
    </>
  );
};
