import { useEffect, useState } from "react";

const defaultState = {
  email: "",
  username: "",
  userId: "",
  role: "",
  token: "",
  jwt: "",
  isAuthenticated: false,
};

function getInitialState() {
  const token = localStorage.getItem("token");
  const savedState = localStorage.getItem("loginState");

  if (!token || !savedState) {
    return { ...defaultState };
  }

  try {
    const parsed = JSON.parse(savedState);

    return {
      ...defaultState,
      ...parsed,
      token,
      isAuthenticated: true,
    };
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("loginState");
    return { ...defaultState };
  }
}

let state = getInitialState();

const listeners = new Set();

const notify = () => {
  listeners.forEach((listener) => listener({ ...state }));
};

export const setLoginState = (partialState) => {
  state = {
    ...state,
    ...partialState,
  };

  localStorage.setItem("loginState", JSON.stringify(state));

  if (state.token) {
    localStorage.setItem("token", state.token);
  }

  notify();
};

export const getLoginState = () => ({ ...state });

export function useLoginState() {
  const [currentState, setCurrentState] = useState(() => ({ ...state }));

  useEffect(() => {
    const listener = (newState) => {
      setCurrentState(newState);
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  return currentState;
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  return true;
}

export function logout() {
  state = { ...defaultState };

  localStorage.removeItem("token");
  localStorage.removeItem("loginState");

  notify();
}