// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AddEquipment from "./pages/AddEquipment"; // Import the AddEquipment page
import Navbar from "./components/Navbar";
import PrivateRoute from "./pages/PrivateRoute"; // Import PrivateRoute component

const App: React.FC = () => (
  <Router>
    <Navbar /> {/* Add the Navbar component here */}
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
      <Route
        path='/admin'
        element={<PrivateRoute element={<Admin />} />}
      />
      <Route
        path='/add-equipment'
        element={<PrivateRoute element={<AddEquipment />} />}
      />
    </Routes>
  </Router>
);

export default App;
