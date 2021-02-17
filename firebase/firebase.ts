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

  async registerUser(name: string, email: string, password: string) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return newUser.user.updateProfile({
      displayName: name,
    });
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password);
  }
}

export default new Firebase();
