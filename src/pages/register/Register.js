import { Link } from 'react-router-dom'

import photo from "../../images/photo2.jpg"

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    
<section className="bg-blue-200">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12 mt-5">
    <aside
      className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="Pattern"
        src={photo}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      aria-label="Main"
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">

        <h1
          className="mt-0 text-2xl font-bold text-black text-center sm:text-3xl md:text-4xl"
        >
          Bem-vindo ao EstagiTECH!
        </h1>

        <p className="mt-3 leading-relaxed text-black text-center">
        Cadastre-se e ofereça as melhores vagas de estágio!
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              for="FirstName"
              className="block text-sm font-medium text-black"
            >
              Nome
            </label>

            <input
              type="text" name="displayName" required placeholder="Digite seu nome" onChange={(e) => setDisplayName(e.target.value)} value={displayName}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label for="Email" className="block text-sm font-medium text-black">
              E-mail
            </label>

            <input
              type="email" name="email" required placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)} value={email}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="Password"
              className="block text-sm font-medium text-black"
            >
              Senha
            </label>

            <input
              type="password" name="password" required placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} value={password}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              for="PasswordConfirmation"
              className="block text-sm font-medium text-black"
            >
              Confirmar senha
            </label>

            <input
             type="password" name="confirmPassword" required placeholder="Confirme sua senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm"
            />
          </div>


          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

          {!loading && <button className="align-center shrink-0 rounded-md border border-green-400 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring font-bold" >Criar conta</button>}
          {loading && (
          <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-800 hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 font-bold" disabled>Aguarde...</button>
          )}
          <p className="mt-4 text-sm text-black  sm:mt-0">
              Já tem uma conta? 
              <Link to='/login' className="text-blue-800 underline">Entrar</Link>
          </p>
          {error && 
            <div role="alert" class="rounded border-l-4 border-red-500 bg-red-50 p-4">
              <div class="flex items-center gap-2 text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>
            
                <strong class="block font-medium">{error}</strong>
              </div>
            </div>
          }   
            
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
  );
};

export default Register;   