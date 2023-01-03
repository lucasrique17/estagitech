import styles from "./RegisterEstudante.module.css";

import { useState, useEffect } from "react";

// HOOKS
import { UseAuthentication } from "../../hooks/estAuthentication";
import { async } from "@firebase/util";


const RegisterEstudante = () => {

  const [displayNameEstudante, setDisplayNameEstudante] = useState("");
  const [emailEstudante, setEmailEstudante] = useState("");
  const [passwordEstudante, setPasswordEstudante] = useState("");
  const [confirmPasswordEstudante, setConfirmPasswordEstudante] = useState("");
  const [error, setError] = useState("");

  const {createEstudante, error: authError, loading} = UseAuthentication(); 

  const handleSubmitEstudante = async(e) => {
    e.preventDefault();

    setError("");

    const estudante = {
      displayNameEstudante,
      emailEstudante,
      passwordEstudante
    }

    if(passwordEstudante !== confirmPasswordEstudante) {
      setError("As senhas devem ser iguais!");
      return;
    }

    const res = await createEstudante(estudante);

    console.log(estudante);
  }

  useEffect(() => {

    if(authError) {
      setError(authError)
    }

  }, [authError])

  return (
    <div className={styles.register_estudante}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário para ter acesso as melhores vagas de estágio!</p>
      <form onSubmit={handleSubmitEstudante}>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayNameEstudante" required placeholder="Digite seu nome" value={displayNameEstudante} onChange={(e) => setDisplayNameEstudante(e.target.value)} />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email" name="emailEstudante" required placeholder="Digite seu e-mail" value={emailEstudante} onChange={(e) => setEmailEstudante(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="passwordEstudante" required placeholder="Digite sua senha" value={passwordEstudante} onChange={(e) => setPasswordEstudante(e.target.value)} />
        </label>
        <label>
          <span>Confirmar Senha:</span>
          <input type="password" name="confirmPasswordEstudante" required placeholder="Confirme sua senha" value={confirmPasswordEstudante} onChange={(e) => setConfirmPasswordEstudante(e.target.value)} />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default RegisterEstudante