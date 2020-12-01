import { ExpenserecordService } from './../../service/expenserecord.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  expensevales: any;
  expensevalueskeys: any;
  search: any;
  totalexpense: number = 0;
  constructor(private expenseservice: ExpenserecordService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.expenseservice.expenserecord.subscribe((value: any) => {
      this.expensevales = value;
      let tempexpense = 0;
      Object.entries(this.expensevales).map(([key, value]: any) => {
        this.expensevalueskeys = Object.keys(value);
        tempexpense += parseInt(value.amount);
      });
      this.expenseservice.totalexpenses.next(tempexpense);
    });
    this.fetchexpenserecords();
  }
  fetchexpenserecords() {
    this.expenseservice
      .getUserData(localStorage.getItem('email'))
      .subscribe((response: any) => {
        if (response != null) {
          this.expenseservice.expenserecord.next(response.expensedetails);
        }
      });
  }
  savemodificationdata(responsedata) {
    let obj = {
      expensedetails: responsedata[0].expensedetails,
    };
    this.expenseservice.updateexpense(obj).subscribe((response) => {
      this.refresh();
      console.log(response);
    });
    //console.log(responsedata[0].expensedetails);
  }
  delete(i) {
    // console.log(i.id);
    this.expenseservice.getOrderid(i.id).subscribe(
      (response: any) => {
        if (response != null) {
          this.search = response.map((val) => {
            //console.log(val.expensedetails);
            let idsearch = val.expensedetails.map((val) => {
              if (val.id == i.id) {
                val.deleted = true;
                return val;
              }
            });
            return response;
          });
          if (this.search != undefined)
            this.savemodificationdata(this.search[0]);
        }
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  }
}
