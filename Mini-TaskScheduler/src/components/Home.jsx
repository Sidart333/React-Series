import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from "antd";

const { Header, Content } = Layout;

function Home() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="projects">
            <Link to="/projects">Projects</Link>
          </Menu.Item>
          <Menu.Item key="tasks">
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          {loggedInUser ? (
            <Button
              type="primary"
              onClick={handleLogout}
              style={{ marginLeft: "auto" }}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button type="primary" style={{ marginLeft: "auto" }}>
                Login
              </Button>
            </Link>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "20px" }}>
        <h1>Welcome to the Project Management System</h1>
        <p>Use the navigation to manage users, projects, and tasks.</p>
      </Content>
    </Layout>
  );
}

export default Home;
    