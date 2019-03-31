import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
    @Output() pageChanged = new EventEmitter<string>();

    constructor(private authService: AuthService, private router: Router) {}
    isOpen = false;

    toggleMenu() {
        this.isOpen = !this.isOpen;
    };

    toLogin() {
        this.isOpen = !this.isOpen;
        this.router.navigate(['login']);
    }

    logout() {
        this.authService.logout()
            .then(() => {
                this.isOpen = !this.isOpen;
                this.router.navigate(['/']);
            })
            .catch(err => {
                console.log("Error logging out", err)
            })
    };

    isAuth() {
        return this.authService.isAuth();
    }
};