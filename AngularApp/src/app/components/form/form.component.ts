import { ExpenserecordService } from './../../service/expenserecord.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  categoryoptions: Array<String> = [];
  // dbcategory;
  expenseForm: FormGroup;
  submitted = true;
  obj;
  constructor(private expenseservice: ExpenserecordService) {}
  //Checking whether generated value exists in db or not
  async check(generatedvalue) {
    await this.expenseservice.getOrderid(generatedvalue).subscribe(
      (response) => {
        if (Object.keys(response).length == 0) {
          return true;
        } else return false;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
    return false;
  }
  orderidgencontroller() {
    let finalvalue = '';
    while (true) {
      let generatedvalue = this.OrderIDGEN();
      if (this.check(generatedvalue)) {
        finalvalue = generatedvalue;
        break;
      }
    }

    return finalvalue;
  }
  OrderIDGEN() {
    let generatedOrderId = 'TD';
    const validchars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * validchars.length);
      generatedOrderId += validchars[index];
    }
    return generatedOrderId;
  }
  onSubmit() {
    this.obj = this.expenseForm.controls.userData.value;
    let newid = this.orderidgencontroller();
    let newobjFormat = {
      expensedetails: {
        id: newid,
        category: this.obj.category,
        itemname: this.obj.itemname,
        amount: this.obj.amount,
        date: this.obj.date,
        deleted: false,
      },
    };
    this.expenseForm.reset();
    this.expenseservice.addexpenserecord(newobjFormat.expensedetails);
    this.expenseservice.addinfo(newobjFormat).subscribe();
    this.submitted = false;
  }
  expenseFormfunction() {
    this.expenseForm = new FormGroup({
      userData: new FormGroup({
        category: new FormControl(null, [Validators.required]),
        itemname: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[a-zA-Z ]+'),
        ]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]+'),
        ]),
        date: new FormControl(null, [Validators.required]),
      }),
    });
  }
  ngOnInit(): void {
    this.expenseFormfunction();
    this.saveoptions();
    this.fetchcategory();
  }
  saveoptions() {
    this.expenseservice.allcategoriesSource.subscribe(
      (response) => (this.categoryoptions = response)
    );
  }
  fetchcategory() {
    this.expenseservice
      .getUserData(localStorage.getItem('email'))
      .subscribe((response: any) => {
        if (response != null) {
          this.categoryoptions = response.category;
        }
      });
  }
}
