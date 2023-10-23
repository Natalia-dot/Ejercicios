const { error } = require('console');
const fs = require('fs');
let avengersParse = []

fs.readFile('./avengers.JSON',(error, data)=>{
    err? console.log(error) : avengersParse.push(JSON.parse(data));
    printData();
})

const printData = () => {
console.log(avengersParse)
}
