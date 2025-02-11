import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setTasks(storedTasks);
    setProjects(storedProjects);
  }, []);

  const handleAddTask = (values) => {
    const newTask = { ...values, assignedTo: loggedInUser };
    const updatedTasks = [...tasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setIsModalOpen(false);
    form.resetFields();
    message.success("Task added successfully!");
  };

  const userTasks = tasks.filter((task) => task.assignedTo === loggedInUser);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tasks</h2>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Task
      </Button>
      <Table
        dataSource={userTasks}
        columns={[
          { title: "Task Name", dataIndex: "taskName", key: "taskName" },
          { title: "Project", dataIndex: "project", key: "project" },
          { title: "Status", dataIndex: "status", key: "status" },
        ]}
        rowKey="taskName"
      />

      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTask}>
          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project"
            name="project"
            rules={[{ required: true }]}
          >
            <Select>
              {projects.map((proj) => (
                <Select.Option key={proj.projectName} value={proj.projectName}>
                  {proj.projectName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="in progress">In Progress</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Tasks;
