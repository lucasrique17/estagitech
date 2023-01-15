import { Link } from 'react-router-dom'

// HOOKS
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

// COMPONENTES
import PostDetail from '../../components/PostDetail'


const Search = () => {

    const query = useQuery()
    const search = query.get('q')

    const {documents: posts} = useFetchDocuments('posts', search)

  return (
    <div className="flex items-center flex-col justify-center">
        <h1 className="text-3xl text-bold font-medium leading-6 text-black text-center mb-4 mt-3">Busca</h1>
        <div>
            {posts && posts.length === 0 && (
                <div className="text-center">
                    <p className='text-1xl text-bold font-medium leading-6 text-black text-center mt-1 flex justify-center mb-5'>Não foram encontradas vagas a partir da sua busca...</p>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post} /> ))}
        </div>
        <Link to="/" className='inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>Voltar</Link>
    </div>
  )
}

export default Search