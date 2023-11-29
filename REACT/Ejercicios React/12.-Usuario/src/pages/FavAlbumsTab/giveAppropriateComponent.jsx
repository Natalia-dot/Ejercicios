import { AlbumComponent } from "./AlbumComponent"
import { SongComponent } from "./SongComponent"


export const giveAppropriateComponent = (value) => {
    switch (value) {
        case "songs":
            console.log(value)
            return( <SongComponent />
            
            )
        case "albums":
            console.log(value)

            return( <AlbumComponent/>)
    
        default:
            break;
    }
}
