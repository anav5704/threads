import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment"
import { fetchThreadById } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface Props {
    params: {
        id: string
    }
}

const Page = async ({ params }: Props) => {
    if (!params.id) return null
    const user = await currentUser()
    if (!user) return null

    const userInfo = await fetchUser(user.id)
    if (!userInfo?.boarded) redirect("/onboarding")

    const thread = await fetchThreadById(params.id)

    return (
        <section className="relative">
            <div className="mt-5">
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread?.parentId}
                    content={thread.text}
                    author={thread.author}
                    commmunity={thread.commmunity}
                    createdAt={thread.createdAt}
                    commments={thread.children}
                />
            </div>
            <div className="mt-5">
                <Comment 
                    threadId={thread.id} 
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-5">
                {thread.children.map((comment: any) => (
                     <ThreadCard
                     key={comment._id}
                     id={comment._id}
                     currentUserId={user?.id || ""}
                     parentId={comment?.parentId}
                     content={comment.text}
                     author={comment.author}
                     commmunity={comment.commmunity}
                     createdAt={comment.createdAt}
                     commments={comment.children}
                     isComment
                 />
                ))}
            </div>
        </section>
    )
}
export default Page