import { useState, useEffect } from 'react';

let state = {
  username: '',
  userId: '',
  role: '',
  isAuthenticated: false,
};

// patrón observer para notificar cambios en el estado global
const listeners = new Set();

const notify = () => {
  listeners.forEach((listener) => listener(state));
};

// Función para actualizar el estado global y notificar a los suscriptores
export const setLoginState = (partialState) => {
  state = { ...state, ...partialState };
  notify();
};

// Función para obtener el estado actual (solo lectura)
export const getLoginState = () => state;

// Hook personalizado para usar el estado en componentes React
export function useLoginState() {
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    const listener = (newState) => setCurrentState({ ...newState });
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return currentState;
}

export function isAuthenticated() {
  return getLoginState().isAuthenticated;
}