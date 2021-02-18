import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import firebase, { FirebaseContext } from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        router.push("/home");
      } else {
        setCurrentUser(null);
        router.push("/");
      }
    });

    return () => unsuscribe();
  }, []);
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        currentUser,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
