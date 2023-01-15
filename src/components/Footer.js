import photo from "../images/uemg-campus-frutal.png"

const Footer = () => {
  return (
  
<footer aria-label="Site Footer" class="bg-blue-400 lg:grid lg:grid-cols-5">
  <div class="relative block h-32 lg:col-span-2 lg:h-full">
    <img
      src={photo}
      alt=""
      class="absolute inset-0 object-cover w-full h-full"
    />
  </div>

  <div class="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
    <div class="mt-12 text-xs text-white sm:mt-0">
      <div class="sm:flex sm:items-center sm:justify-center">
        <div>
          <p>
            <span class="text-xs tracking-wide text-white font-bold" >
              EstagiTECH
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="mt-8 text-xs text-white sm:mt-0">
      <div class="sm:flex sm:items-center sm:justify-center">
        <div>
          <p>
            <span class="text-xs tracking-wide text-white font-bold" >
              As melhores vagas de estágio para alunos de Sistemas de Informação da UEMG Frutal-MG!
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="pt-12 mt-12 border-t border-gray-100">
      <div class="sm:flex sm:items-center sm:justify-center">
        <p class="mt-8 text-xs text-white sm:mt-0 font-bold">
          &copy; 2023. EstagiTECH. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </div>
</footer>

  )

  /*<footer className={styles.footer}>
    <h3>As melhores vagas de estágio para alunos de Sistemas de Informação da UEMG Frutal-MG!</h3>
    <p>ESTAGITECH &copy; 2023</p>
  </footer>*/
}

export default Footer