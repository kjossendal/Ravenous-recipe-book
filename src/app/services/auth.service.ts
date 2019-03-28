// import * as firebase  from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token = window.localStorage.getItem('token');

    constructor(private afAuth: AngularFireAuth) {}

    loginGoogle() {
        // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    };

    login(user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                this.getToken();
            })
    };

    signUp(user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                this.getToken();
            })
    };

    logout() {
        window.localStorage.clear();
        return this.afAuth.auth.signOut();
    };

    getToken() {
        return this.afAuth.auth.currentUser.getIdToken()
            .then(token => {
                console.log("TOKEN", token)
                window.localStorage.setItem('token', token);
                this.token = window.localStorage.getItem('token');
            })
    };

    isAuth() {
        return this.token != null;
    }
}