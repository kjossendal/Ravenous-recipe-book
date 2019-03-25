import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
};