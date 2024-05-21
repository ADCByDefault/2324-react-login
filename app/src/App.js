import "./App.css";
import { useState } from "react";
import Dettagli from "./Dettagli.js";

function App() {
  const [showSignup, setShowSignup] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(null);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confermaPassword, setConfermaPassword] = useState(null);

  const [loginUsername, setLoginUsername] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);

  const [info, setInfo] = useState("");

  async function signup() {
    setInfo("");
    setShowLogin(false);
    if (!showSignup) {
      setShowSignup(true);
      return;
    }
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

  async function login() {
    setInfo("");
    setShowSignup(false);
    if (!showLogin) {
      setShowLogin(true);
      return;
    }
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
    <div className="App">
      {token != null && token != "" ? (
        <Dettagli props={{ token }} />
      ) : (
        <div>
          {showSignup && (
            <div>
              <div>
                <label>Username:</label>
                <input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Conferma Password:</label>
                <input
                  onChange={(e) => {
                    setConfermaPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <button onClick={signup} id="signupButton">
            Signup
          </button>
          <hr />
          {showLogin && (
            <div>
              <div>
                <label>Username:</label>
                <input
                  onChange={(e) => {
                    setLoginUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <button onClick={login} id="loginButton">
            Login
          </button>
          <hr />
          <div id="info">{info}</div>
        </div>
      )}
    </div>
  );
}

export default App;
