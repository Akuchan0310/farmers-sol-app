/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Login() {
    return (
        <>
        <main>
            <nav>
                <ul>
                <li><Link href="/">← Bact to Home</Link></li>
                </ul>
                <img className="logo" src="logo.png" alt="logo" />
            </nav>
            <section className="form">
            <header>
              <h1>Login</h1>
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
        <footer>
          <p>&copy; 2023 Recruitment Solution. All rights reserved.</p>
        </footer>      
        </>
    )
}