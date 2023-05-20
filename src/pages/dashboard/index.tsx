import axios, { AxiosError } from "axios";
import styles from "../../styles/Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/appContext";
import { useSnackbar } from "notistack";
import { IContextType } from "@/types/types.context";
import { ITodo } from "@/types/types.todo";
import { getCookie } from "cookies-next";
import FormTodo from "./formTodo";

function Dashboard() {
  const { user } = useContext(AuthContext) as IContextType;
  const [pending, setPending] = useState<ITodo[]>([]);
  const [completed, setCompleted] = useState<ITodo[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const loadTodos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/todo/pending/${user!.id}`,
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      const responseCompleted = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/todo/completed/${user!.id}`,
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      setPending(response.data);
      setCompleted(responseCompleted.data);
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

  const markTodo = async (id: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND}/todo/update/${id}`,
        {
          isCompleted: true,
        },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      loadTodos();
      enqueueSnackbar("Tarea completada con exito", { variant: "success" });
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
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND}/todo/delete/${id}`,
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
      <FormTodo loadData={loadTodos} />
      <h2>Tareas Pendientes</h2>
      <ul className={styles.table}>
        {pending.map((todo) => (
          <li key={todo._id} className={styles.todoItem}>
            <span>{todo.todo}</span>
            <div>
              <button
                className={styles.todoButton}
                onClick={() => markTodo(todo._id)}
              >
                Completar
              </button>
              <button
                className={styles.buttonDelete}
                onClick={() => deleteTodo(todo._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Tareas Completadas</h2>
      <ul className={styles.table}>
        {completed.map((todo) => (
          <li key={todo._id} className={styles.todoItem}>
            <span className={styles.todoItemDone}>{todo.todo}</span>
            <div>
              <button
                className={styles.buttonDelete}
                onClick={() => deleteTodo(todo._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
