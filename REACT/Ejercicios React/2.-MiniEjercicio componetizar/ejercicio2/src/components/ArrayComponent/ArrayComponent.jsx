export const Paragraph = (props) => {
    console.log(props)
    return (<p {...props}>{props.children}</p>)
}
