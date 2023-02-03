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

    <div className="bg-blue-100 text-center flex flex-col	justify-center items-center">
            <h1 className="text-4xl	mb-3 mt-3 font-bold">Dashboard</h1>
            <p className="text-lg">Gerencie as suas vagas!</p>
            {posts && posts.length === 0 ? (
              <div className="text-center">
                <p class='mb-5 mt-3 font-bold	text-lg	'>Não foram encontradas vagas...</p>
                <Link to='/posts/create' className='bg-green-600 hover:bg-green-800 text-white mt-0	mr-1.5 py-3 px-10 rounded-md text-base font-bold'>Criar primeira vaga</Link>
              </div>
            ) : (
              <div className="flex justify-between font-bold border-b-2	border-solid border-black	w-10/12 p-2.5">
                <span>Título</span>
                <span>Ações</span>
              </div>
            )}
  
            {posts && posts.map((post) => (
              <div className="flex justify-between items-center	border-b-2 border-solid border-black w-10/12 p-2.5" key={post.id}>
                <p className="">{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="bg-green-600 hover:bg-green-800 text-white mt-0	mr-1.5 py-3 px-10 rounded-md text-base font-bold">Ver</Link>
                  <Link to={`/posts/edit/${post.id}`} className="bg-yellow-600 hover:bg-yellow-800 text-white mt-0	mr-1.5 py-3 px-10 rounded-md text-base font-bold">Editar</Link>
                  <button onClick={() => deleteDocument(post.id)} className="bg-red-600 hover:bg-red-800 text-white mt-0	mr-1.5 py-3 px-10 rounded-md text-base font-bold">Excluir</button>
                </div>
              </div>
            ))}
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