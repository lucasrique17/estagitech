// CSS
import styles from "./Sobre.module.css";

import Image from "../../imagens/uemg_frutal.jpg"

const Sobre = () => {
  return (
    <div className={styles.sobre}>
        <h2>Sobre o Estagi<span>TECH</span></h2>
        <p>Este WebAPP foi desenvolvido com o intuito de ajudar alunos do curso de sistemas de informação da UEMG (Univerdidade do Estado de Minas Gerais) a terem acesso mais fácil as vagas disponiveis de estágio na região ou remotas!</p>
        <img src={Image} />
    </div>
  )
}

export default Sobre