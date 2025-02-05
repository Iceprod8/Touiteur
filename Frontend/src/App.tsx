import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from './navbar';
import AllCardsComponents from './pages/allCards';
import PopularComponent from './pages/popular';
import RecentComponent from './pages/recent';
import LoginComponent from './pages/login';
import SearchComponent from './pages/search';
import RegisterComponent from './pages/register';
import { getAuthToken, logout } from './auth/authUtils';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = new ApolloLink((operation, forward) => {

  const token = getAuthToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  return forward(operation);
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const navigate = useNavigate();

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const [page, setPage] = useState(1);

  return (
    <div>
        <NavbarComponent isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<AllCardsComponents />}/>
          <Route path="/popular" element={<PopularComponent />}/>
          <Route path="/recent" element={<RecentComponent />}/>
          <Route path="/login" element={<LoginComponent />}/>
          <Route path="/search" element={<SearchComponent />}/>
          <Route path="/register" element={<RegisterComponent />}/>
        </Routes>
    </div>
  );
}

//export default App

export default function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  );
}