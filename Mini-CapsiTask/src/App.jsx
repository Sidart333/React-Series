import { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
