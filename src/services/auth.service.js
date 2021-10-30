import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

class AuthService {
    login(email, password) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = JSON.stringify(userCredential.user);
                localStorage.setItem("user", user);
                return userCredential.user;
            });
    }

    logout() {
        const auth = getAuth();
        auth.signOut()
            .then(() => {
                alert('Successfully logged out');
            })
            .catch(error => {
                alert(error.message);
            });
        localStorage.removeItem("user");
    }

    register(email, password) {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                return true;
            })
            .catch((error) => {
                return error.message;
            });
    }

    getCurrentUser(){
        const auth = getAuth();
        return auth.currentUser;
    }

    isLoggedIn(){
        return this.getCurrentUser() != null;
    }
}

export default new AuthService();