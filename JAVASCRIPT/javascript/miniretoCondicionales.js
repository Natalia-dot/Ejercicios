/* 1. Crea una variable llamada **`character`** y asígnale el valor "Legolas"
2. Crea una variable llamada **`race`** y asígnale el valor "Elfo"
3. Crea una variable llamada **`hasRing`** y asígnale el valor **`false`** (Legolas no tiene el Anillo Único)
4. Crea una variable llamada **`isArcher`** y asígnale el valor **`true`** (Legolas es un arquero)
5. Utiliza un condicional **`if`** para evaluar si **`hasRing`** es **`true`**. Si lo es, imprime en la consola el mensaje "Legolas es el portador del Anillo Único"
6. Utiliza **`else if`** para evaluar si **`isArcher`** es **`true`**. Si lo es, imprime en la consola el mensaje "Legolas es un arquero experto"
7. Utiliza  **`else`** para imprimir en la consola el mensaje "Legolas es un guerrero valiente" */

let character = "Legolas"
let race = "Elfo"
hasRing = false
isArcher = true

if (hasRing == true) 
    {console.log(`${character} es el portador del Anillo Unico`)
} else if (isArcher == true) {
    console.log(`${character} es un arquero experto`)
} else console.log("Legolas es un guerrero valiente.")
