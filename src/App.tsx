import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buyer from "./pages/Buyer";
import Agent from "./pages/Agent";
import Admin from "./pages/Admin";
import AgentDashboard from "./pages/AgentDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ViewProperties from "./pages/ViewProperties";
import ViewSearches from "./pages/ViewSearches";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buyer" element={<Buyer />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminDash" element={<AdminDashboard />} />
          <Route path="/AgentDashboard" element={<AgentDashboard />} />
          <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
          <Route path="/ViewProperties" element={<ViewProperties />} />
          <Route path="/ViewSearches" element={<ViewSearches />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
