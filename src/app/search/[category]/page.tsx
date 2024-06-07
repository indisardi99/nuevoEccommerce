import React from "react";
 
const category = ({params} : {params:{category: string}}) => {
    return (
        <div>
            <h1>soy el producto: {params.category}</h1>
        </div>
    )
}
export default category