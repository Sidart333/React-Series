import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === values.email);

    if (user) {
      localStorage.setItem("loggedInUser", values.email);
      message.success("Login successful!");
      navigate("/");
    } else {
      message.error("User not found! Please register.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto" }}>
      <h2>Login</h2>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Enter email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
