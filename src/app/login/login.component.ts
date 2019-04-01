import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('f') signupForm: NgForm;

    errorMessage: string;
    submitted = false;
    user = new User(null, '', '')
  
    constructor(private authService: AuthService, private router: Router) {};
    ngOnInit() { }

    login() {
        this.authService.login(this.user)
            .then(resp => {
                console.log("Login Successful", resp);
                this.router.navigate(['recipes']);
            })
            .catch(err => {
                this.errorMessage = err.message;
                throw new Error(err);
            })
        this.signupForm.reset();
    };

    signup() {
        this.authService.signUp(this.user)
            .then(resp => {
                console.log("SignUp Successful", resp);
                this.router.navigate(['recipes']);
            })
            .catch(err => {
                this.errorMessage = err.message;
                throw new Error(err)
            })
        this.signupForm.reset();
    };

    isAuth() {
        return this.authService.isAuth();
    };

    dismiss() {
        this.errorMessage = '';
    };
}
