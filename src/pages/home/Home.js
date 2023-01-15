// HOOKS
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'


// COMPONENTES
import PostDetail from '../../components/PostDetail'

const Home = () => {

  const navigate = useNavigate();
  const {documents: posts, loading} = useFetchDocuments('posts')

  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (

<section class="bg-blue-200">
  <div class="p-5 md:p-12 lg:px-16 lg:py-24 mt-5">
    <div class="mx-auto max-w-lg text-center">
      <h2 class="text-2xl font-bold text-black md:text-3xl">
        Veja as vagas mais recentes!
      </h2>
    </div>

    <div class="mx-auto mt-4 mb-5 max-w-xl">
      <form onSubmit={handleSubmit} class="sm:flex sm:gap-4">
        <div class="sm:flex-1">

          <input
            type="text" placeholder='Pesquise seus interesses...' onChange={(e) => setQuery(e.target.value)}
            class="w-full rounded-md border-black bg-white p-3 text-blck shadow-sm transition focus:border-blue-800 focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          class="group mt-2 flex w-full items-center justify-center rounded-md bg-gray-800 hover:bg-black px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
        >
          <span class="text-sm font-medium"> Pesquisar </span>

        </button>
      </form>
    </div>
    {loading && <p>Carregando...</p>}
          {posts && posts.map((post) => (<PostDetail key={post.id} post={post} /> ))}
          {posts && posts.length === 0 && (
            <div className="text-center">
              <p className='text-3xl text-bold font-medium leading-6 text-black text-center mt-1 flex justify-center'>Não foram encontradas vagas!!!</p>
            </div>
          )}
  </div>
</section>


  /*<div className="flex items-center flex-col justify-center">
        <h1 className="text-2xl text-bold font-medium leading-6 text-black text-center mb-2 mt-3">Veja as vagas mais recentes!</h1>
        <form onSubmit={handleSubmit} className="max-w-full w-3/5 flex justify-center mb-3">
          <input className='w-2/4 mr-2.5 rounded-md' type="text" placeholder='Pesquise seus interesses...' onChange={(e) => setQuery(e.target.value)} />
          <button className='inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>Pesquisar</button>
        </form>
        <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.map((post) => (<PostDetail key={post.id} post={post} /> ))}
          {posts && posts.length === 0 && (
            <div className="text-center">
              <p className='text-3xl text-bold font-medium leading-6 text-black text-center mt-1 flex justify-center'>Não foram encontradas vagas!!!</p>
            </div>
          )}
        </div>
    </div>*/
  )
}

export default Home