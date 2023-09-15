"use client"

import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"


function BottomBar(){
    const pathname = usePathname()

    return(
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map(link => {
                    const active = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

                    return (
                    <Link href={link.route} key={link.label} className={`hover:bg-primary-500 transition-all duration-150 bottombar_link ${active && "bg-primary-500"}`}>
                        <Image src={link.imgURL} alt={link.label} width={25} height={25} />
                        <p className="text-light-1 max-lg:hidden">{link.label}</p>
                    </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default BottomBar