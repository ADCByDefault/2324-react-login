import { useState, useEffect } from "react";

export default function Dettagli({props}) {
    const [token, setToken] = useState(props.token);
    console.log(props)
    const [info, setInfo] = useState("loading...");
    async function getData(){
        setInfo("Loading...");
        const response = await fetch("http://localhost:8080/user/" + token);
        const json = await response.json();
        console.log(json);
        setInfo(<div>
                <p>id : {json.id}</p>
                <p>username : {json.username}</p>
                <p>email : {json.email}</p>
                <p>token : {json.token}</p>
                <p>reg_date : {json.reg_date}</p>
            </div>
            );
    }
    useEffect(()=>{
        getData();
    },[]);
    return (<div>
        {info}
    </div>);
}