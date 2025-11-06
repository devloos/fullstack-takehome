import type { GetUsersQuery } from "../__generated__/graphql";

export function PostDetails({ posts }: { posts: GetUsersQuery['users'][0]['posts'] }) {
  return (
    <div className="group relative">
      <span className="cursor-pointer">{posts.length}</span>
      <div className="hidden group-hover:block absolute top-0 left-0 bg-gray-700 p-2 rounded-sm w-80 z-10">
        {posts.map((post) => (
          <div key={post.id} className="border border-gray-300 rounded-sm p-1 px-2 mb-1">
            {post.title}
          </div>
        ))}
      </div>
    </div>
  )
}