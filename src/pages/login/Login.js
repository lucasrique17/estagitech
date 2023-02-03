
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    console.log(authError);
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (

<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-blue-200 mt-5">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-gray-500 sm:text-3xl mb-5">
      Cadastro disponível apenas para professores e empresas interessadas em disponibilizar vagas de estágio!!!
    </h1>
    <h1 className="text-center text-2xl font-bold text-black sm:text-3xl">
      Login
    </h1>

    <p className="mx-auto mt-4 max-w-md text-center text-black">
    Faça o login para poder utilizar o sistema!
    </p>

    <form onSubmit={handleSubmit} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
      <p className="text-lg font-medium text-black text-center">Entre em sua conta!</p>

      <div>
        <label for="email" className="text-sm font-medium text-black">E-mail</label>

        <div className="relative mt-1">
          <input
            type="email" name="email" required placeholder="E-mail do usuário" onChange={(e) => setEmail(e.target.value)} value={email}
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
          />
        </div>
      </div>

      <div>
        <label for="password" className="text-sm font-medium text-black">Senha</label>

        <div className="relative mt-1">
          <input
            type="password" name="password" required placeholder="Insira a senha" onChange={(e) => setPassword(e.target.value)} value={password}
            className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm text-black"
          />
        </div>
      </div>

      {!loading && <button className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white font-bold mt-4 hover:bg-green-800">Entrar</button>}
      {loading && (<button className="block w-full rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white font-bold hover:bg-green-800" disabled> Aguarde...</button>)}
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
    </form>
  </div>
</div>

  );

};

export default Login;