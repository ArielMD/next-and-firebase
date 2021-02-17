import app from "firebase/app";
import firebaseConfig from "./config";
import "firebase/auth";

class Firebase {
  auth: app.auth.Auth;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    this.auth = app.auth();
  }
}

export default new Firebase();
