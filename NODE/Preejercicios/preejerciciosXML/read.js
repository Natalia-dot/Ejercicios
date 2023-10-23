const {XMLBuilder, XMLParser} = require ("fast-xml-parser");
const fs = require ('fs');

const miParser = new XMLParser;

fs.readFile('alumnoss.xml', 'utf-8', (error, data) =>{
    let miParseado
    error ? console.log(error) : (miParseado = miParser.parse(data));

const { alumnosRaiz } = miParseado;
console.log(alumnosRaiz)
})

// [
//     { name: 'Rodri', age: 43, job: 'dev' },
//     { name: 'Laura', age: 37, job: 'libreria' },
//     { name: 'Antonio', age: 33, job: 'dev' }
//   ]