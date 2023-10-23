const fs = require('fs')


const avengers = [
    {
        name: 'SpiderMan',
        power: 70
    },
    {
        name: 'Dr.Strange',
        power: 80
    },
    {
        name: 'Hulk',
        power: 110
    }
];

const avengersJSON = JSON.stringify(avengers);

fs.writeFile("avengers.JSON", avengersJSON, ()=> {console.log("Soy un JSON creado")})