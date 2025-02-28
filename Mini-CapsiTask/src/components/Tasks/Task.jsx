import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, message, Table } from "antd";

export default function Task() {
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editingTask, setEditingTask] = useState(null);

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

  const showEditModal = (task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
    setIsEditModalOpen(true);
  };

  

  const fetchActiveProjects = () => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const filteredProjects = storedProjects.filter(
      (project) => project.status === true || project.status === "Active"
    );
    setActiveProjects(filteredProjects);
  };

  const fetchUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  };

  const fetchTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem("taskManager_tasks")) || [];
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

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      const updatedTasks = tasks.map((task) =>
        task.task === editingTask.task ? { ...task, ...values } : task
      );

      setTasks(updatedTasks);
      localStorage.setItem("taskManager_tasks", JSON.stringify(updatedTasks));

      message.success("Task updated successfully!");
      setIsEditModalOpen(false);
      setEditingTask(null);
      form.resetFields();
    });
  };

  const handleDeleteTask = (taskName) => {
    Modal.confirm({
      title: "Are you sure?",
      content: `Do you really want to delete the task: "${taskName}"?`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        const updatedTasks = tasks.filter((task) => task.task !== taskName);
        setTasks(updatedTasks);
        localStorage.setItem("taskManager_tasks", JSON.stringify(updatedTasks));
        message.success("Task deleted successfully!");
      },
    });
  };




  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const saveTaskToLocalStorage = (task) => {
    const existingTasks = JSON.parse(localStorage.getItem("taskManager_tasks")) || [];
    existingTasks.push(task);
    localStorage.setItem("taskManager_tasks", JSON.stringify(existingTasks));
    setTasks(existingTasks); // Update state to reflect changes immediately
  };

 const columns = [
   { title: "Task", dataIndex: "task", key: "task" },
   { title: "Project", dataIndex: "project", key: "project" },
   { title: "Assigned User", dataIndex: "assignedUser", key: "assignedUser" },
   { title: "Status", dataIndex: "status", key: "status" },
   {
     title: "Actions",
     key: "actions",
     render: (_, record) => (
       <>
         <Button
           type="primary"
           onClick={() => showEditModal(record)}
           className="mr-2"
         >
           Edit
         </Button>
         <Button
           type="primary"
           danger
           onClick={() => handleDeleteTask(record.task)}
           style={{ backgroundColor: '#fff', color: "#ff4d4f", borderColor: "#ff4d4f" }}
         >
           Delete
         </Button>
       </>
     ),
   },
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
        pagination={{ pageSize: 8 }}
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
            rules={[
              { required: true, message: "Please enter task name" },
              {
                min: 5,
                message: "Task name must be at least 5 characters long!",
              },
            ]}
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

      <Modal
        title="Edit Task"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Enter Task"
            name="task"
            rules={[
              { required: true, message: "Please enter task name" },
              {
                min: 3,
                message: "Task name must be at least 3 characters long",
              },
            ]}
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
