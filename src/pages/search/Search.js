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
    <div className="bg-blue-100 p-0 m-0 flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl mt-4 mb-5">Busca</h1>
        <div>
            {posts && posts.length === 0 && (
                <div className="text-center">
                    <p className='mb-6 text-2xl font-bold'>Não foram encontradas vagas a partir da sua busca...</p>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post} /> ))}
        </div>
        <Link to="/" className='inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mb-5 mt-3'>Voltar</Link>
    </div>
  )
}

export default Search