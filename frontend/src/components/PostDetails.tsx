import type { GetUsersQuery } from "../__generated__/graphql";

export function PostDetails({ posts }: { posts: GetUsersQuery['users'][0]['posts'] }) {
  return (
    <div className="group relative">
      <span className="cursor-pointer underline underline-offset-2">{posts.length}</span>
      <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity absolute top-0 left-0 bg-gray-700 p-2 rounded-sm w-80 z-10">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-300 rounded-sm p-1 px-2 mb-1">
            <h4 className="font-medium">{post.title}</h4>
            <p className="text-xs text-gray-300">{post.content ?? 'No content'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}