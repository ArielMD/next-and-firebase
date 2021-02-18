import React from "react";
import { Firebase } from "./firebase";

interface IContext {
  firebase: Firebase;
  currentUser: any;
  isLoading: Boolean;
}

const FirebaseContext = React.createContext<IContext | null>(null);

export default FirebaseContext;
