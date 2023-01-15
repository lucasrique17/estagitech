import {Link} from 'react-router-dom'

// HOOKS
import {useAuthValue} from '../../context/AuthContext'
import {useFetchDocuments} from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {

  const {user} = useAuthValue()
  const uid = user.uid

  // EXIBE POSTS DO USUÁRIO
  const {documents: posts, loading} = useFetchDocuments('posts', null, uid)

  // DELETA USUARIOS
  const {deleteDocument} =  useDeleteDocument('posts')

  if(loading) {
    return <p>Carregando...</p>
  }

  return (

    <div className="min-h-full">

        <header className="bg-blue-200 shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 mt-5">
            <h1 className="text-3xl font-bold tracking-tight text-black">Dashboard</h1>
            <p className="text-1xl tracking-tight text-black">Gerencie as suas vagas!</p>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-blue-200">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-2 border-dashed border-black">
                {posts && posts.length === 0 ? (
                <div className="text-center flex flex-col justify-center items-center">
                  <p>Não foram encontradas vagas...</p>
                  <Link to='/posts/create' className='btn'>Criar primeira vaga</Link>
                </div>
                ) : (
                  <div className="flex justify-between font-bold border-b-2 border-dashed border-black p-2.5">
                    <span>Título</span>
                    <span>Ações</span>
                  </div>
                )}
  
                {posts && posts.map((post) => (
                    <div className="flex justify-between items-center border-b-2 border-dashed border-black p-2.5" key={post.id}>
                      <p className="font-bold">{post.title}</p>
                      <div>
                        <Link to={`/posts/${post.id}`} className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Ver</Link>
                        <Link to={`/posts/edit/${post.id}`} className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">Editar</Link>
                        <button onClick={() => deleteDocument(post.id)} className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Excluir</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    /*<div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie as suas vagas!</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontradas vagas...</p>
            <Link to='/posts/create' className='btn'>Criar primeira vaga</Link>
          </div>
        ) : (
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
        )}
  
        {posts && posts.map((post) => (
            <div className={styles.post_row} key={post.id}>
              <p>{post.title}</p>
              <div className={styles.actions}>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
              </div>
            </div>
          ))}
      </div>*/
    )
  }

export default Dashboard