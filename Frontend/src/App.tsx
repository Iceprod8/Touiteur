import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from './navbar';
import AllCardsComponents from './pages/allCards';
import PopularComponent from './pages/popular';
import RecentComponent from './pages/recent';
import LoginComponent from './pages/login';
import SearchComponent from './pages/search';
import PostComponent from './pages/post'
import RegisterComponent from './pages/register';
import AuthProvider, { AuthContext } from './context/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import ProfileComponent from './pages/Profile';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = new ApolloLink((operation, forward) => {

  const token = sessionStorage.getItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <div>
        <NavbarComponent isLoggedIn={!!user} onLogout={handleLogout} />
        <Routes>
          <Route element={<PrivateRoute redirectTo="/login" />}>
            <Route path="/" element={<AllCardsComponents />} />
            <Route path="/popular" element={<PopularComponent />} />
            <Route path="/recent" element={<RecentComponent />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/post/:id" element={<PostComponent />} />
          </Route>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
    </div>
  );
}

//export default App

export default function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}