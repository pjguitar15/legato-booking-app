// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AddEquipment from "./pages/AddEquipment";
import EquipmentList from "./pages/EquipmentList";
import CreatePackage from "./pages/CreatePackage";
import PackageDetails from "./pages/PackageDetails"; // Import the PackageDetails page
import Navbar from "./components/Navbar";
import PrivateRoute from "./pages/PrivateRoute";
import PackageList from "./pages/Packagelist";
import PackageUpdate from "./pages/PackageUpdate";

const App: React.FC = () => (
  <Router>
    <Navbar />
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
      <Route
        path='/equipment-list'
        element={<PrivateRoute element={<EquipmentList />} />}
      />
      <Route
        path='/create-package'
        element={<PrivateRoute element={<CreatePackage />} />}
      />
      <Route
        path='/packages'
        element={<PrivateRoute element={<PackageList />} />} // Route for PackageList
      />
      <Route
        path='/package/:id'
        element={<PrivateRoute element={<PackageDetails />} />} // Route for PackageDetails
      />
      <Route
        path='/package/edit/:id'
        element={<PrivateRoute element={<PackageUpdate />} />} // Route for PackageDetails
      />
    </Routes>
  </Router>
);

export default App;
