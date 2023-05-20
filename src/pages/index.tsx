import Link from "next/link";

export default function Index() {
  return (
    <div className="">
      <h1>Bienvenido a esta pagina</h1>
      <Link href={"/login"}>Ir al Login</Link>
    </div>
  );
}
