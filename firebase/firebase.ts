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

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return this.auth.signOut();
  }
}

export { Firebase };

export default new Firebase();
