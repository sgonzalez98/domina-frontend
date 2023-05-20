import axios, { AxiosError, AxiosResponse } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/context/appContext";
import { IContextType } from "@/types/types.context";
import { useSnackbar } from "notistack";
import { getCookie } from "cookies-next";

type Inputs = {
  todo: string;
};

export default function FormTodo({ loadData }: { loadData: Function }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext) as IContextType;

  const create: SubmitHandler<Inputs> = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/todo/create`,
        {
          todo: data.todo,
          user_id: user!.id,
        },
        { headers: { Authorization: `Bearer ${getCookie("token")}` } }
      );
      loadData();
      reset();
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
    <form
      onSubmit={handleSubmit(create)}
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        style={{ width: "90%" }}
        placeholder="tarea"
        {...register("todo", { required: true })}
      />
      {errors?.todo && (
        <span style={{ marginLeft: 25, color: "brown", fontSize: 11 }}>
          La tarea es requerida
        </span>
      )}
      <button type="submit" style={{ height: 30 }}>
        Crear Tarea
      </button>
    </form>
  );
}
