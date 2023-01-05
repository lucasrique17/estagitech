import styles from "./Login.module.css"

import { useState, useEffect } from "react";

// HOOKS
import { useAuthenticationUser } from "../../hooks/useAuthenticationUser";
import { useAuthenticationEstudante } from "../../hooks/useAuthenticationEstudante";

const Login = () => {

  // LOGIN USUARIO
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [errorUser, setErrorUser] = useState("");

  const { loginUser, errorUser: authErrorUser, loadingUser } = useAuthenticationUser();

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    setErrorUser("");

    const user = {
      emailUser,
      passwordUser,
    };

    const resUser = await loginUser(user);

    console.log(resUser);
  };

  useEffect(() => {
    console.log(authErrorUser);
    if (authErrorUser) {
      setErrorUser(authErrorUser);
    }
  }, [authErrorUser]);

  // LOGIN Estudante
  const [emailEstudante, setEmailEstudante] = useState("");
  const [passwordEstudante, setPasswordEstudante] = useState("");
  const [errorEstudante, setErrorEstudante] = useState("");

  const { loginEstudante, errorEstudante: authErrorEstudante, loadingEstudante } = useAuthenticationEstudante();

  const handleSubmitEstudante = async (e) => {
    e.preventDefault();

    setErrorEstudante("");

    const estudante = {
      emailEstudante,
      passwordEstudante,
    };

    const resEstudante = await loginEstudante(estudante);

    console.log(resEstudante);
  };

  useEffect(() => {
    console.log(authErrorEstudante);
    if (authErrorEstudante) {
      setErrorUser(authErrorEstudante);
    }
  }, [authErrorEstudante]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça seu login!</p>
      <form onSubmit={({handleSubmitUser} || {handleSubmitEstudante})}>
        <label>
          <span>E-mail:</span>
          <input type="email" name="emailUser" required placeholder="Digite seu e-mail" value={(emailUser || emailEstudante)} onChange={(e) => (setEmailUser || setEmailEstudante)(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="passwordUser" required placeholder="Digite sua senha" value={(passwordUser || passwordEstudante)} onChange={(e) => (setPasswordUser || setPasswordEstudante)(e.target.value)} />
        </label>
        {(!loadingUser || !loadingEstudante) && <button className="btn">Entrar</button>}
        {(loadingUser || loadingEstudante) && <button className="btn" disabled>Aguarde...</button>}
        {(errorUser || errorEstudante) && <p className="error">{(errorUser || errorEstudante)}</p>}
      </form>
    </div>
  )
}

export default Login