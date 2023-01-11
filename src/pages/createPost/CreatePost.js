// CSS
import styles from './CreatePost.module.css'

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocuments } from '../../hooks/useInsertDocument'
import { ref } from 'firebase/storage';
import { storage } from "../../firebase/config"


const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocuments('posts') 

  function salvarImagemFirebase() {

    const imagemRef = ref(storage, 'imagem.png')

    const imagemPostsRef = ref(storage, 'posts/imagem.png')

    if (imagemRef.title) {
      return imagemRef.title === imagemPostsRef.title; 
    }
    if(imagemRef.fullPath){
      return imagemRef.fullPath === imagemPostsRef.fullPath; 
    }


    /*const nomeImagem = 'imagem1'

    const upload = ref(storage).child(imagemPostsRef).child(imagemRef).put(image);

    upload.on(
      "state_changed",
      function() {

        console.log("Deu certo");

      },
      function(formError) {

        console.log("Deu errado");

      }

      try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }
    )*/

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError('')

    // IMAGEM
    salvarImagemFirebase()

    // ARRAY DAS TAGS
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    // CHECAR VALORES

    if(!title || !image || !body || !tags) {
      setFormError('Por favor, preencha todos os campos!')
    }

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // REDIRECIONAR A PAGINA HOME
    navigate('/')

  }


  return (
    <div className={styles.create_post}>
      <h2>Novo estágio</h2>
      <p>Insira as melhores vagas de estágio!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título da vaga</span>
          <input type="text" name="text" placeholder="Insira o título da vaga" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>Imagem</span>
          <input type="file" name="image" placeholder="Caso tenha, insira uma imagem da vaga" onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <label>
          <span>Descrição</span>
          <textarea name="body" placeholder="Insira a descrição sobre a vaga" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input type="text" name="tags" placeholder="Insira tags separadas por vírgula, como: front-end, redes, java" onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        {!response.loading && <button className="btn">Postar</button>}
        {response.loading && (<button className="btn" disabled>Aguarde...</button>)}
        {(response.error || formError) && (<p className="error">{response.error || formError}</p>)}
      </form>
    </div>
  );
};


export default CreatePost