import { ExpenserecordService } from './service/expenserecord.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  IsLoggedIN: Boolean = false;
  constructor(private expenseservice: ExpenserecordService) {}
  title = 'AngularApp';
  ngOnInit(): void {
    this.checkedLoggedSTatus();
  }
  checkedLoggedSTatus() {
    this.expenseservice.loggedIn.subscribe(
      (response) => (this.IsLoggedIN = response)
    );
  }
}
