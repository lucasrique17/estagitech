import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState, useEffect } from "react";


export const useAuthenticationEstudante = () => {
    const [errorEstudante, setErrorEstudante] = useState(null);
    const [loadingEstudante, setLoadingEstudante] = useState(null);
  
    // deal with memory leak
    const [cancelledEstudante, setCancelledEstudante] = useState(false);
  
    const authEstudante = getAuth();
  
    function checkIfIsCancelledEstudante() {
      if (cancelledEstudante) {
        return;
      }
    }
  
    const createEstudante = async (data) => {
      checkIfIsCancelledEstudante();
  
      setLoadingEstudante(true);
  
      try {
        const { estudante } = await createUserWithEmailAndPassword(
          authEstudante,
          data.emailEstudante,
          data.passwordEstudante
        );
  
        await updateProfile(estudante, {
          displayNameEstudante: data.displayNameEstudante,
        });
  
        return estudante;
      } catch (error) {
        console.log(errorEstudante.message);
        console.log(typeof errorEstudante.message);
  
        let systemErrorMessageEstudante;
  
        if (errorEstudante.message.includes("Password")) {
          systemErrorMessageEstudante = "A senha deve conter no minímo 6 caracteres!";
        } else if (errorEstudante.message.includes("email-already")) {
          systemErrorMessageEstudante = "E-mail já cadastrado!";
        } else {
          systemErrorMessageEstudante = "Ocorreu um erro, tente novamente mais tarde!";
        }
  
        setErrorEstudante(systemErrorMessageEstudante);
      }
  
      setLoadingEstudante(false);
    };
  
    const logoutEstudante = () => {
      checkIfIsCancelledEstudante();
  
      signOut(authEstudante);
    };
  
    const loginEstudante = async (data) => {
      checkIfIsCancelledEstudante();
  
      setLoadingEstudante(true);
      setErrorEstudante(false);
  
      try {
        await signInWithEmailAndPassword(authEstudante, data.emailEstudante, data.passwordEstudante);
      } catch (error) {
        console.log(errorEstudante.message);
        console.log(typeof errorEstudante.message);
        console.log(errorEstudante.message.includes("user-not"));
  
        let systemErrorMessageEstudante;
  
        if (errorEstudante.message.includes("user-not-found")) {
          systemErrorMessageEstudante = "Usuário não encontrado!";
        } else if (errorEstudante.message.includes("wrong-password")) {
          systemErrorMessageEstudante = "Senha incorreta!";
        } else {
          systemErrorMessageEstudante = "Ocorreu um erro, tente novamente mais tarde.";
        }
  
        console.log(systemErrorMessageEstudante);
  
        setErrorEstudante(systemErrorMessageEstudante);
      }
  
      console.log(errorEstudante);
  
      setLoadingEstudante(false);
    };
  
    useEffect(() => {
      return () => setCancelledEstudante(true);
    }, []);
  
    return {
      authEstudante,
      createEstudante,
      errorEstudante,
      logoutEstudante,
      loginEstudante,
      loadingEstudante,
    };
  };