import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs"
// import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchPosts(1, 30)
  const user = await currentUser()

  return (
    <div>
      {/* <UserButton afterSignOutUrl="/"/> */}
      <>
        <h1 className="text-left head-text">Home</h1>
        <section className="mt-5 flex flex-col gap-5">
          {result.posts.length === 0 ? (
            <p className="no-result">No threads found</p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post?.parentId}
                  content={post.text}
                  author={post.author}
                  commmunity={post.commmunity}
                  createdAt={post.createdAt}
                  commments={post.children}
                />
              ))}
            </>
          )}
        </section>
      </>
    </div>
  );
}