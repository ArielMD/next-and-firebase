import Layout from "../components/Layout";
import { FirebaseContext } from "../firebase";
import { useContext } from "react";

const Home: React.FC = () => {
  const { firebase, currentUser, isLoading } = useContext(FirebaseContext);

  const logout = () => {
    firebase.logout();
  };

  if (isLoading) {
    return <div>Cargando</div>;
  }
  return (
    <Layout title="Home">
      Hello {currentUser && currentUser.displayName}
      <button onClick={logout}>cerrar session</button>
    </Layout>
  );
};

export default Home;
