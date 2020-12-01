import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ExpenserecordService {
  totalbudget = new BehaviorSubject<Number>(0);
  totalexpenses = new BehaviorSubject<Number>(0);
  allexpenserecord: Array<Object> = [];
  loggedIn = new BehaviorSubject<Boolean>(false);
  readonly baseURL = 'http://localhost:3000/users';

  expenserecord = new BehaviorSubject<Array<Object>>([]);
  allcategoriesSource = new BehaviorSubject<Array<String>>([]);
  allcategorieserecord: Array<String> = [];
  constructor(private http: HttpClient) {}
  addexpenserecord(expenserecordobj) {
    this.expenserecord.subscribe((value: any) => {
      this.allexpenserecord = value;
    });

    this.allexpenserecord.push(expenserecordobj);
    this.expenserecord.next(this.allexpenserecord);

    this.allexpenserecord = [];
  }
  updatecategories(categoryrecordobj) {
    console.log(categoryrecordobj);
    this.allcategoriesSource.subscribe((value: any) => {
      this.allcategorieserecord = value;
    });

    this.allcategorieserecord.push(categoryrecordobj);
    this.allcategoriesSource.next(this.allcategorieserecord);

    this.allcategorieserecord = [];
    // this.allcategoriesSource.next(val);
  }
  postUsersInfo(user) {
    return this.http.post(this.baseURL, user);
  }
  savelocal(emailid) {
    localStorage.setItem('email', emailid);
  }
  getOrderid(taskid) {
    console.log(taskid);
    return this.http.get(this.baseURL + '/' + 'taskid' + '/' + taskid);
  }
  //Update
  addinfo(item) {
    let newurl = this.baseURL.concat('/' + localStorage.getItem('email'));
    return this.http.patch(newurl, item);
  }
  updateexpense(item) {
    console.log(item);
    let newurl = this.baseURL.concat(
      '/' + 'update' + '/' + localStorage.getItem('email')
    );
    return this.http.patch(newurl, item);
  }
  //Get Users Data with the help of email
  getUserData(email) {
    return this.http.get(this.baseURL + '/' + email);
  }
}
