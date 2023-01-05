import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";


export const useAuthenticationUser = () => {
    const [errorUser, setErrorUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(null);
  
    // deal with memory leak
    const [cancelledUser, setCancelledUser] = useState(false);
  
    const authUser = getAuth();
  
    function checkIfIsCancelledUser() {
      if (cancelledUser) {
        return;
      }
    }
  
    const createUser = async (data) => {
      checkIfIsCancelledUser();
  
      setLoadingUser(true);
  
      try {
        const { user } = await createUserWithEmailAndPassword(
          authUser,
          data.emailUser,
          data.passwordUser
        );
  
        await updateProfile(user, {
          displayNameUser: data.displayNameUser,
        });
  
        return user;
      } catch (error) {
        console.log(errorUser.message);
        console.log(typeof errorUser.message);
  
        let systemErrorMessageUser;
  
        if (errorUser.message.includes("Password")) {
          systemErrorMessageUser = "A senha deve conter no minímo 6 caracteres!";
        } else if (errorUser.message.includes("email-already")) {
          systemErrorMessageUser = "E-mail já cadastrado!";
        } else {
          systemErrorMessageUser = "Ocorreu um erro, tente novamente mais tarde!";
        }
  
        setErrorUser(systemErrorMessageUser);
      }
  
      setLoadingUser(false);
    };
  
    const logoutUser = () => {
      checkIfIsCancelledUser();
  
      signOut(authUser);
    };
  
    const loginUser = async (data) => {
      checkIfIsCancelledUser();
  
      setLoadingUser(true);
      setErrorUser(false);
  
      try {
        await signInWithEmailAndPassword(authUser, data.emailUser, data.passwordUser);
      } catch (error) {
        console.log(errorUser.message);
        console.log(typeof errorUser.message);
        console.log(errorUser.message.includes("user-not"));
  
        let systemErrorMessageUser;
  
        if (errorUser.message.includes("user-not-found")) {
          systemErrorMessageUser = "Usuário não encontrado!";
        } else if (errorUser.message.includes("wrong-password")) {
          systemErrorMessageUser = "Senha incorreta!";
        } else {
          systemErrorMessageUser = "Ocorreu um erro, tente novamente mais tarde.";
        }
  
        console.log(systemErrorMessageUser);
  
        setErrorUser(systemErrorMessageUser);
      }
  
      console.log(errorUser);
  
      setLoadingUser(false);
    };
  
    useEffect(() => {
      return () => setCancelledUser(true);
    }, []);
  
    return {
      authUser,
      createUser,
      errorUser,
      logoutUser,
      loginUser,
      loadingUser,
    };
  };