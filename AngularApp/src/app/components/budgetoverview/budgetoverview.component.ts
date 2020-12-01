import { ExpenserecordService } from './../../service/expenserecord.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budgetoverview',
  templateUrl: './budgetoverview.component.html',
  styleUrls: ['./budgetoverview.component.css'],
})
export class BudgetoverviewComponent implements OnInit {
  totalbudget: Number = 0;
  totalexpense: Number = 0;
  spendpercentage: any = 0;
  constructor(private expenseservice: ExpenserecordService) {}
  savebudgetdata() {
    this.expenseservice.totalexpenses.subscribe((response) => {
      this.totalexpense = response;
      this.spendpercent(this.totalbudget, this.totalexpense);
    });
    this.expenseservice
      .getUserData(localStorage.getItem('email'))
      .subscribe((response: any) => {
        if (response != null && response.totalbudget != undefined) {
          console.log(response.totalbudget);
          this.totalbudget = response.totalbudget;
          //  this.fetchtotalbudget();
        }
      });
  }

  ngOnInit(): void {
    this.savebudgetdata();
    // // this.fetchtotalbudget();
    // this.spendpercent(this.totalbudget, this.totalexpense);
  }
  spendpercent(totalbudget, totalexpense) {
    if (totalbudget > 0 && totalexpense > 0) {
      let temp = ((totalbudget - totalexpense) / totalbudget) * 100;
      this.spendpercentage = 100 - temp;
    }
  }
  // fetchtotalbudget() {
  //   this.expenseservice
  //     .getUserData(localStorage.getItem('email'))
  //     .subscribe((response: any) => {
  //       if (response != null) {
  //         this.totalbudget = response.totalbudget;
  //         this.fetchtotalbudget();
  //       }
  //     });
  // }
}
