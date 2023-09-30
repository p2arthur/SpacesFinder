import { useState } from "react";
import { AuthService } from "../services/AuthService";
import { Navigate, useNavigate } from "react-router-dom";

interface LoginProps {
  authService: AuthService;
  setUserNameCallback: (userName: string) => void;
}

const LoginComponent = ({ authService, setUserNameCallback }: LoginProps) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName && password) {
      const loginResponse = await authService.login(userName, password);
      const userName2 = authService.getUserName();

      if (userName2) {
        setUserNameCallback(userName2);
      }

      if (loginResponse) {
        setLoginSuccess(true);
        navigate("/profile");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } else {
      setErrorMessage("Username and password are required");
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            onChange={(event) => setPassword(event.target.value)}
          />
          {errorMessage && <div>{errorMessage}</div>}
          <div className="card-actions justify-end">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
