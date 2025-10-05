export default function InputComponent({type,text,placeholder,reference}:{
    type:string;
    text:string;
    placeholder:string;
    reference:any
}){
    return(
        <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {text}
              </label>
              <input
                type={type}
                ref={reference}
                className="w-full border text-gray-800 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder={placeholder}
                required
              />
            </div>
    )
}