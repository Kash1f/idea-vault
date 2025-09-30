import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator.jsx";

//taking two props, route to specify where the form submits (login/register) and method to indicate whether it's for login or registration.
const Form = ({ route, method }) => {
  //storing the username and password the user is entering
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false); //finally block runs regardless of success or failure, this turns off the loading indicator
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <span className="logo-text"> <a href="/">💡IdeaVault</a></span>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>

        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {isLoading && <LoadingIndicator />}
        <button className="form-button">{name}</button>

        {method === "login" ? (
          <p>
            Don't have an Account? <a href="/register">Register</a>
          </p>
        ) : (
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        )}
      </form>
    </>
  );
};

export default Form;
