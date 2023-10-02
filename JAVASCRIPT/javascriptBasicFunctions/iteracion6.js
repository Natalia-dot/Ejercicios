const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
  ];

  
  function removeDuplicates(arr) {
    //iterar sobre el array con un loop
    //por cada elemento del array, tiene que iterar por el noDuplicates para ver si ya esta
    //si no esta, se introduce en el array
    //si esta, no se introduce
    //lo intento hacer con forof y con includes
    const Duplicates1 = []  
    for (let i = 0; i < arr.length; i++){
    //Duplicates1.includes(arr.i) ? Duplicates1.push(arr[i]) : "" ;
    if (!Duplicates1.includes(arr[i])) {
        Duplicates1.push(arr[i])
    } else {null}
  }
return Duplicates1
    }

    console.log(`Funcion` , removeDuplicates(duplicates))
      
















/* function showPokemon(name) {
    // si name es indefinida o falsa, la establece a 'Magikarp'
    name = name || 'Magikarp';
  }

  console.log(showPokemon())
  function showPokemon(name) {
    if (name === undefined) { // si falta el parámetro
      name = 'Magikarp';
    }
  
    console.log(name);
  }
  
  showPokemon(); // Magikarp

  const saludo = (name = "persona" || undefined ) => {
    console.log(`Hola, ${name}.`)
  }
  saludo (" ")
  //todo ------------Si se pone un string con un espacio, como se lo quito?------------------------

  function showCount(count) {
    // si count es undefined o null, muestra "desconocido"
    console.log(count ?? "hola");
  }
  
  showCount(0); // 0
  showCount(null); // desconocido
  showCount(); // desconocido
*/