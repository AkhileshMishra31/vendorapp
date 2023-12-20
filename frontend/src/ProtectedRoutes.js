import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loadUser } from "./redux/actions/user";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Dispatch the loadUser action only if user data is not available
    if (!isAuthenticated && !user && !loading) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, user, loading]);

  let location = useLocation();

  if (!isAuthenticated && !loading) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;
