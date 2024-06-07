import React from "react";
 
const slugProfile = ({params} : {params:{slug: string}}) => {
    return (
        <div>
            <h1>soy la dinamica: {params.slug}</h1>
        </div>
    )
}
export default slugProfile 