import "./App.css";
import { useState } from "react";
import Dettagli from "./Dettagli.js";
import Signup from "./Signup.js";
import Login from "./Login.js";

function App() {
  const [showSignup, setShowSignup] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(null);

  function loginClick() {
      setShowSignup(false);
      setShowLogin(true);
  }
  function signupClick() {
      setShowLogin(false);
      setShowSignup(true);
  }


  return (
    <div className="App">
      {token != null && token != "" ? (
        <Dettagli props={{ token }} />
      ) : (
        <div>
          {showSignup && <Signup/>}
          {!showSignup && <button onClick={signupClick}>Signup</button>}
          {showLogin && <Login props={{ setToken }} />}
          {!showLogin && <button onClick={loginClick}>Loggin</button>}
        </div>
      )}
    </div>
  );
}

export default App;
