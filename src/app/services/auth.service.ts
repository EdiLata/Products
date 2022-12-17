import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLoggedIn: boolean;      // other components can check on this variable for the login status of the user
    admin: boolean;
    email: string;
    banAccount: boolean;

    constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
        this.userLoggedIn = false;

        this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
            if (user) {
                if ((user.email.toLocaleLowerCase() === 'dejan_andrei45@yahoo.com') || (user.email.toLocaleLowerCase() === 'edy.lata2001@gmail.com')) {
                    this.admin = true;
                }
                this.userLoggedIn = true;
            } else {
                this.userLoggedIn = false;
            }
        });
    }

    loginUser(email: string, password: string): Promise<any> {
        if ((email.toLocaleLowerCase() === 'dejan_andrei45@yahoo.com') || (email.toLocaleLowerCase() === 'edy.lata2001@gmail.com')) {
            this.admin = true;
        }

        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Auth Service: loginUser: success');

            })
            .catch(error => {
                console.log('Auth Service: login error...');
                console.log('error code', error.code);
                console.log('error', error);
                if (error.code) {
                    return {isValid: false, message: error.message};
                }
            });
    }

    signupUser(user: any): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                if ((user.email.toLocaleLowerCase() === 'dejan_andrei45@yahoo.com') || (user.email.toLocaleLowerCase() === 'edy.lata2001@gmail.com')) {
                    this.admin = true;
                }
                const emailLower = user.email.toLowerCase();
                this.afs.doc('/users/' + emailLower)
                    .set({
                        displayName: user.displayName,
                        email: user.email,
                        admin: false,

                    });
                if ((user.email.toLocaleLowerCase() === 'dejan_andrei45@yahoo.com') || (user.email.toLocaleLowerCase() === 'edy.lata2001@gmail.com')) {
                    this.afs.doc('/users/' + emailLower)
                        .set({
                            displayName: user.displayName,
                            email: user.email,
                            admin: true,

                        });
                }

                if ((user.email.toLocaleLowerCase() === 'dejan_andrei45@yahoo.com') || (user.email.toLocaleLowerCase() === 'edy.lata2001@gmail.com')) {
                    this.admin = true;
                }
            })
            .catch(error => {
                console.log('Auth Service: signup error', error);
                if (error.code) {
                    return {isValid: false, message: error.message};
                }
            });
    }

    resetPassword(email: string): Promise<any> {
        return this.afAuth.sendPasswordResetEmail(email)
            .then(() => {
                console.log('Auth Service: reset password success');
                // this.router.navigate(['/amount']);
            })
            .catch(error => {
                console.log('Auth Service: reset password error...');
                console.log(error.code);
                console.log(error);
                if (error.code) {
                    return error;
                }
            });
    }


    logoutUser(): Promise<void> {
        return this.afAuth.signOut()
            .then(() => {
                this.router.navigate(['/home']);                    // when we log the user out, navigate them to home
            })
            .catch(error => {
                console.log('Auth Service: logout error...');
                console.log('error code', error.code);
                console.log('error', error);
                if (error.code) {
                    return error;
                }
            });
    }
}
