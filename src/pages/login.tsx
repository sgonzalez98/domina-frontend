import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/appContext";
import { IContextType } from "@/types/types.context";
import { useSnackbar } from "notistack";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setUser } = useContext(AuthContext) as IContextType;

  const login: SubmitHandler<Inputs> = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/login`,
        data
      );
      const { access_token, user } = response.data;
      setCookie("token", access_token, { secure: true });
      setUser(user);

      if (response.status == 201) {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          enqueueSnackbar(error.response!.data.message, { variant: "error" });
        }
      } else {
        console.log(error);
        enqueueSnackbar("Error del sistema", { variant: "error" });
      }
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
          <h2>Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleSubmit(login)}>
          <input
            placeholder="Usuario"
            {...register("username", { required: true })}
          />
          {errors?.username && (
            <span className={styles.span}>El usuario es requerido</span>
          )}
          <input
            placeholder="Contraseña"
            type="password"
            {...register("password", { required: true })}
          />
          {errors?.password && (
            <span className={styles.span}>La contraseña es requerida</span>
          )}

          <button type="submit">Ingresar</button>
          <div className={styles.register}>
            <p>¿Aun no tienes una cuenta?</p>
            <Link href="/register">Registrate</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
