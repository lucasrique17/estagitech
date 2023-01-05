import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

// CONTEXT
import { AuthProvider } from './context/AuthContext';

// HOOKS
import { useState, useEffect } from 'react';
import { useAuthenticationUser } from './hooks/useAuthenticationUser';
import { useAuthenticationEstudante } from './hooks/useAuthenticationEstudante';

// PAGINAS
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RegisterEstudante from './pages/registerEstudante/RegisterEstudante';
import RegisterUser from './pages/registerUser/RegisterUser';
import CreatePost from './pages/createPost/CreatePost';
import Dashboard from './pages/dashboard/Dashboard';


// COMPONENTES
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  // USUARIO EMPRESA/PROFESSOR
  const [user, setUser] = useState(undefined)
  const {authUser} = useAuthenticationUser()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(authUser, (user) => {
      setUser(user)
    })

  }, [authUser])

  if(loadingUser) {
    <p>Carregando...</p>
  }

  // USUARIO ESTUDANTE
  const [estudante, setEstudante] = useState(undefined)
  const {authEstudante} = useAuthenticationEstudante()

  const loadingEstudante = estudante === undefined

  useEffect(() => {

    onAuthStateChanged(authEstudante, (estudande) => {
      setEstudante(estudante)
    })

  }, [authEstudante])

  if(loadingEstudante) {
    <p>Carregando...</p>
  }

  return (
    <div className="App">
      
      <AuthProvider value={({user} || {estudante})}>
        <BrowserRouter>
          <Navbar />
            <div className="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sobre' element={<Sobre />} />
                <Route path='/login' element={(!user || estudante) ? <Login /> : <Navigate to="/" />} />
                <Route path='/register' element={(!user || estudante) ? <Register /> : <Navigate to="/" />} />
                <Route path='/registerEstudante' element={(!user || estudante) ? <RegisterEstudante /> : <Navigate to="/" />} />
                <Route path='/registerUser' element={(!user || estudante) ? <RegisterUser /> : <Navigate to="/" />} />
                <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
};

export default App;
