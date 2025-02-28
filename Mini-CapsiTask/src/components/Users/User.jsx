import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);
    };

    loadUsers(); // Load users initially
    window.addEventListener("storage", loadUsers);

    return () => {
      window.removeEventListener("storage", loadUsers);
    };
  }, []);

  const confirmDelete = (email) => {
    setUserToDelete(email);
    setDeleteConfirmVisible(true);
  };

  const handleDelete = () => {
    if (!userToDelete) return;
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Check if user is assigned to any project
    const isUserAssigned = storedProjects.some((project) =>
      project.users.includes(userToDelete)
    );

    if (isUserAssigned) {
      message.error("User is assigned to a project and cannot be deleted.");
      setDeleteConfirmVisible(false);
      return;
    }

    // Proceed with deletion if not assigned
    const updatedUsers = users.filter((user) => user.email !== userToDelete);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    message.success("User deleted successfully!");
    setDeleteConfirmVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
    setUserToDelete(null);
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    form.validateFields().then((values) => {
      const emailExists = users.some(
        (user) =>
          user.email === values.email && user.email !== editingUser.email
      );
      if (emailExists) {
        message.error("Email already exists");
        return;
      }

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
            onClick={() => confirmDelete(record.email)}
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
      <h2 className="flex justify-center text-5xl py-2 bg-slate-500 text-white">
        User List
      </h2>
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
            rules={[
              { required: true, message: "Please enter phone number" },
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
        </Form>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={deleteConfirmVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
}
