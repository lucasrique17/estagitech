import styles from "./RegisterUser.module.css";

import { useState, useEffect } from "react";

// HOOKS
import { useAuthentication } from "../../hooks/useAuthentication";


const RegisterUser = () => {

  const [displayNameUser, setDisplayNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [confirmPasswordUser, setConfirmPasswordUser] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmitUser = async(e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayNameUser,
      emailUser,
      passwordUser
    }

    if(passwordUser !== confirmPasswordUser) {
      setError("As senhas devem ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(user);
  }

  useEffect(() => {

    if(authError) {
      setError(authError)
    }

  }, [authError])

  return (
    <div className={styles.register_user}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário e ofereça as melhores vagas de estágio!</p>
      <form onSubmit={handleSubmitUser}>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayNameUser" required placeholder="Digite seu nome" value={displayNameUser} onChange={(e) => setDisplayNameUser(e.target.value)} />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email" name="emailUser" required placeholder="Digite seu e-mail" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="passwordUser" required placeholder="Digite sua senha" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)} />
        </label>
        <label>
          <span>Confirmar Senha:</span>
          <input type="password" name="confirmPasswordUser" required placeholder="Confirme sua senha" alue={confirmPasswordUser} onChange={(e) => setConfirmPasswordUser(e.target.value)} />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default RegisterUser