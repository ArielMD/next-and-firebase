import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import firebase from "../firebase";

interface IFormLogin {
  user: String;
  password: String;
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IFormLogin>();
  const [errorFirebase, setErrorFirebase] = useState<string | null>(null);

  const onSubmit = (data: IFormLogin) => {
    const { user, password } = data;
    try {
      firebase.login(user as string, password as string);
    } catch (error) {
      setErrorFirebase(error.message);
      setTimeout(function () {
        setErrorFirebase(null);
      }, 2000);
    }
  };

  return (
    <Layout title="Login">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            name="user"
            ref={register({
              required: "El campo es requerido",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "El campo no puede contener numeros",
              },
            })}
          />
          {errors.user && <small>{(errors.user as any)?.message}</small>}
        </div>
        <div>
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            ref={register({ required: "El campo es requerido" })}
          />
          {errors.password && (
            <small>{(errors.password as any)?.message}</small>
          )}
          {errorFirebase ? <span> {errorFirebase}</span> : null}
        </div>
        <button>Entrar</button>
      </form>
    </Layout>
  );
};

export default Login;
