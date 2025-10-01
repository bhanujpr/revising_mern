interface PropType{
    placeholder:string;
    type:string;
}

export function TextInput({
    placeholder,
    type
}:PropType){
    return(
        <input 
        type={type}
        style={{
            padding:10,
            margin:10,
            borderColor:"black",
            borderWidth:1,
        }} 
        placeholder={placeholder}/>
    )
}