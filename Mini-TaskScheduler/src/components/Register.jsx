import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === values.email)) {
      message.error("Email already exists!");
      return;
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    message.success("Registration successful!");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto" }}>
      <h2>Register</h2>
      <Form onFinish={handleRegister}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Enter name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Enter email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
