import React, { useState } from "react";
import { Auth } from "aws-amplify";
import User from "../../types/User";

export default function LoginView(){
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    name: "",
    surname: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(user.username, user.password);
      setIsLoading(false);
      setError("");
      // redirect to dashboard
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>LoginView</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        {error && <div>{error}</div>}        
      </form>
    </div>
  );
};
