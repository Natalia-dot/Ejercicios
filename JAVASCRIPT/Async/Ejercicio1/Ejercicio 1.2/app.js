const getData = async (searchName) =>{
    fetch(`https://api.nationalize.io?name=${searchName}`)
    .then((value) => {
        return value.json()})
    .then((jsonData) => {
        console.log(jsonData)
        let newArray = [];
        newArray.push(jsonData);
        newArray.map((item) => {
            {name : jsonData.name
            count: jsonData.count}
        })
        let div = document.createElement('div');
        div.setAttribute('id', searchName);

        let botonDelete = document.createElement('button')
        botonDelete.setAttribute('id', searchName)
        botonDelete.classList.add()
        botonDelete.innerText = 'Puedes borrarme';

        let paragraph = document.createElement('p');
        paragraph.innerText = newArray[0].name, newArray[0].count;
        div.append(paragraph, botonDelete);
        document.body.appendChild(div)
    }
     )

}

//todo en el input tengo que poner searchName
const addListeners = () => {
const boton = document.getElementById("boton");
boton.addEventListener("click", (e) => {
    let searchName = document.getElementById("input").value.toLowerCase()
    //------------------------------------
let botonDelete = document.getElementById(input)
botonDelete.addEventListener('click', (e) => {
    parent.remove();
})
getData(searchName)
})
}


addListeners()

