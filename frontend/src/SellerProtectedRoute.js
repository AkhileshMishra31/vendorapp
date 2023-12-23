import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({isSeller, children }) => {
//   const { isLoading, isSeller } = useSelector((state) => state.seller);

    if (!isSeller) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
};

export default SellerProtectedRoute;