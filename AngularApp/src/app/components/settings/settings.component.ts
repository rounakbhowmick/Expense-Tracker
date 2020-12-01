import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenserecordService } from './../../service/expenserecord.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  signupForm: FormGroup;
  IsLoggedIN: Boolean = false;
  submitted = true;
  obj: any;
  constructor(private expenseservice: ExpenserecordService) {}

  ngOnInit(): void {
    this.signupformfunction();
    this.checkedLoggedSTatus();
  }
  checkedLoggedSTatus() {
    this.expenseservice.loggedIn.subscribe(
      (response) => (this.IsLoggedIN = response)
    );
  }
  signupformfunction() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        entirebudget: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
      }),
    });
  }
  onSubmit() {
    this.obj = this.signupForm.controls.userData.value;
    if (this.obj.entirebudget != null) {
      this.expenseservice.totalbudget.next(this.obj.entirebudget);
      this.storetotalbudget(this.obj.entirebudget);
      this.signupForm.get('userData.entirebudget').reset();
    } else if (this.obj.category != null) {
      this.expenseservice.updatecategories(this.obj.category);
      this.storecategorydb(this.obj.category);
      this.signupForm.get('userData.category').reset();
    }
  }
  storecategorydb(val) {
    let obj = {
      category: val,
    };
    this.expenseservice.addinfo(obj).subscribe();
  }
  storetotalbudget(val) {
    let obj = {
      totalbudget: val,
    };
    this.expenseservice.addinfo(obj).subscribe();
  }
}
