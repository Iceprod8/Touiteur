import { createContext, useState, useEffect } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const GET_USER = gql`
  query GetUser {
    getUserFromJWT {
      code
        message
        success
        user {
         username
        }
    }
  }
`;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const client = useApolloClient();
  const { data, loading } = useQuery(GET_USER, {
    skip: !sessionStorage.getItem("token"),
  });

  useEffect(() => {
    if (data) {
      setUser(data.getUserFromJWT);
    }
  }, [data]);

  const login = (token: string) => {
    sessionStorage.setItem("token", token);
    client
    .resetStore()
    .then(() => {
      client
        .query({ query: GET_USER })
        .then((response) => {
          if (response.data.getUserFromJWT.success) {
            setUser(response.data.getUserFromJWT.user);
          } else {
            setError("Error retrieving user data after login");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    })
    .catch((err) => {
      console.error("Error resetting Apollo client store:", err);
    });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    client.clearStore();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
