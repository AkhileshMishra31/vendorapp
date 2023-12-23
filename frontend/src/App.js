import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./Routes.js";
import { SignupPage } from "./Routes.js";
import { HomePage } from "./Routes.js";
import { ProductPage } from "./Routes.js";
import { BestSellingPage } from "./Routes.js";
import { ActivationPage } from "./Routes";
import { ShopLoginPage } from "./Routes";
import { EventPage } from "./Routes";
import { FaqPage } from "./Routes.js";
import { ProductPageDetails } from "./Routes.js";
import { ProfilePage } from "./Routes.js";
import { ShopCreatePage } from "./Routes.js";
import { ActivationPageSeller } from "./Routes.js";
import { ShopHomePage } from "./ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes.js";
import { loadSeller } from "./redux/actions/seller.js";
import SellerProtectedRoute from "./SellerProtectedRoute.js";

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { isSeller, seller, isLoading } = useSelector((state) => state.shop);
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    if (isSeller) {
      console.log("this is return");
    }
  }, []);

  console.log("isSeller", isSeller);

  return (
    <>
      {/* Your content goes here */}
      <div className="App">
        {loading || isLoading ? null : (
          <>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/activation/:token" element={<ActivationPage />} />
                <Route
                  path="/seller/activation/:token"
                  element={<ActivationPageSeller />}
                />
                <Route path="/best-selling" element={<BestSellingPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/Product/:name" element={<ProductPageDetails />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/shop-create" element={<ShopCreatePage />} />
                <Route path="/shop-login" element={<ShopLoginPage />} />
                <Route
                  path="/shop/:id"
                  element={
                    <SellerProtectedRoute isSeller={isSeller}>
                      <ShopHomePage />
                    </SellerProtectedRoute>
                  }
                />
              </Routes>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </Router>
          </>
        )}
        
      </div>
    </>
  );
}

export default App;
