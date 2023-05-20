import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import styles from "../styles/Login.module.css";

type Inputs = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const create: SubmitHandler<Inputs> = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/user/create`,
        data
      );

      if (response.status == 201) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.encabezado}>
          <Image
            src="/logo-dom.png"
            alt="Logo Domina"
            width={240}
            height={70}
          />{" "}
          <h2>Registrate</h2>
        </div>
        <form onSubmit={handleSubmit(create)}>
          <input
            placeholder="Nombre"
            {...register("name", { required: true })}
          />
          {errors?.name && (
            <span className={styles.span}>El nombre es requerido</span>
          )}
          <input
            placeholder="Usuario"
            {...register("username", { required: true })}
          />
          {errors?.username && (
            <span className={styles.span}>El usuario es requerido</span>
          )}
          <input
            placeholder="Correo"
            type="email"
            {...register("email", { required: true })}
          />
          {errors?.name && (
            <span className={styles.span}>El nombre es requerido</span>
          )}
          <input placeholder="Telefono" type="number" {...register("phone")} />
          <input
            placeholder="Contraseña"
            type="password"
            {...register("password", { required: true })}
          />
          {errors?.password && (
            <span className={styles.span}>La contraseña es requerida</span>
          )}

          <button type="submit">Crear</button>
        </form>
      </div>
    </div>
  );
}
