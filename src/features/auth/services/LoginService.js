// src/features/auth/services/LoginService.js

import { setLoginState } from "../../../state/loginState";
import { get, post } from "../../../shared/services/httpClient";

export const login = async (email, password) => {
  const response = await post(
    "/users-service/api/v1/auth/token",

    {
      email,
      password,
    },

    {
      auth: false,
    },
  );

  const token = response?.token;

  if (!token) {
    throw new Error("TOKEN_NOT_FOUND");
  }
  const res = await post("/users-service/api/v1/auth/validate", {
    token,
  });
  const userId = res?.userId;
  if (!userId) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = await get(`/users-service/api/v1/users/${userId}`);
  const loginData = {
    isAuthenticated: true,
    token,
    email: user?.email || email,
    userId,
    role: user?.role,
    firstName: user?.firstName,
    lastName: user?.lastName,
    date: new Date().toISOString(),
  };

  localStorage.setItem("token", token);
  localStorage.setItem("loginState", JSON.stringify(loginData));

  setLoginState(loginData);

  return loginData;
};
