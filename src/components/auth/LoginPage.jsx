import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../services/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // From context
  const { setUser, setLoggedIn } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Fake login: allow any username/password
    if (form.username && form.password) {
      // Save fake token just for demo
      localStorage.setItem("access", "dummy-access-token");
      localStorage.setItem("refresh", "dummy-refresh-token");

      setUser(form.username);
      setLoggedIn(true);

      setError("");
      navigate("/dashboard"); // redirect after login
    } else {
      setError("Please enter username and password");
    }
  };

  return (
    <Card className="p-4 mt-4 mx-auto" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100">
          Login
        </Button>
      </Form>
      <div className="mt-3 text-center">
        <span>Don’t have an account? </span>
        <Link to="/signup">Signup</Link>
      </div>
    </Card>
  );
}
