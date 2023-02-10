

const Errors = (props) => {
    let dataItem = props.data;
    const renderError = () => { 
    if((Object.keys(dataItem)).length>0){
            return  Object.keys(dataItem).map((key,index) =>{
                return (
                    <li key={index}>{dataItem[key]}</li>
                )
            }) 
        }}
    return(
       <div>
            <ul>
                {renderError()}
            </ul>
       </div>

    )
}

export default Errors;