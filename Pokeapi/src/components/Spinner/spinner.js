import "./spinner.css"


const template = () =>`
<div class="lds-ripple"><div></div><div></div></div>
`

export const printTemplateSpinner = () =>{
    document.querySelector("#spinner").innerHTML = template();
}

export const printTemplateSpinner2 = () =>{
    document.querySelector("#spinnerGallery").innerHTML = template();
}