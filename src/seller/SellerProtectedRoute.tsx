import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

const SellerProtectedRoute = ({ children }: Props) => {
  const jwt = localStorage.getItem("seller_jwt");

  if (!jwt) {
    return <Navigate to="/become-seller" replace />;
  }

  return children;
};

export default SellerProtectedRoute;