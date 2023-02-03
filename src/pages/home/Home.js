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

  <div class="bg-blue-100 p-0 m-0 flex flex-col items-center justify-center">
    <h1 class="font-bold text-4xl	mt-4">
      Veja as vagas mais recentes!
    </h1>
    <form onSubmit={handleSubmit} class="max-w-full	w-2/3	flex justify-center mb-8 mt-4">

      <input type="text" placeholder='Pesquise seus interesses...' onChange={(e) => setQuery(e.target.value)}class="mr-2.5 w-2/4 rounded-2xl border-1 outline-none"/>

      <button class="bg-black text-white text-center cursor-pointer rounded-2xl w-32	font-bold	border-none	p-2.5	text-base mr-2.5 w-2/4">Pesquisar</button>
    </form>

    <div>
      {loading && <p>Carregando...</p>}
      {posts && posts.map((post) => (<PostDetail key={post.id} post={post} /> ))}
      {posts && posts.length === 0 && (
        <div className="text-center">
          <p className='mb-6 text-2xl font-bold'>Não foram encontradas vagas!!!</p>
        </div>
      )}
      </div>

  </div>


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