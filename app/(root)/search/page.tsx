import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.boarded) redirect("/onboarding");

  const result = await fetchUsers({ userId: user.id,  query: "",  pageNumber: 1,  pageSize: 20})

return (
    <section>   
        <h1 className="mb-5 head-text">Search</h1>
        {/* search  bar */}
        <div className="mt-5 flex flex-col gap-5">
            {result.users.length === 0 ? (
                <p className="no-result">No users foung</p>
            ) : (
                <>
                {result.users.map((person) => (
                    <UserCard 
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        username={person.username}
                        imgUrl={person.image}
                        personType="User"
                    />
                ))}
                </>
            )}
        </div>
    </section>
  )
}

export default Page
