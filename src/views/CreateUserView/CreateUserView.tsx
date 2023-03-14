import React, { useState } from "react";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import { v4 as uuidv4 } from "uuid"; // importa la libreria per la generazione di UUID v4

export default function UserCreationPage(){
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = async () => {
    const password = uuidv4(); // generates a random password using UUID v4 
    const cognito = new CognitoIdentityServiceProvider(); // creates an instance of the AWS Cognito service
    const params = {
      UserPoolId: "your-pool-user-id",
      Username: username,
      TemporaryPassword: password,
      UserAttributes: [
        {
          Name: "name",
          Value: name,
        },
        {
          Name: "family_name",
          Value: surname,
        },
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "custom:role",
          Value: role,
        },
      ],
    };
    await cognito.adminCreateUser(params).promise(); // create user into pool
    // insert here the code to send success or error messages
  };

  return (
    <div>
      <h1>User creation</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateUser}>
          Create user
        </button>
      </form>
    </div>
  );
};