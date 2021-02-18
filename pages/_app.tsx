import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import firebase, { FirebaseContext } from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        router.push("/home");
        setIsLoading(false);
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
        isLoading,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
