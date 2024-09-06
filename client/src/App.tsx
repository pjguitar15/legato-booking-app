// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Public/Home";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";
import Admin from "./pages/Admin/Admin";
import AddEquipment from "./pages/Admin/Equipments/AddEquipment";
import EquipmentList from "./pages/Admin/Equipments/EquipmentList";
import CreatePackage from "./pages/Admin/Packages/CreatePackage";
import PackageDetails from "./pages/Admin/Packages/PackageDetails"; // Import the PackageDetails page
import Navbar from "./components/Navbar";
import PrivateRoute from "./pages/Admin/PrivateRoute";
import PackageUpdate from "./pages/Admin/Packages/PackageUpdate";
import PackageList from "./pages/Admin/Packages/PackageList";
import UserPackageList from "./pages/Public/UserPackageList";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/package-list'
        element={<UserPackageList />}
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
