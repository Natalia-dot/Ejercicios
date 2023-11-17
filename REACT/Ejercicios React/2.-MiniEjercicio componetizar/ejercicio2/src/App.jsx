import "./App.css";
import { dataArray } from "./data/dataArray";
import { Paragraph } from "./components";

export const App = () => {
  return (
    <>
      {dataArray.map((item) => {
        console.log(item)
        return (
        <Paragraph id={item} key={JSON.stringify(item)}>{item}</Paragraph>);
      })}
    </>
  );
}