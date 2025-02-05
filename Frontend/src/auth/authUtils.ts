import { useNavigate } from "react-router-dom";

export const saveAuthToken = (token: string) => {
  sessionStorage.setItem('auth-token', token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('auth-token');
};

export const removeAuthToken = () => {
  sessionStorage.removeItem('auth-token');
};

export const logout = () => {
    removeAuthToken();
  };
