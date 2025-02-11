import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Tag } from "antd";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setProjects(storedProjects);
    setUsers(storedUsers);
  }, []);

  const handleAddProject = (values) => {
    const newProject = { ...values, status: "active" };
    const updatedProjects = [...projects, newProject];

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setIsModalOpen(false);
    form.resetFields();
    message.success("Project added successfully!");
  };

  const handleStatusChange = (value, projectName) => {
    const updatedProjects = projects.map((proj) =>
      proj.projectName === projectName ? { ...proj, status: value } : proj
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const userProjects = projects.filter((proj) =>
    proj.userList.includes(loggedInUser)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Project
      </Button>
      <Table
        dataSource={userProjects}
        columns={[
          {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
          },
          {
            title: "Users",
            dataIndex: "userList",
            key: "userList",
            render: (userList) =>
              userList.map((user) => <Tag key={user}>{user}</Tag>),
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
              <Select
                value={text}
                onChange={(value) =>
                  handleStatusChange(value, record.projectName)
                }
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            ),
          },
        ]}
        rowKey="projectName"
      />

      <Modal
        title="Add Project"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddProject}>
          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Assign Users"
            name="userList"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              {users.map((user) => (
                <Select.Option key={user.email} value={user.email}>
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Project
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Projects;
