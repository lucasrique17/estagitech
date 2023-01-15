import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
  
<div class="relative block overflow-hidden group mb-3">

  <img
    src={post.image} alt={post.title}
    class="object-cover w-full h-64 transition duration-500 group-hover:scale-105 sm:h-72 max-w-screen max-h-screen border-2"
  />

  <div class="relative p-6 bg-blue-300">

    <h1 class="mt-4 text-3xl font-medium text-gray-900 font-bold mb-3">{post.title}</h1>
    <span
      class="whitespace-nowrap bg-yellow-300 px-3 py-1.5 text-xs font-large"
    >
      Criado por: {post.createdBy}
    </span>

    <p class="mt-1.5 text-sm text-gray-700 font-bold">
      {post.tagsArray.map((tag) => (
                <p key={tag}>
                    <span>#</span>{tag}
                </p>
      ))}
    </p>

    <form class="mt-4">
      <Link class="block w-full p-3 text-sm text-stone-50 text-center font-medium transition bg-green-600 rounded hover:scale-105 font-bold" to={`/posts/${post.id}`}> Ver mais informações </Link>
    </form>
  </div>
</div>
  )
}

export default PostDetail