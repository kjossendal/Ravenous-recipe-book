import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-book';
  currentPage = 'recipe';

  onPageChanged(page) {
      console.log("Page", page)
      this.currentPage = page;
  }
}
