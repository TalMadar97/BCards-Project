import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </Router>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
