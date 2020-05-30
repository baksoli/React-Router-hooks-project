import React,{useState,useEffect} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

/*
    const [recipe,setRecipe]=useState([]);
    ==
    class Recipe
    {
        private String[] recipe;
        public void setRecipe(String[] recipe){
            this.recipe=recipe;
        }
    }
 */
export default function Recipe(){
    const [recipe,setRecipe]=useState([]);
    const [page,setPage]=useState(1);
    const [total,setTotal]=useState(0);

    // Effect 가 두개 이상일 경우 비동기화 처리를 해야할 필요가 있다.
    // 비동기화 async, await

    // http://localhost:3355/recipe?page=1
    useEffect( ()=>{
        // 서버에서 데이터를 가져올 때 ==> axios
        // 서버 연결 후 데이터를 읽어온 후, setRecipe에 저장
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })

    },[])

    useEffect( ()=>{
        axios.get('http://localhost:3355/recipe_total').then((result)=>{
            setTotal(result.data.total);
        })
    },[])

    // 출력할 데이터 처리 => return 에 전송
    const onPrev=()=>{
        setPage(page>1?page-1:page);
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    }
    const onNext=()=>{
        setPage(page<total?page+1:page);
        axios.get('http://localhost:3355/recipe',{
            params:{
                page:page
            }
        }).then((result)=>{
            setRecipe(result.data);
        })
    }
    // render() -- 화면에 html 출력하는 부분
    const html=recipe.map((m)=>
        <div className="col-md-4">
            <div className="thumbnail">
                <NavLink to={"/recipe_detail/"+m.no}>
                    <img src={m.poster} alt="Lights" style={{"width": "100%"}} />
                </NavLink>
                <div className="caption">
                    <p style={{"fontSize":"8pt"}}>{m.title.length>30?m.title.substring(0,30)+"...":m.title}</p>
                    <sub style={{"color":"grey"}}>{m.chef}</sub>
                </div>
            </div>
        </div>
    )
    return (
        <React.Fragment>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row"}>
                <button className={"btn btn-lg btn-primary"} onClick={onPrev}>이전</button>
                &nbsp;현재 {page} page / 총 {total} pages
                <button className={"btn btn-lg btn-danger"} onClick={onNext}>다음</button>
            </div>
        </React.Fragment>
    )
}
