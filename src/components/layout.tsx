import Link from "next/link";
import styles from "../styles/Layout.module.css";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const cerrarSesion = () => {
    deleteCookie("user");
    deleteCookie("token");
    router.push("/dashboard");
  };
  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Link href="/dashboard" className={styles.navlogo}>
              <Image
                src={"/logo-dom.png"}
                alt="Logo Domina"
                width={240}
                height={70}
              />
            </Link>
          </div>
          <ul className={styles.links}>
            <div className={styles.menu}>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/users">Usuarios</Link>
              </li>
              <li>
                <Link href={""} onClick={cerrarSesion}>
                  Cerrar Sesión
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={50}
            height={50}
            className={styles.logo}
          />
        </a>
      </footer>
    </>
  );
}
