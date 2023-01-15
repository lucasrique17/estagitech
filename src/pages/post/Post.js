import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'

// HOOKS
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {

    const {id} = useParams()
    const {document: post, loading} = useFetchDocument('posts', id)

  return (
    
    <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
          {loading && <p>Carregando Post...</p>}
          {post && (
          <>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-blue-200 px-4 py-5 sm:p-6">
                  <h1 className="text-4xl text-bold font-medium leading-6 text-black text-center mb-5">{post.title}</h1>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <img className="" src={post.image} alt={post.title} />
                      <p className='text-2xl text-bold font-medium leading-6 text-black text-center mt-3'>{post.body}</p>
                      <h3 className="text-1xl text-bold font-medium leading-6 text-black text-center mt-4">Esta vaga tem o foco em:</h3>
                    </div>

                    <div className="col-span-6">
                    {post.tagsArray.map((tag) => (
                        <p className='text-1xl text-bold font-medium leading-6 text-black text-center mt-1 flex justify-center' key={tag}><span>#</span>{tag}</p>
                    ))}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-200 px-4 py-3 text-right sm:px-6">
                  <Link to="/" className='inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'>Voltar</Link>
                </div>
              </div>
          </>
          )}
          </div>
        </div>
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