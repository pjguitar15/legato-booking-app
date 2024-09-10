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
import EquipmentPage from "./pages/Public/EquipmentPage";
import BookingStepOne from "./pages/Public/BookingStepOne";
import { BookingProvider } from "./context/BookingContext"; // Import the BookingProvider

const App: React.FC = () => (
  <Router>
    <BookingProvider>
      {" "}
      {/* Wrap the application with the BookingProvider */}
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/packages'
          element={<UserPackageList />}
        />
        <Route
          path='/booking/:packageId'
          element={<BookingStepOne />}
        />
        <Route
          path='/equipment'
          element={<EquipmentPage />}
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
          path='/admin/add-equipment'
          element={<PrivateRoute element={<AddEquipment />} />}
        />
        <Route
          path='/admin/equipment'
          element={<PrivateRoute element={<EquipmentList />} />}
        />
        <Route
          path='/admin/create-package'
          element={<PrivateRoute element={<CreatePackage />} />}
        />
        <Route
          path='/admin/packages'
          element={<PrivateRoute element={<PackageList />} />}
        />
        <Route
          path='/admin/package/:id'
          element={<PrivateRoute element={<PackageDetails />} />}
        />
        <Route
          path='/admin/package/edit/:id'
          element={<PrivateRoute element={<PackageUpdate />} />}
        />
      </Routes>
    </BookingProvider>
  </Router>
);

export default App;
