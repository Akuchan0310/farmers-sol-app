/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Login() {
  return (
    <main
      className="bg-bgGreen w-screen text-textLight min-h-screen flex flex-col min-h-screen items-center justify-between"
    >
      <nav className="w-full bg-black text-white md:text-black md:bg-bgLight fixed top-0 left-0 right-0 z-10">
        <ul className="justify-between px-4 py-6 mx-auto lg:max-w-7xl md:items-center md:flex">
          <li className=" hover:bg-textLight border-textLight transition duration-4000 md:hover:text-textLight md:hover:bg-transparent"><Link href="/">← Bact to Home</Link></li>
          <li><img className="logo" src="logo.png" alt="logo" /></li>
        </ul>
      </nav>
      <section className="form">
        <header className="m-auto text-center font-waterfall text-xl text-textPink font-bold">
          <h1>Login to <span className="text-cyan-600 text-3xl">FarmDidi.</span></h1>
        </header>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required /><br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required /><br />
          <input type="submit" value="Login" />
        </form>
        <div>
          Don&apos;t have an account? <Link href="register.html">Register here</Link>.
        </div>
      </section>
      <div>
        <img src="loginpage.png" alt="loginpage" />
      </div>
    </main>
  )
}