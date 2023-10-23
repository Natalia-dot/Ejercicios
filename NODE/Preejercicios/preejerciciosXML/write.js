const { XMLBuilder } = require("fast-xml-parser")
const  fs  = require ("fs");

const alumnos = {
    alumnosRaiz: [
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
  ]
}
  let options = {
    ignoreattributes :false,
    format: true,
    arrayNodeName: "alumnoo"
  }




  const miBuilder = new XMLBuilder (options);
  let output = miBuilder.build(alumnos)
  console.log(output)
    
// {/* <alumnosRaiz>
//   <name>Rodri</name>
//    <age>43</age>
//   <job>dev</job>
// </alumnosRaiz>
// <alumnosRaiz>
//   <name>Laura</name>
//   <age>37</age>
//   <job>libreria</job>
// </alumnosRaiz>
// <alumnosRaiz>
//   <name>Antonio</name>
//   <age>33</age>
//   <job>dev</job>
// </alumnosRaiz> */}
  
  fs.writeFile("alumnoss.xml", output ,()=> console.log("Archivo creado"))