export const Button=({
    disabled,
    children
})=>{
    return<span className={`px-15 py-2 rounded-2xl text-4xl text-white cursor-pointer ${disabled ? "bg-buttn" : "bg-yellow"}`}>{children}</span>
}