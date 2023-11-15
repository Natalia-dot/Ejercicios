
import './App.css'
import { Footer, Header, Image, Main, Paragraph, Subtitle, Title } from './components'

function App() {

  return (
    <>
    <Header>
      <Title text="Este es mi titulo por Children!"/>
    </Header>
    <Main>
    <Subtitle text="Este es mi segundo titulo, pero ahora menos importante."/>
    <Image src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Cosplay_of_Pikachu%2C_Fanime_2015_%2818125488996%29.jpg" alt="Otra imagen de pichacu."/>
    <Paragraph text="Se puede ver que Pichasku es el personaje vasco mas aclamado por el mundo."/>
    <Paragraph text="Ha incrementado el PIB de pais Vasco un 32% en los ultimos 6 anos."/>
    </Main>
    <Footer>
    <Subtitle text= "Ohh... Adios..."/>
    </Footer>
    </>
  )
}

export default App
