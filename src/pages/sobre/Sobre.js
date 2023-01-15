import {Link} from "react-router-dom";

import photo from "../../images/si_frutal.png"

const Sobre = () => {
  return (

    <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-blue-200 px-4 py-5 sm:p-6">
                  <h1 className="text-4xl text-bold font-medium leading-6 text-black text-center mb-5">Sobre o EstagiTECH</h1>
                  <p className='text-1xl text-bold font-medium leading-6 text-black text-center mt-1 flex justify-center mb-3'>Este WebAPP foi desenvolvido com o intuito de ajudar alunos do curso de sistemas de informação da UEMG (Univerdidade do Estado de Minas Gerais) a terem acesso mais fácil as vagas disponiveis de estágio na região ou remotas!</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <img className="" src={photo} alt="" />
                    </div>
                  </div>
                </div>
                <div className="bg-blue-200 px-4 py-3 text-right sm:px-6">
                  <Link to="/" className='inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>Voltar</Link>
                </div>
              </div>
          </div>
        </div>
      </div>

    /*<div className={styles.sobre}>
        <h2>Sobre o Estagi<span>TECH</span></h2>
        <p>Este WebAPP foi desenvolvido com o intuito de ajudar alunos do curso de sistemas de informação da UEMG (Univerdidade do Estado de Minas Gerais) a terem acesso mais fácil as vagas disponiveis de estágio na região ou remotas!</p>
    </div>*/
  )
}

export default Sobre