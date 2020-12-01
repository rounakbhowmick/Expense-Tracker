import { ExpenserecordService } from './../../service/expenserecord.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css'],
})
export class UserregistrationComponent implements OnInit {
  regForm: FormGroup;
  IsLoggedIN: Boolean = false;
  constructor(private expenseservice: ExpenserecordService) {}

  ngOnInit(): void {
    this.regFormFunction();
    this.checkedLoggedSTatus();
  }

  checkedLoggedSTatus() {
    this.expenseservice.loggedIn.subscribe(
      (response) => (this.IsLoggedIN = response)
    );
  }

  onSubmit() {
    let obj = this.regForm.controls.userData.value;

    this.expenseservice.getUserData(obj.email).subscribe(
      (response) => {
        if (response == null) {
          this.expenseservice
            .postUsersInfo(this.regForm.controls.userData.value)
            .subscribe(
              (response) => {
                this.expenseservice.savelocal(obj.email);
                this.expenseservice.loggedIn.next(true);
              },
              (error) => console.log(error)
            );
        } else {
          this.expenseservice.savelocal(obj.email);
          this.expenseservice.loggedIn.next(true);
        }
      },
      (error) => console.log(error)
    );
  }
  regFormFunction() {
    this.regForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[a-zA-Z ]+'),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phonenumber: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
      }),
    });
  }
}
