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
                <p>id : <span>{json.id}</span></p>
                <p>username : <span>{json.username}</span></p>
                <p>email : <span>{json.email}</span></p>
                <p>token : <span>{json.token}</span></p>
                <p>reg_date : <span>{json.reg_date}</span></p>
            </div>
            );
    }
    useEffect(()=>{
        getData();
    },[]);
    return (<div className="dettagli-container">
        {info}
    </div>);
}