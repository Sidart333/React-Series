import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message, Table } from "antd";

export default function Task() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeProjects, setActiveProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchActiveProjects();
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchActiveProjects = () => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const filteredProjects = storedProjects.filter(
      (project) => project.status === true
    );
    setActiveProjects(filteredProjects);
  };

  const fetchUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };

  const fetchTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      saveTaskToLocalStorage(values);
      message.success("Task created successfully!");
      fetchTasks(); // Update the UI after saving the task
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const saveTaskToLocalStorage = (task) => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    existingTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
    setTasks(existingTasks); // Update state to reflect changes immediately
  };

  const columns = [
    { title: "Task", dataIndex: "task", key: "task" },
    { title: "Project", dataIndex: "project", key: "project" },
    { title: "Assigned User", dataIndex: "assignedUser", key: "assignedUser" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="p-6">
      <Button type="primary" onClick={showModal}>
        Create Task
      </Button>

      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="task"
        className="mt-4"
      />

      <Modal
        title="Create Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Enter Task"
            name="task"
            rules={[{ required: true, message: "Please enter task name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Project"
            name="project"
            rules={[{ required: true, message: "Please select a project" }]}
          >
            <Select>
              {activeProjects.map((project) => (
                <Select.Option key={project.name} value={project.name}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Assign User"
            name="assignedUser"
            rules={[{ required: true, message: "Please select a user" }]}
          >
            <Select>
              {users.map((user) => (
                <Select.Option key={user.name} value={user.name}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Task Status"
            name="status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Select.Option value="To Do">To Do</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Done">Task Done</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
