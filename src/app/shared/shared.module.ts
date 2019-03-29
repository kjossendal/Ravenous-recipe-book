import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { DropdownDirective } from './dropdown.directive';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
    declarations: [
        LoadingComponent,
        DropdownDirective,
        ShortenPipe,
        FilterPipe,
    ],
    exports: [
        CommonModule,
        LoadingComponent,
        DropdownDirective,
        ShortenPipe,
        FilterPipe,
    ]
})
export class SharedModule { }