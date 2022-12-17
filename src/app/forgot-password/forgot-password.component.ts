import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    mailSent: boolean;
    isProgressVisible: boolean;
    forgotPasswordForm: UntypedFormGroup;
    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
        this.mailSent = false;
        this.isProgressVisible = false;

        this.forgotPasswordForm = new UntypedFormGroup({
            'email': new UntypedFormControl('', [Validators.required, Validators.email])
        });

        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {               // if the user is logged in, update the form value with their email address
            if (user) {
                this.forgotPasswordForm.patchValue({
                    email: user.email
                });
            }
        });
    }

    retrievePassword() {
        this.isProgressVisible = true;                          // show the progress indicator as we start the Firebase password reset process

        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.authService.resetPassword(this.forgotPasswordForm.value.email).then((result) => {
            this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
            if (result == null) {                               // null is success, false means there was an error
                console.log('password reset email sent...');
                this.mailSent = true;
            } else if (result.isValid === false) {
                console.log('login error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }

}
