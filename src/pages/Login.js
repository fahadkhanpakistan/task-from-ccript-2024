import { useState } from "react";
import { useLogin } from "../utility-hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="container-login">
      <div className="logo-container">
        <img src="/logo.jpeg" alt="logo" />
      </div>
      <form className="login" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="john_doe@example.co"
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter Password"
        />

        <button disabled={isLoading}>Sign in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
