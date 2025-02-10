import { useState, useEffect } from "react";
import { Input, Button, List, Modal, Typography } from "antd";

const { Text } = Typography;

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentTask, setCurrentTask] = useState({ index: null, text: "" });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const addTask = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) {
      showModal("Please write a task.");
      return;
    }

    if (tasks.some((t) => t.text === trimmedTask)) {
      showModal("Task already exists!");
      return;
    }

    setTasks([...tasks, { text: trimmedTask, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const openEditModal = (index) => {
    setCurrentTask({ index, text: tasks[index].text });
    setIsModalOpen(true);
  };

  const handleEditTask = () => {
    const trimmedTask = currentTask.text.trim();
    if (!trimmedTask) {
      showModal("Task cannot be empty!");
      return;
    }
    if (
      tasks.some((t, i) => i !== currentTask.index && t.text === trimmedTask)
    ) {
      showModal("Task already exists!");
      return;
    }
    const updatedTasks = tasks.map((t, i) =>
      i === currentTask.index ? { ...t, text: trimmedTask } : t
    );
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <div className="flex items-center gap-4 mb-4">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onPressEnter={addTask}
          className="px-3 py-2 rounded-md max-w-64 w-full bg-white text-black"
          placeholder="Enter your task..."
        />
        <Button type="primary" onClick={addTask}>
          Add Task
        </Button>
      </div>
      <List
        className="w-96 text-white border border-white"
        bordered
        dataSource={tasks}
        renderItem={(t, index) => (
          <List.Item
            className="text-white border-b border-white"
            actions={[
              <Button
                type="link"
                onClick={() => openEditModal(index)}
                key="edit"
              >
                Edit
              </Button>,
              <Button
                type="link"
                danger
                onClick={() => deleteTask(index)}
                key="delete"
              >
                Delete
              </Button>,
            ]}
          >
            <Text
              onClick={() => toggleTask(index)}
              className={`cursor-pointer border-white text-white ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.text}
            </Text>
          </List.Item>
        )}
      />

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        open={isModalOpen && currentTask.index !== null}
        onOk={handleEditTask}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          value={currentTask.text}
          onChange={(e) =>
            setCurrentTask({ ...currentTask, text: e.target.value })
          }
        />
      </Modal>

      {/* General Alert Modal */}
      <Modal
        title="Alert"
        open={isModalOpen && currentTask.index === null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}

export default App;
