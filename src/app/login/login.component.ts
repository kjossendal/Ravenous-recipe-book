import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('f') signupForm: NgForm;

    submitted = false;
    user = new User(null, '', '')
  
    constructor(private authService: AuthService) {};
    ngOnInit() {}

    onSubmit() {
        console.log(this.user);
        this.authService.login();
        this.signupForm.reset();
    }
}
