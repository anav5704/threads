import "../globals.css"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import TopBar from "../../components/shared/TopBar"
import LeftBar from "../../components/shared/LeftBar"
import RightBar from "../../components/shared/RightBar"
import BottomBar from "../../components/shared/BottomBar"

export const metadata = {
    title: "Threads",  
    description: "A clone of threads by instagram"
}

const inter = Inter({ subsets: ["latin"] }) // Next JS font import from goole fonts 

export default function RootLayout({ children } : { children: React.ReactNode }){
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    <TopBar />
                    <main className="flex flex-row">
                        <LeftBar />
                        <section className="main-container">
                            <div className="w-full max-w-4xl">
                            { children }
                            </div>
                        </section>
                        <RightBar />
                    </main>
                    <BottomBar />
                </body>
            </html>
        </ClerkProvider>
    )
} 