import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

// CONTEXT
import { AuthProvider } from './context/AuthContext';

// HOOKS
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import { UseAuthentication } from './hooks/estAuthentication';

// PAGINAS
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RegisterEstudante from './pages/registerEstudante/RegisterEstudante';
import RegisterUser from './pages/registerUser/RegisterUser';


// COMPONENTES
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  // USUARIO EMPRESA/PROFESSOR
  const [user, setUser] = useState(undefined)
  const {authUser} = useAuthentication()

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
  const {authEstudante} = UseAuthentication()

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
      
      <AuthProvider value={user || estudante}>
        <BrowserRouter>
          <Navbar />
            <div className="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sobre' element={<Sobre />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/registerEstudante' element={<RegisterEstudante />} />
                <Route path='/registerUser' element={<RegisterUser />} />
              </Routes>
            </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
      
    </div>
  );
};

export default App;
