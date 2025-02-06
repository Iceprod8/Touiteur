export const saveAuthToken = (token: string) => {
  sessionStorage.setItem('auth-token', token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('auth-token');
};

export const getUsername = () => {
  return sessionStorage.getItem('username');
};

export const removeAuthToken = () => {
  sessionStorage.removeItem('auth-token');
};

export const removeUsername = () => {
  sessionStorage.removeItem('username');
};

export const logout = () => {
    removeAuthToken();
    removeUsername();
  };
