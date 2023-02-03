import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocuments } from '../../hooks/useInsertDocument'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocuments('posts') 

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError('')

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

  //IMAGENS


  var fbBucketName = 'posts';

  // get elements
  //var uploader = document.getElementById('uploader');
  function UploadImagem(e) {

    // what happened
    console.log('file upload event', e);
  
    // get file
    var file = e.target.files[0];
  
    console.info(file)
    // create a storage ref
    const storageRef = ref(storage, fbBucketName +'/'+ file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    // update progress bar
    uploadTask.on('state_changed', // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setImage(downloadURL)
           })
        }
  
  
    )
  
  };
  return (

      <div className="bg-blue-100 p-0 m-0 flex flex-col items-center justify-center my-0	mx-auto	">
        
        <h1 className="mt-5 font-bold	text-5xl mb-3">Novo estágio</h1>
        <p className='mt-2 text-2xl mb-5'>Insira as melhores vagas de estágio!</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first-name" className="flex flex-col mb-1.5 font-bold	text-left text-lg">Título da vaga</label>
          <input type="text" name="text" placeholder="Insira o título da vaga" onChange={(e) => setTitle(e.target.value)} value={title} className="box-border	border-b-2 border-solid	border-blue-800	rounded w-full mb-4"/>

          <label htmlFor="email-address" className="flex flex-col mb-1.5 font-bold	text-left text-lg">Imagem</label>
          <input id='uploader' type="file" name="image" placeholder="Caso tenha, insira uma imagem da vaga" onChange={(e)=> {UploadImagem(e)}} className="box-border	border-b-2 border-solid	border-blue-800	rounded w-full mb-4"/>

          <label htmlFor="country" className="flex flex-col mb-1.5 font-bold	text-left text-lg">Descrição da vaga</label>
          <textarea name="body" placeholder="Insira a descrição sobre a vaga" onChange={(e) => setBody(e.target.value)} value={body} className="box-border	border-b-2 border-solid	border-blue-800	rounded w-full mb-4"></textarea>

          <label htmlFor="street-address" className="flex flex-col mb-1.5 font-bold	text-left text-lg">Tags</label>
          <textarea type="text" name="tags" placeholder="Insira tags separadas por vírgula, como: front-end, redes, java" onChange={(e) => setTags(e.target.value)} value={tags} className="box-border	border-b-2 border-solid	border-blue-800	rounded w-full mb-10"></textarea>

          {!response.loading && <button className="bg-green-600 hover:bg-green-800 text-white mt-0	mr-1.5 py-3 px-10 rounded-md text-base font-bold w-full mb-5">Postar</button>}
          {response.loading && (<button className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" disabled>Aguarde...</button>)}
          {(response.error || formError) &&
            <div role="alert" class="rounded border-l-4 border-red-500 bg-red-50 p-4">
              <div class="flex items-center gap-2 text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">

                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>          
                </svg>
                    
                <strong class="block font-medium">{response.error || formError}</strong>
              </div>
            </div>
          }   
        </form>
      </div>
 


    /*<div className={styles.create_post}>
      <h2>Novo estágio</h2>
      <p>Insira as melhores vagas de estágio!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título da vaga</span>
          <input type="text" name="text" placeholder="Insira o título da vaga" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>Imagem</span>
          <input id='uploader' type="file" name="image" placeholder="Caso tenha, insira uma imagem da vaga" onChange={(e)=> {UploadImagem(e)}}  />
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
    </div>*/
  );
};


export default CreatePost