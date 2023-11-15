import './App.css'
import { ImageComponent, MainComponent, ParagraphComponent, SubtitleComponent, TitleComponent } from './components'

function App() {

  return (
    <>
  <MainComponent>
    <TitleComponent text={"Mi titulo!!"} />
    <SubtitleComponent text={"Este es mi subtitulo! Pero no hay nada que subtitular..."}/>
    <ImageComponent src={"https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/a/a0/latest/20230110021216/Pikachu_SSB4.png/800px-Pikachu_SSB4.png"} alt={"A Pikachu image"} />
    <ParagraphComponent text="Did you see that? It is a Pikachu. And this is its paragraph!"/>
  </MainComponent>
    </>
  )
}

export default App
