import styles from "./Register.module.css";

import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <ul>
        <li>
            <button><NavLink to="/registerEstudante" className={({isActive}) => (isActive ? styles.active : "")}>Aluno</NavLink></button>
        </li>
        <li>
            <button><NavLink to="/registerUser" className={({isActive}) => (isActive ? styles.active : "")}>Empresa/Professor</NavLink></button>
        </li>
    </ul>
  )
}

export default Register