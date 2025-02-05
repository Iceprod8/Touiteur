import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavbarComponent from './navbar';
import AllCardsComponents from './pages/allCards';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  //uri: 'https://rickandmortyapi.com/graphql',
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
        <Route path="/" element={<AllCardsComponents />} />
        <Route path="/features"/>
        <Route path="/pricing"/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
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