import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    sub: Subscription;

    constructor(private router: Router) { }

    ngOnInit() {
        const myNumbers = interval(500);
        // myNumbers.subscribe((number: Number) => {
        //     console.log("number", number)
        // })
        const myObs = Observable.create((observer: Observer<string>) => {
            setTimeout(() => {
                observer.next('first package');
            },2000)
            setTimeout(() => {
                observer.next('second package');
            },4000)
            setTimeout(() => {
                // observer.error('error');
            },5000)
            setTimeout(() => {
                observer.complete();
            },6000)
        });
        this.sub = myObs.subscribe(
            (data: string) => { console.log(data) },
            (error: string) => { console.log(error) },
            () => {console.log('completed');}
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    handleClick() {
        this.router.navigate(['/recipes'])
    }

}
