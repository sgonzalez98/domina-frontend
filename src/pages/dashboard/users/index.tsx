import axios, { AxiosError } from "axios";
import styles from "../../../styles/Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/appContext";
import { useSnackbar } from "notistack";
import { IContextType } from "@/types/types.context";
import { ITodo } from "@/types/types.todo";
import { getCookie } from "cookies-next";
import { IUser } from "@/types/types.user";

function Dashboard() {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const loadTodos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/user`,
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );

      setUsuarios(response.data);
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
  useEffect(() => {
    loadTodos();
  }, []);

  const deleteUsuario = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND}/user/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      loadTodos();
      enqueueSnackbar("Tarea eliminada con exito", { variant: "warning" });
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
      <h2>Usuarios</h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  className={styles.buttonDelete}
                  onClick={() => deleteUsuario(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
