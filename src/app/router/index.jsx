import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import CartPage from "../../features/cart/pages/CartPage";
import CheckoutPage from "../../features/checkout/pages/CheckoutPage";
import HomePage from "../../features/home/pages/HomePage";
import LandingPage from "../../features/landing/pages/LandingPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import NotFoundPage from "../../features/not-found/pages/NotFoundPage";
import { PATHS } from "./paths";
import PrivateLayout from "../layouts/PrivateLayout";
import Profile from "../../features/profile/pages/Profile";
import ProtectedRoute from "../../shared/components/ProtectedRoute";
import RegisterPage from "../../features/auth/pages/RegisterPage";

import { isAuthenticated } from "../../state/loginState";
import BookDetail from "../../features/books-details/pages/BookDetail";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.LANDING,
        element: <LandingPage />,
      },
      {
        path: PATHS.BOOKS,
        element: <h1>Libros</h1>,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.LOGIN,
        element: isAuthenticated() ? (
          <Navigate to={PATHS.PROFILE} replace />
        ) : (
          <LoginPage />
        ),
      },
      {
        path: PATHS.REGISTER,
        element: isAuthenticated() ? (
          <Navigate to={PATHS.PROFILE} replace />
        ) : (
          <RegisterPage />
        ),
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <PrivateLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: PATHS.HOME,
        element: <HomePage />,
      },
      {
        path: PATHS.PROFILE,
        element: <Profile />,
      },
      {
        path: PATHS.CART,
        element: <CartPage />,
      },
      {
        path: PATHS.CHECKOUT,
        element: <CheckoutPage />,
      },
      {
        path: PATHS.BOOK_DETAIL,
        element: <BookDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
