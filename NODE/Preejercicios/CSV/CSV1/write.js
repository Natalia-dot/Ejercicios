const fs = require ("fs");


const alumnos = [
    {
      name: "Rodri",
      age: "43",
      job: "dev",
    },
    {
      name: "Laura",
      age: "37",
      job: "libreria",
    },
    {
      name: "Antonio",
      age: "33",
      job: "dev",
    },
  ];

  const createCSV = (data) =>{
    let csv = "";
    let headers = Object.keys(alumnos[0])
    csv += headers.join(";") + "\n";

    data.forEach((row) => {
        headers.forEach((header, index) => {
            if(index > 0) {
                csv += ";";
            }
            csv += row[header];
        })
          csv += "\n";
    }) ; return csv;
  }

  let csvAlumnos = createCSV(alumnos)

  fs.writeFile("csvAlumnos.csv", csvAlumnos, ()=> console.log("Alumnoscsv escrito"))