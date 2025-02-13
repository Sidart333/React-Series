import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    message.success("User deleted successfully!");
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const updatedUsers = users.map((user) =>
        user.email === editingUser.email ? { ...user, ...values } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      message.success("User updated successfully!");
      setIsModalOpen(false);
      setEditingUser(null);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingUser(null);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showEditModal(record)} type="primary">
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.email)}
            danger
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 className="flex justify-center text-5xl py-2 bg-slate-500 text-white">User List</h2>
      <Table columns={columns} dataSource={users} rowKey="email" />

      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleEdit}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email (Uneditable)" name="email">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
