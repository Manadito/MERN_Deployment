import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./views/MainPage.view";
import CreateProjectPage from "./views/CreateProjectPage.view";

function App() {
  // All routes operational!
  return (
    <div className="container">
      <Routes> 
        <Route path="/" element={<MainPage />} />
        <Route path="/tasks/new" element={<CreateProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
