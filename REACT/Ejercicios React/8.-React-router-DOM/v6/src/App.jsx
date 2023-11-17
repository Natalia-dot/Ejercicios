import "./App.css";
import { Footer, Header, Main } from "./components";
import { Outlet } from "react-router-dom";
//import { listCharacter } from "./data/characters.data";

const App = () => {
  return (
  <>
  <Header />
  <Main>
    <Outlet/>
  </Main>   
  <Footer />
  </>
  )
};
export default App;
