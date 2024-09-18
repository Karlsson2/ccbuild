import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Product from "./pages/Product";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/projects/:projectId/:productId" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
