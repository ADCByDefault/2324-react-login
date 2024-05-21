import { useState } from "react";

export default function Dettagli({ props }) {
  const [loginUsername, setLoginUsername] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);

  const [info, setInfo] = useState("");

  const setToken = props.setToken;

  async function login() {
    setInfo("");
    if (loginUsername == "" || loginUsername == null) {
      setInfo("inserici username");
      return;
    }
    if (loginPassword == "" || loginPassword == null) {
      setInfo("inserici password");
      return;
    }
    setInfo("loading...");
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });
    const json = await response.json();
    if (json.token != "") {
      setToken(json.token);
      setInfo("Hai fatto il login");
    } else {
      setToken(null);
      setInfo("Errore nel login");
    }
  }
  return (
    <div className="login-container">
      <div>
        <label>Username: </label>
        <input
          onChange={(e) => {
            setLoginUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
      </div>
      <div>
      <button onClick={login}>Login</button>
      </div>
      <div>{info}</div>
    </div>
  );
}
