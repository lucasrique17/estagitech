import styles from "./RegisterEstudante.module.css";

import { useState, useEffect } from "react";

// HOOKS
import { useAuthenticationEstudante } from "../../hooks/useAuthenticationEstudante";


const RegisterEstudante = () => {

  const [displayNameEstudante, setDisplayNameEstudante] = useState("");
  const [emailEstudante, setEmailEstudante] = useState("");
  const [passwordEstudante, setPasswordEstudante] = useState("");
  const [confirmPasswordEstudante, setConfirmPasswordEstudante] = useState("");
  const [errorEstudante, setErrorEstudante] = useState("");

  const { createEstudante, errorEstudante: authErrorEstudante, loadingEstudante } = useAuthenticationEstudante();

  const handleSubmitEstudante = async (e) => {
    e.preventDefault();

    setErrorEstudante("");

    const estudante = {
      displayNameEstudante,
      emailEstudante,
      passwordEstudante,
    };

    if (passwordEstudante !== confirmPasswordEstudante) {
      setErrorEstudante("As senhas precisam ser iguais.");
      return;
    }

    const resEstudante = await createEstudante(estudante);

    console.log(resEstudante);
  };

  useEffect(() => {
    if (authErrorEstudante) {
      setErrorEstudante(authErrorEstudante);
    }
  }, [authErrorEstudante]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário e tenha acesso as melhores vagas de estágio!</p>

      <form onSubmit={handleSubmitEstudante}>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayNameEstudante" required placeholder="Digite seu nome" onChange={(e) => setDisplayNameEstudante(e.target.value)} value={displayNameEstudante} />
        </label>

        <label>
          <span>E-mail:</span>
          <input type="email" name="emailEstudante" required placeholder="Digite seu e-mail" onChange={(e) => setEmailEstudante(e.target.value)} value={emailEstudante} />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" name="passwordEstudante" required placeholder="Digite sua senha" onChange={(e) => setPasswordEstudante(e.target.value)} value={passwordEstudante} />
        </label>

        <label>
          <span>Confirmação de senha:</span>
          <input type="password" name="confirmPasswordEstudante" required placeholder="Confirme sua senha" onChange={(e) => setConfirmPasswordEstudante(e.target.value)} value={confirmPasswordEstudante} />
        </label>

        {!loadingEstudante && <button className="btn">Entrar</button>}
        {loadingEstudante && (
          <button className="btn" disabled>Aguarde...</button>
        )}
        {errorEstudante && <p className="error">{errorEstudante}</p>}
      </form>
    </div>
  );
};

export default RegisterEstudante