import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="btn bg-blue text-white font-sans">
          <span className="uppercase">MIXED</span>
          <span className="lowercase">Case</span>
          <span className="uppercase">Button</span>
        </div>
      </div>
    </main>
  )
}