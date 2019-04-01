import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Output() pageChanged = new EventEmitter<string>();
    currentRoute: string;
    isOpen: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
        // watching route to toggle header display css properties when on home '/' route
        router.events.pipe(
            filter(event => event instanceof NavigationEnd)  
        ).subscribe((event: NavigationEnd) => {
            this.currentRoute = event.url;
        });
    };

    toggleMenu() {
        this.isOpen = !this.isOpen;
    };

    toLogin() {
        this.isOpen = !this.isOpen;
        this.router.navigate(['login']);
    };

    logout() {
        this.authService.logout()
            .then(() => {
                this.isOpen = !this.isOpen;
                this.router.navigate(['/']);
            })
            .catch(err => {
                console.log("Error logging out", err);
            })
    };

    isAuth() {
        return this.authService.isAuth();
    };
};