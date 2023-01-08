import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

// CONTEXT
import { AuthProvider } from './context/AuthContext';

// HOOKS
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// COMPONENTES
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// PAGINAS
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import CreatePost from './pages/createPost/CreatePost';
import Search from './pages/search/Search';
import Post from './pages/post/Post';
import EditPost from './pages/editPost/EditPost';


function App() {

  // USUARIO 
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loading = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loading) {
    <p>Carregando...</p>
  }

  return (
    <div className="App">
      
      <AuthProvider value={ {user} }>
        <BrowserRouter>
          <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path='/search' element={<Search />} />
                <Route path='/posts/:id' element={<Post />} />
                <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to='/login' />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
};

export default App;
