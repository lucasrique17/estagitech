// HOOKS
import { useAuthentication } from '../hooks/useAuthentication';

// CONTEXT
import { useAuthValue } from "../context/AuthContext";
import { NavLink } from 'react-router-dom';


const Navbar = () => {

    const {user} =  useAuthValue()
    const {logout} = useAuthentication()

  return (

<header aria-label="Site Header" class="bg-blue-400">
  <div
    class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
  >
    <a class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75 font-bold" href="/">
      EstagiTECH
    </a>

    <div class="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" class="hidden md:block">
        <ul class="flex items-center gap-6 text-sm">
            {!user && (
                <>
                    <li>
                        <NavLink class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/login"> Login </NavLink>
                    </li>
                </>
            )}

            {!user && (
                <>
                    <li>
                        <NavLink class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/register"> Cadastrar </NavLink>
                    </li>
                </>
            )}

            {user && (
                <>
                    <li>
                        <NavLink class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/posts/create"> Publicar </NavLink>
                    </li>
                </>
            )}

            {user && (
                <>
                    <li>
                        <NavLink class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/dashboard"> Dashboard </NavLink>
                    </li>
                </>
            )}

            <li>
                <NavLink class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" to="/sobre"> Sobre </NavLink>
            </li>

            {user && (
                <>
                    <li>
                        <NavLink onClick={logout} class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"> Sair </NavLink>
                    </li>
                </>
            )}
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <button
          class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

  )
}

export default Navbar