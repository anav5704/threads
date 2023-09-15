"use client"

import { sidebarLinks } from "@/constants"
import { SignOutButton, SignedIn } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

function LeftBar(){
    const router = useRouter()
    const pathname = usePathname()

    return(
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-3 px-3">
                {sidebarLinks.map((link) => {
                    const active = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

                    return (
                        <Link href={link.route} key={link.label} className={`hover:bg-primary-500 transition-all duration-150 leftsidebar_link ${active && "bg-primary-500"}`}>
                            <Image src={link.imgURL} alt={link.label} width={25} height={25} />
                            <p className="text-light-1 max-lg:hidden">{link.label}</p>
                        </Link>
                    )}
                )}
            </div>
            <div className="mt-10 px-3">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                    <div className="w-full flex cursor-pointer mb-2 leftsidebar_link hover:bg-primary-500">
                        <Image src="/assets/logout.svg" alt="logout" width={25} height={25} />
                        <p className="text-light-2 max-lg:hidden">Log Out</p>
                    </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftBar