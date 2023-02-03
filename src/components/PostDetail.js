import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
  
<div class="mb-8">

  <img
    src={post.image} alt={post.title}
    class="max-w-xl"
  />

    <h2 class="mb-3 mt-3 font-bold text-2xl">{post.title}</h2>
    <p class="italic text-lg">Criado por: {post.createdBy}</p>
    <div class='mb-3 mt-3 flex'>
      {post.tagsArray.map((tag) => (
                <p class='mr-2' key={tag}>
                    <span class='font-bold'>#</span>{tag}
                </p>
      ))}
    </div>
      <Link class="block w-full p-3 text-sm text-stone-50 text-center font-medium transition bg-green-600 rounded hover:scale-105 font-bold" to={`/posts/${post.id}`}> Ver mais informações </Link>
</div>
  )
}

export default PostDetail