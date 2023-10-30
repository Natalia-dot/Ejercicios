import './Gallery.css'

const template = () =>`
<section id="galleryContainer"></section>
`
export const printTemplateGallery =() =>{
    document.getElementsByTagName("main").append(template());
}