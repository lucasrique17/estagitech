// CSS
import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

// HOOKS
import { useAuthenticationUser } from '../hooks/useAuthenticationUser';
import { useAuthenticationEstudante } from '../hooks/useAuthenticationEstudante';

// CONTEXT
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {

    const {user} =  useAuthValue()
    const {estudante} = useAuthValue()
    const {logoutUser} = useAuthenticationUser()
    const {logoutEstudante} = useAuthenticationEstudante()

  return <nav className={styles.navbar}>
    <NavLink className={styles.brand} to="/">
        Estagi<span>TECH</span>
    </NavLink>
    <ul className={styles.links_list}>
        <li>
            <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
        </li>
        {(!user || !estudante) && (
            <>
                <li>
                    <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : "")}>Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
                </li>
            </>
        )}
        {user && (
            <>
                <li>
                    <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : "")}>Novo Post</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : "")}>Dashboard</NavLink>
                </li>
            </>
        )}
        <li>
            <NavLink to="/sobre" className={({isActive}) => (isActive ? styles.active : "")}>Sobre</NavLink>
        </li>
        {(user || estudante) && (
            <li>
                <button onClick={(logoutUser || logoutEstudante)}>Sair</button>
            </li>
        )}
    </ul>
  </nav>
}

export default Navbar