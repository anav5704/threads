import Image from "next/image"
import Link from "next/link"

interface Props {
    key: string,
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author: {
        name: string,
        image: string,
        id: string,
    },
    commmunity: {
        name: string,
        image: string,
        id: string,
    } | null,
    createdAt: string,
    commments: {
        author: {
            image :string
        }
    }[],
    isComment? : boolean
}

const ThreadCard = ({ id, currentUserId, parentId, content, author, commmunity, createdAt, commments, isComment }: Props) => {
    return (
        <article className={`w-full flex flex-col rounded-lg ${isComment ? "px-0 xs:px-7" : "bg-dark-2  p-5"}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-12 w-12">
                            <Image src={author.image} alt="profile image" fill className="cursor-pointer rounded-full"/>
                        </Link>
                        <div className="thread-card_bar"/>
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">{content}</p>
                        <div className={`${isComment && "mb-5" } mt-5 flex flex-col gap-3`}>
                            <div className="flex gap-3">
                                <Image className="cursor-pointer object-contain" src="/assets/heart-gray.svg" alt="heart icon" width={24} height={24}/>
                                <Link href={`/thread/${id}`}>
                                    <Image className="cursor-pointer object-contain" src="/assets/reply.svg" alt="reply icon" width={24} height={24}/>
                                </Link>
                                <Image className="cursor-pointer object-contain" src="/assets/repost.svg" alt="repost icon" width={24} height={24}/>
                                <Image className="cursor-pointer object-contain" src="/assets/share.svg" alt="share icon" width={24} height={24}/>
                            </div>
                            { isComment && commments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{commments.length} replies</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadCard