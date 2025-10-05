export default function Button({type,text}:{
    type:any;
    text:string;
}){
    return(
         <button
              type={type}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                {text}
            </button>
    )
}