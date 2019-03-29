import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
// import { AngularFireAuth } from '@angular/fire/auth';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        BrowserModule,
        SharedModule,
        FormsModule,
        HttpModule,
        CoreModule,
        ShoppingListModule,
        AppRoutingModule,
    ],
    providers: [ ],
    bootstrap: [AppComponent]
})
export class AppModule { }
