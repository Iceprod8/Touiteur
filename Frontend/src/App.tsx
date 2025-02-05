import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from './navbar';
import AllCardsComponents from './pages/allCards';
import PopularComponent from './pages/popular';
import RecentComponent from './pages/recent';
import LoginComponent from './pages/login';
import SearchComponent from './pages/search';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("JohnDoe");

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const [page, setPage] = useState(1);

  return (
    <div>
      <Router>
        <NavbarComponent isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<AllCardsComponents />}/>
          <Route path="/popular" element={<PopularComponent />}/>
          <Route path="/recent" element={<RecentComponent />}/>
          <Route path="/login" element={<LoginComponent />}/>
          <Route path="/search" element={<SearchComponent />}/>
        </Routes>
      </Router>
    </div>
  );
}

// export default App

export default function AppWrapper() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}