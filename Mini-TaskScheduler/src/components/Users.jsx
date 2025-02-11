import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Tag } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = (values) => {
    const { name, email, mobile } = values;

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      message.error("Email already exists!");
      return;
    }

    const newUser = { name, email, mobile, status: "active" };
    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setIsModalOpen(false);
    form.resetFields();
    message.success("User added successfully!");
  };

  const handleStatusChange = (email, status) => {
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, status } : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add User
      </Button>

      <Table
        dataSource={users}
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Mobile", dataIndex: "mobile", key: "mobile" },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
              <Select
                value={status}
                onChange={(value) => handleStatusChange(record.email, value)}
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            ),
          },
        ]}
        rowKey="email"
      />

      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
