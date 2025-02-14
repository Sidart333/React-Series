import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, Form, Input, message } from "antd";
import bcrypt from "bcryptjs";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Open modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (users.some((user) => user.email === values.email)) {
          message.error("Email already exists");
          return;
        }
        saveUserToLocalStorage(values);
        message.success("User added successfully!");
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  // Close modal
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Save user data to local storage
  const saveUserToLocalStorage = async (user) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Store the user with hashed password
    existingUsers.push({ ...user, password: hashedPassword });

    localStorage.setItem("users", JSON.stringify(existingUsers));
    setUsers(existingUsers);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-slate-300 flex justify-between px-8 py-4 items-center">
      <div>
        <h1 className="text-4xl font-bold">
          <span className="text-blue-600">YOUR</span> LOGO
        </h1>
      </div>
      <header className="max-w-96 w-full">
        <nav>
          <ul className="flex justify-between text-white">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 ${
                    isActive ? "text-white" : "text-gray-700"
                  } duration-200 border-b border-gray-100 hover:bg-gray-50 text-2xl lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 ${
                    isActive ? "text-white" : "text-gray-700"
                  } duration-200 border-b border-gray-100 hover:bg-gray-50 text-2xl lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                }
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 ${
                    isActive ? "text-white" : "text-gray-700"
                  } duration-200 border-b border-gray-100 hover:bg-gray-50 text-2xl lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                }
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 ${
                    isActive ? "text-white" : "text-gray-700"
                  } duration-200 border-b border-gray-100 hover:bg-gray-50 text-2xl lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0`
                }
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className="px-4 py-2 rounded bg-blue-600">
        <button
          className="text-white text-2xl cursor-pointer"
          onClick={showModal}
        >
          Create User
        </button>
      </div>

      {/* Modal for User Details */}
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]{8,16}$/,
                message:
                  "Password must be 8-16 characters long, contain uppercase, lowercase, a number, and one special character (!@#$)",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
