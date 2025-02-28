import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Button,
  message,
} from "antd";

export default function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  const showModal = (project = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
    form.setFieldsValue(
      project || { name: "", description: "", users: [], status: false }
    );
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Check for duplicate project name (case-insensitive)
      const isDuplicate = projects.some(
        (proj) =>
          proj.name.toLowerCase() === values.name.toLowerCase() &&
          proj.key !== (editingProject?.key || null)
      );

      if (isDuplicate) {
        message.error(
          "Project name already exists! Please use a different name."
        );
        return;
      }

      let updatedProjects;
      if (editingProject) {
        updatedProjects = projects.map((proj) =>
          proj.key === editingProject.key
            ? {
                ...proj,
                ...values,
                users: Array.isArray(values?.users) ? values.users : [],
              }
            : proj
        );
      } else {
        const newProject = {
          ...values,
          key: Date.now(),
          users: Array.isArray(values.users) ? values.users : [],
        };

        updatedProjects = [...projects, newProject];
      }

      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      message.success(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!"
      );
      setIsModalOpen(false);
      form.resetFields();
      setEditingProject(null);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingProject(null);
  };

  const handleDelete = (key) => {
    const updatedProjects = projects.filter((proj) => proj.key !== key);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    message.success("Project deleted successfully!");
  };

  const columns = [
    { title: "Project Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Assigned Users",
      dataIndex: "users",
      key: "users",
      render: (assignedUsers) => {
        if (!Array.isArray(assignedUsers) || assignedUsers.length === 0)
          return "No Users";
        return assignedUsers
          .map((userEmail) => {
            const user = users.find((u) => u.email === userEmail);
            return user ? user.name : userEmail; // Show name if found, else show email
          })
          .join(", ");
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)} type="primary">
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.key)}
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
      <Button
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Project
      </Button>
      <Table rowKey="key" columns={columns} dataSource={projects} />

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[
              { required: true, message: "Please enter project name!" },
              {
                min: 5,
                message: "Project name must be at least 5 characters long!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="users"
            label="Assign Users"
            rules={[
              { required: true, message: "Please select at least one user!" },
            ]}
          >
            <Select mode="multiple" placeholder="Select users">
              {users.map((user) => (
                <Select.Option key={user.email} value={user.email}>
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
