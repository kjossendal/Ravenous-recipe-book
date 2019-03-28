// import * as firebase  from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    loggedIn = false;

    constructor(private afAuth: AngularFireAuth) {}

    isAuth() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 400)
        })
        return promise;
    };

    loginGoogle() {
        // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    login(user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    };

    signUp(user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    };

    logout() {
        return this.afAuth.auth.signOut();
    };

    getToken() {
        return this.afAuth.auth.currentUser.getIdToken()
            .then(token => {
                console.log("TOKEN", token)
                return token
            })
    }
}