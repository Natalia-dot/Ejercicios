const nombreEdad = async () => {
    fetch('https://api.agify.io?name=michael')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {console.error(error)});
}
nombreEdad()