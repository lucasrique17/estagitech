import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'

// HOOKS
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {

    const {id} = useParams()
    const {document: post, loading} = useFetchDocument('posts', id)

  return (
    
    <div className="bg-blue-100 text-center">
          {loading && <p>Carregando Post...</p>}
          {post && (
          <>
            <h1 className="mt-2 mb-4 font-bold	text-5xl	">{post.title}</h1>
            <img className="" src={post.image} alt={post.title} />
            <h3 className="mt-4 font-bold text-xl	">Descrição da vaga:</h3>
            <p className='text-lg'>{post.body}</p>
            <h3 className="mt-4 mb-2 font-bold	text-xl">Esta vaga tem o foco em:</h3>
            <div className="flex justify-center mb-4">
              {post.tagsArray.map((tag) => (
                <p className='text-lg' key={tag}><span class='font-bold'>#</span>{tag}</p>
              ))}
            </div>
                  <Link to="/" className='inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-3 mb-5'>Voltar</Link>
          </>
          )}
    </div>

    /*<div className={styles.post_container}>
        {loading && <p>Carregando Post...</p>}
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <p>{post.body}</p>
                <h3>Esta vaga tem o foco em:</h3>
                <div className={styles.tags}>
                    {post.tagsArray.map((tag) => (
                        <p key={tag}><span>#</span>{tag}</p>
                    ))}
                </div>
                <Link to='/' className='btn btn-dark'>Voltar</Link>
            </>
        )}
    </div>*/
  )
}

export default Post