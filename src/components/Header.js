import React from "react";
import {NavLink} from "react-router-dom";

// render()
export default function Header(){
    /*
        to={"/"}
        http://localhost:3000/
        http://localhost:3000/recipe
        <a> 태그는 새로고침 개념으로 깜빡거리므로
        <NavLink>, <Link> 태그를 사용하여 불필요한 깜빡임을 줄인다.

     */
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <NavLink className="navbar-brand" to={"/"}>SIST Recipe</NavLink>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><NavLink exact to={"/"}>레시피</NavLink></li>
                    <li><NavLink to={"/chef"}>쉐프</NavLink></li>
                    <li><NavLink to={"/news"}>레시피뉴스</NavLink></li>
                    <li><NavLink to={"/find"}>레시피검색</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
