import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { Recipe } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    sub: Subscription;
    searchTerm: string = '';
    searchTermPersist: string = '';
    searchResults: Recipe[];

    constructor(private apiService: ApiService) { };

    ngOnInit() {
        // const myNumbers = interval(500);
        // myNumbers.subscribe((number: Number) => {
        //     console.log("number", number)
        // })
        // const myObs = Observable.create((observer: Observer<string>) => {
        //     setTimeout(() => {
        //         observer.next('first package');
        //     },2000)
        //     setTimeout(() => {
        //         observer.next('second package');
        //     },4000)
        //     setTimeout(() => {
        //         // observer.error('error');
        //     },5000)
        //     setTimeout(() => {
        //         observer.complete();
        //     },6000)
        // });
        // this.sub = myObs.subscribe(
        //     (data: string) => { console.log(data) },
        //     (error: string) => { console.log(error) },
        //     () => {console.log('completed');}
        // );
    };

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    };

    handleSearch() {
        console.log("TERM", this.searchTerm)
        this.sub = this.apiService.searchRecipes(this.searchTerm)
            .subscribe(
                (resp) => {
                    this.searchResults = resp
                },
                (err) => {
                    console.log("Error searching recipes", err);
                }
            )
            this.searchTermPersist = this.searchTerm;
            this.searchTerm = '';
    };
}
