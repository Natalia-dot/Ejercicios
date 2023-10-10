// Dado el siguiente javascript usa forof para recorrer el array de películas, 
// genera un nuevo array con las categorías de las películas e imprime por consola e
// l array de categorías. Ten en cuenta que las categorías no deberían repetirse. 
// Para filtrar las categorías puedes ayudarte de la función **.includes()**


const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]

const moviecat = []
const iteracion = (arr) => {
    for(let item of arr) {
        for(let cat of item.categories) {
            !moviecat.includes(cat) ? moviecat.push(cat) : null;
        }
    }
    console.log(moviecat)
    return moviecat;
   
}

iteracion(movies)
console.log(moviecat)