import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.boarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id)

    return (
      <section>   
          <h1 className="mb-5 head-text">Activity</h1>
          <section className="mt-5 flex flex-col gap-5">
          {activity.length > 0 ? (
            <>
              {activity.map((act) => (
                <Link key={act._id} href={`/thread/${act.parentIt}`}>
                  <article className="activity-card">
                    <Image src={act.author.image} alt="profile image" height={45} width={45} className="rounded-full object-cover"/>
                    <p className="!base-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">{act.author.name}</span>{" "}
                      replied to your thread.
                    </p>
                  </article>
                </Link>
              ))}
            </>
          ) : ( 
            <p className="!text-base-regular text-light-3">You don't have any notifications</p>
          )}
          </section>
      </section>
    )
  }
  
  export default Page
  