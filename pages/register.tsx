import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import context from "../firebase/context";

interface IFormLogin {
  name: String;
  email: String;
  password: String;
}

const Register: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IFormLogin>();
  const [errorFirebase, setErrorFirebase] = useState<string | null>(null);
  const { firebase } = useContext(context);

  const onSubmit = async (data: IFormLogin) => {
    const { name, email, password } = data;
    try {
      await firebase.registerUser(
        name as string,
        email as string,
        password as string
      );
    } catch (error) {
      setErrorFirebase(error.message);
      setTimeout(function () {
        setErrorFirebase(null);
      }, 2000);
    }
  };

  const emailRegex: RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const textRegex: RegExp = /^[A-Za-z]+$/i;

  return (
    <Layout title="Login">
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Nombre de usuario</label>
          <input
            type="text"
            name="name"
            ref={register({
              required: "El campo es requerido",
              pattern: {
                value: textRegex,
                message: "El campo no puede contener numeros",
              },
            })}
          />
          {errors.name && <small>{(errors.name as any)?.message}</small>}
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            ref={register({
              required: "El campo es requerido",
              pattern: {
                value: emailRegex,
                message: "Debes ingresar un correo valido",
              },
            })}
          />
          {errors.email && <small>{(errors.email as any)?.message}</small>}
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

export default Register;
