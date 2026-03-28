import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../../features/home/pages/HomePage";
import CartPage from "../../features/cart/pages/CartPage";
import CheckoutPage from "../../features/checkout/pages/CheckoutPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import NotFoundPage from "../../features/not-found/pages/NotFoundPage";
import { PATHS } from "./paths";
import LandingPage from "../../features/landing/pages/LandingPage";
import PrivateLayout from "../layouts/PrivateLayout";
import ProtectedRoute from "../../shared/components/ProtectedRoute";
import { isAuthenticated } from "../../state/loginState";

const router = createBrowserRouter([
  {
    path: PATHS.LANDING,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: PATHS.BOOKS,
        element: <h1>Libros</h1>,
      },
      {
        path: PATHS.BOOK_DETAIL,
        element: <h1>Detalle del libro</h1>,
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
        element: <h1>Página de perfil</h1>,
      },
      {
        path: PATHS.CART,
        element: <CartPage />,
      },
      {
        path: PATHS.CHECKOUT,
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
