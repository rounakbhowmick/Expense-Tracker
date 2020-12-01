import { ExpenserecordService } from './../../service/expenserecord.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorywiseoverview',
  templateUrl: './categorywiseoverview.component.html',
  styleUrls: ['./categorywiseoverview.component.css'],
})
export class CategorywiseoverviewComponent implements OnInit {
  constructor(private expenseservice: ExpenserecordService) {}

  ngOnInit(): void {}
}
