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

<div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-blue-200 px-4 py-5 sm:p-6">
                  <h1 className="text-4xl text-bold font-medium leading-6 text-black text-center mb-3">Novo estágio</h1>
                  <p className='text-1xl text-bold font-medium leading-6 text-black text-center mb-5'>Insira as melhores vagas de estágio!</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="first-name" className="block text-sm font-medium text-black">
                      Título da vaga
                      </label>
                      <input
                        type="text" name="text" placeholder="Insira o título da vaga" onChange={(e) => setTitle(e.target.value)} value={title}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Imagem
                      </label>
                      <input
                        id='uploader' type="file" name="image" placeholder="Caso tenha, insira uma imagem da vaga" onChange={(e)=> {UploadImagem(e)}}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Descrição da vaga
                      </label>
                      <textarea name="body" placeholder="Insira a descrição sobre a vaga" onChange={(e) => setBody(e.target.value)} value={body} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Tags
                      </label>
                      <input
                        type="text" name="tags" placeholder="Insira tags separadas por vírgula, como: front-end, redes, java" onChange={(e) => setTags(e.target.value)} value={tags}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-blue-200 px-4 py-3 text-right sm:px-6">
                  {!response.loading && <button className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Postar</button>}
                  {response.loading && (<button className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-3 px-10 text-sm font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" disabled>Aguarde...</button>)}
                  {(response.error || formError) &&
                    <div role="alert" class="rounded border-l-4 border-red-500 bg-red-50 p-4">
                      <div class="flex items-center gap-2 text-red-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-5 w-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clip-rule="evenodd"
                          />
                        </svg>
                    
                        <strong class="block font-medium">{response.error || formError}</strong>
                      </div>
                    </div>
                  }   
                </div>
              </div>
            </form>
          </div>
        </div>
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