// CSS
import styles from './Search.module.css'

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
    <div className={styles.search_container}>
        <h1>Busca</h1>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontradas vagas a partir da sua busca...</p>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post} /> ))}
        </div>
        <Link to='/' className='btn btn-dark'>Voltar</Link>
    </div>
  )
}

export default Search