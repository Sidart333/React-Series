import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Project from "./components/Projects/Project";
import Task from "./components/Tasks/Task";
import Home from "./components/Home/Home";
import User from "./components/Users/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/users" element={<User />} />
      <Route path="/tasks" element={<Task />} />
    </Route>
  )
);




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
