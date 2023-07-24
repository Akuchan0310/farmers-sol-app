import Image from 'next/image'
import { Navbar, Blog, Footer } from '@/components/index';
import '@/public/mangoes.jpg';
import '@/public/greenMangoes.jpg';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col min-h-screen items-center justify-between p-24 bg-bgGreen text-textLight ${inter.className}`}
    >
      <div className='fixed top-0'>
        <Navbar />
      </div>
      <section
        className="text-white h-screen text-center flex m-auto font-waterfall">
        Home Content
      </section>
      <section
        id="about"
        className="text-white h-screen text-center flex"
      >
        <h1 className="m-auto font-waterfall text-7xl text-white font-bold">
          About
        </h1>
      </section>
      <section>
        <Blog />
      </section>
      <Footer />
    </main>
  )
}
