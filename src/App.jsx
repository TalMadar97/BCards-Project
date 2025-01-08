import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import SingleCardPage from "./components/SingleCardPage";
import Favourites from "./components/favourites";
import MyCards from "./components/MyCards";
import CreateNewCard from "./components/CreateNewCard";
import UpdateCard from "./components/UpdateCard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/my-cards" element={<MyCards />} />
            <Route path="/my-cards/:id" element={<UpdateCard />} />
            <Route path="/cards/create" element={<CreateNewCard />} />
            <Route path="/cards/:id" element={<SingleCardPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <ToastContainer />
      </Router>
      <Footer />
    </>
  );
}

export default App;
