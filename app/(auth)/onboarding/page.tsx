import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page(){
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (userInfo?.boarded) redirect("/");


    const userData = {
        id: user?.id,
        objectId: userInfo?.id,
        name: userInfo?.name || user?.firstName || "",
        username: userInfo?.username || user?.username,
        bio: userInfo?.bio || "", 
        image: userInfo?.image || user?.imageUrl
    }

    return(
        <main className="grid place-content-center h-screen">
            <div className="flex mx-auto max-w-3xl flex-col justify-start p-5">
                <h1 className="head-text">Onboarding</h1>
                <p className="mt-3 text-base-regular text-light-2">Complete your profile to start using Threads</p>
                <section className="mt-5 bg-dark-2 p-5 rounded-md">
                    <AccountProfile user={userData} btnTitle="Continue" />
                </section>
            </div>
        </main>
    )
}

export default Page