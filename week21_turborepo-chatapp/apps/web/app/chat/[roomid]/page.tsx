import { TextInput } from "@repo/ui/text-input"

export default function(){
    return <div style={{
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column",
        background:"black",
        alignItems:"center"
    }}>
        <div style={{
            height:"75vh",
            width:"90vw",
            background:"gray"
        }}></div>
        <div style={{
            height:"20vh",
            width:"90vw",
            background:"white",
            display:"flex"
        }}>
            
            <TextInput placeholder="Enter msg" type="text"/>
            
        </div>
    </div>
}