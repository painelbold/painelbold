import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth){
        this.user = angularFireAuth.authState;
    }

    createUser(user: any){
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    signOut(){
        return this.angularFireAuth.auth.signOut();
    }

    signIn(user: any){
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    resetPassword(email: string){
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    }

    getLoggedUser(){
        var uid = "";
        this.angularFireAuth.authState.subscribe(user =>{
          uid = user.uid;
        }).unsubscribe();
        return uid;
      }
}