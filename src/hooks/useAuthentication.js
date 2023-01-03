import { db } from "../firebase/config"
import {
    getAuth,
    createUserWithEmailAndPassword,
    SignInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState, useEffect } from "react";


export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // CLEANUP
    // DEAL WITH MEMORY LEAK
    const [cancelled, setCancelled] = useState(false);

    const authUser = getAuth();

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    };

    const createUser = async(data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                authUser,
                data.emailUser,
                data.passwordUser
            );

            await updateProfile(user, {
                displayNameUser: data.displayNameUser 
            });

            setLoading(false);

            return user;

        } catch (error) {
            
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha deve conter no mínimo 6 caracteres!"
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado!"
            } else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!"
            }

            setLoading(false);
            setError(systemErrorMessage);

        };

    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return{
        authUser,
        createUser,
        error, 
        loading,
    }
};