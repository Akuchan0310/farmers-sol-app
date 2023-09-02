import Image from 'next/image'
import { Navbar, Blog, Footer } from '@/components/index';
import '@/public/mangoes.jpg';
import '@/public/greenMangoes.jpg';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="bg-bgGreen w-screen text-textLight min-h-screen">
        <Navbar />
      <main
        className={`flex flex-col min-h-screen items-center justify-between ${inter.className}`}
      >
        <section
          className="h-screen text-center flex font-waterfall"
        >
          <h1 className="m-auto font-waterfall text-7xl text-textLight font-bold">
            Home
          </h1>
        </section>
        <section
          id="about"
          className="w-full h-screen text-center flex bg-bgLight"
        >
          <h1 className="m-auto font-waterfall text-7xl text-textPink font-bold">
            About
          </h1>
        </section>
        <Blog />
      </main>
      <section className='bottom-0 bg-bgLight'>
        <Footer />
      </section>
    </div>
  )
}
