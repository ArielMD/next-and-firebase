import { useForm } from "react-hook-form";
import Layout from "../components/Layout";

interface IFormLogin {
  user: String;
  password: String;
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IFormLogin>();

  const onSubmit = (data: IFormLogin) => {
    console.log(data);
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
            ref={register({ required: "El campo es requerido" })}
          />
          {errors.password && (
            <small>{(errors.password as any)?.message}</small>
          )}
        </div>
        <button>Entrar</button>
      </form>
    </Layout>
  );
};

export default Login;
