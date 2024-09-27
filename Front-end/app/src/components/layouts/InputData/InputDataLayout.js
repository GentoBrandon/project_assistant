export default function ({id,label,type,placeholder}){
    return (
        <div >
            <label htmlFor={id}> {label}</label>
            <input id={id} type={type} placeholder={placeholder}/>
        </div>  
    )
}