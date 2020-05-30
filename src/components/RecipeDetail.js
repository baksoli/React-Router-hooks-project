import React from "react";

export default function RecipeDetail(props){
    return (
        <div><h1>레시피 상세보기 : {props.match.params.no}</h1></div>
    )
}