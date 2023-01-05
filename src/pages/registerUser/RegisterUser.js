import styles from "./RegisterUser.module.css";

import { useState, useEffect } from "react";

// HOOKS
import { useAuthenticationUser } from "../../hooks/useAuthenticationUser";


const RegisterUser = () => {

  const [displayNameUser, setDisplayNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [confirmPasswordUser, setConfirmPasswordUser] = useState("");
  const [errorUser, setErrorUser] = useState("");

  const { createUser, errorUser: authErrorUser, loadingUser } = useAuthenticationUser();

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    setErrorUser("");

    const user = {
      displayNameUser,
      emailUser,
      passwordUser,
    };

    if (passwordUser !== confirmPasswordUser) {
      setErrorUser("As senhas precisam ser iguais.");
      return;
    }

    const resUser = await createUser(user);

    console.log(resUser);
  };

  useEffect(() => {
    if (authErrorUser) {
      setErrorUser(authErrorUser);
    }
  }, [authErrorUser]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário e ofereça as melhores vagas de estágio!</p>

      <form onSubmit={handleSubmitUser}>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayNameUser" required placeholder="Digite seu nome" onChange={(e) => setDisplayNameUser(e.target.value)} value={displayNameUser} />
        </label>

        <label>
          <span>E-mail:</span>
          <input type="email" name="emailUser" required placeholder="Digite seu e-mail" onChange={(e) => setEmailUser(e.target.value)} value={emailUser} />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" name="passwordUser" required placeholder="Digite sua senha" onChange={(e) => setPasswordUser(e.target.value)} value={passwordUser} />
        </label>

        <label>
          <span>Confirmação de senha:</span>
          <input type="password" name="confirmPasswordUser" required placeholder="Confirme sua senha" onChange={(e) => setConfirmPasswordUser(e.target.value)} value={confirmPasswordUser} />
        </label>

        {!loadingUser && <button className="btn">Entrar</button>}
        {loadingUser && (
          <button className="btn" disabled>Aguarde...</button>
        )}
        {errorUser && <p className="error">{errorUser}</p>}
      </form>
    </div>
  );
};

export default RegisterUser