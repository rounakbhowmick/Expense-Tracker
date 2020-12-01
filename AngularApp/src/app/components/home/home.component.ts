import { ExpenserecordService } from './../../service/expenserecord.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formdisplay = false;
  constructor(private expenseservice: ExpenserecordService) {}
  IsLoggedIN: Boolean = false;
  ngOnInit(): void {
    this.checkedLoggedSTatus();
  }

  checkedLoggedSTatus() {
    this.expenseservice.loggedIn.subscribe(
      (response) => (this.IsLoggedIN = response)
    );
  }
  clicked() {
    this.formdisplay = true;
  }
}
