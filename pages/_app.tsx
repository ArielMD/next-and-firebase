import { AppProps } from "next/app";
import firebase, { FirebaseContext } from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;
