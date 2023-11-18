import StylesInfoContainer from "./InfoContainer.module.css"

export const InfoContainer = ({name, favBooks, favFilms}) => {
  return (
    <div className={StylesInfoContainer.info}>
        <h1>Hi, my name is {name}</h1>
        <h3>My favourite books are {favBooks}</h3>
        <h3>My favourite films are {favFilms}</h3>

    </div>
  )
}
