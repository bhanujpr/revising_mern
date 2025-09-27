export const Input=({
    placeHldr
})=>{
    return <span className="px-2 py-4 rounded-2xl  text-white cursor-pointer bg-inpt ">
        <input type="text" className="text-2xl outline-none" placeholder={`${placeHldr}`} />
        </span>
}