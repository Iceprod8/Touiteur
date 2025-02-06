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
import PostComponent from './pages/post'
import ProfileComponent from './pages/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("clem");

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

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
          <Route path="/profile" element={<ProfileComponent />}/>
          <Route path="/post/:id" element={<PostComponent />} />
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