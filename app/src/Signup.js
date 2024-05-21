import { useState, useEffect } from "react";

export default function Dettagli({ props }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confermaPassword, setConfermaPassword] = useState(null);

  const [info, setInfo] = useState("");

  async function signup() {
    setInfo("");

    if (username == "" || username == null) {
      setInfo("inserici username");
      return;
    }
    if (email == "" || email == null) {
      setInfo("inserici email");
      return;
    }
    if (password == "" || password == null) {
      setInfo("inserici password");
      return;
    }
    if (password !== confermaPassword) {
      setInfo("le due password devono essere uguali");
      return;
    }
    setInfo("loading...");
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    const json = await response.json();
    if (json.status === true) {
      setInfo("registrato");
    } else {
      setInfo("errore nella registrazione");
    }
  }
  return (
    <div className="signup-container">
      <div>
        <label>Username: </label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Conferma Password: </label>
        <input
          onChange={(e) => {
            setConfermaPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={signup}>Signup</button>
      </div>
      <div>{info}</div>
    </div>
  );
}
