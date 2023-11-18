import { useState } from "react";
import "./App.css";
import { InfoContainer, Input } from "./components";

function App() {
  const [data, setData] = useState({
    name: "",
    favBooks: "",
    favFilms: "",
  });
  return (
    <>
      <Input
        name={data.name}
        favBooks={data.favBooks}
        favFilms={data.favFilms}
        data={data}
        setData={setData}
      />
      <InfoContainer name={data.name} favBooks={data.favBooks} favFilms={data.favFilms}/>
    </>
  );
}

export default App;
