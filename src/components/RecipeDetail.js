import React,{useState,useEffect} from "react";
import axios from "axios";
/*
    var a='' => 문자열
    var a=1 => 정수
    var a=[] => 배열 (Array)
    var a={} => object
 */
export default function RecipeDetail(props){
    const {match}=props;
    const [detail,setDetail]=useState({});

    useEffect(()=>{
        axios.get('http://localhost:3355/recipe_detail',{
            params:{
                no:match.params.no
            }
        }).then((result)=>{
            setDetail(result.data);
        })
    },[]);

    const food=String(detail.foodmake)
    // 문자열 변환
    const ff=food.split('\^');
    // split => 구분 문자별로 => 배열
    // split => 정규식 ^(시작문자), $(끝문자)
    // 정규식으로 사용하는 문자로 인식하게 되므로 문자 ^를 구분하여 자를땐 \^ \$ 처럼 역슬래시를 붙어야한다.
    const data=ff.map((m)=>
        <li>{m}</li>
    )

    return (
        <div className={"row"} style={{"margin":"0px auto","width":"900px"}}>
            <table className={"table"}>
                <tbody>
                    <tr>
                        <td colSpan={"3"}>
                            <img src={detail.poster} width={"50%"} height={"350"}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            <h3>{detail.title}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            {detail.content}
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"}><img src={"/inwon.png"}/></td>
                        <td className={"text-center"}><img src={"/time.png"}/></td>
                        <td className={"text-center"}><img src={"/who.png"}/></td>
                    </tr>
                    <tr>
                        <td className={"text-center"}>{detail.info1}</td>
                        <td className={"text-center"}>{detail.info2}</td>
                        <td className={"text-center"}>{detail.info3}</td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            <h3>요리방법</h3>
                            <ul>
                                {data}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            <table className={"table"}>
                                <tr>
                                    <td rowSpan={"2"} width={"30%"}>
                                        <img src={detail.chef_poster} className={"img-circle"} width={"50"} height={"50"}/>
                                    </td>
                                    <td>{detail.chef}</td>
                                </tr>
                                <tr>
                                    <td>{detail.chef_profile}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}