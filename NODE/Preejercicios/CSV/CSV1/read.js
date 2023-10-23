import csv from "csv-parser"
import { createReadStream } from "fs";



let nuevo = [];


createReadStream("csvAlumnos.csv")
  .pipe(csv({ separator: ";" }))
  .on("data", (data) => nuevo.push(data))
  .on("end", () => printInfo(nuevo));

  const printInfo = (data) => {
        console.log(data);
  }
