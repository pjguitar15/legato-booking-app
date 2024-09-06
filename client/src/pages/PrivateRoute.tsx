import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Define an interface for the decoded JWT token
interface DecodedToken {
  exp: number; // Expiration time (in seconds since the epoch)
  iat?: number; // Issued at (optional, depending on your token structure)
  // Add any other fields that may be in your token
}

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = localStorage.getItem("token");

  // Helper function to check if the token is expired
  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    try {
      // Decode the token and assume it's of type DecodedToken
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

      const currentTime = Date.now() / 1000; // Convert to seconds

      // Return true if the token has not expired, false otherwise
      return decoded.exp > currentTime;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return isTokenValid(token) ? element : <Navigate to='/login' />;
};

export default PrivateRoute;
