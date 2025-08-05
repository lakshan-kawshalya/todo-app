import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginAPICall,
  savedLoggedInUser,
  storeToken,
} from "../service/AuthService";

const LoginComponent = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const loginObj = { usernameOrEmail, password };

    console.log(loginObj);

    await loginAPICall(usernameOrEmail, password)
      .then((response) => {
        console.log(response.data);

        // const token = "Basic " + window.btoa(usernameOrEmail + ":" + password);
        const token = "Bearer " + response.data.accessToken;
        storeToken(token);

        savedLoggedInUser(usernameOrEmail);

        navigator("/todos");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </button>
            </div>

            <div className="text-center">
              <span>Not registered yet? </span>
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
