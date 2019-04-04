import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
// import { map } from 'rxjs/operators';
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
    working: boolean = false;
    searchInitiated: boolean = false;

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
        // this.searchResults = [];
        this.working = true;
        this.sub = this.apiService.searchRecipes(this.searchTerm.toLowerCase()).subscribe(
            (data) => {
                if (data.length < 1) {
                    this.working = false;
                    this.searchInitiated = true;
                    this.searchResults = [];
                    return;
                }
                this.searchResults = data.map(e => {
                    this.working = false;
                    this.searchInitiated = true;
                    return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data()
                    } as Recipe
                })
            },
            (err) => {
                console.log("Error fetching search results", err)
                this.working = false;
            }
        );
        this.searchTermPersist = this.searchTerm;
        this.searchTerm = '';
    };
}
