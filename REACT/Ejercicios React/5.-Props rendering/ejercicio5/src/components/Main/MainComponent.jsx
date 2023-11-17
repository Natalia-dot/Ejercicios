import "./Main.css"

export const MainComponent = ({children}) => {
  return (
    <main>{children}</main>
  )
}
//<!--EX Con children, estas haciendo un destructuring del contenido que hay DENTRO de la etiqueta,
//EX por ejemplo el texto que hubiera dentro de un h1 o en este caso, los elementos que haya
//EX dentro de main (header, paragraph, image...)-->