import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorywiseoverviewComponent } from './categorywiseoverview.component';

describe('CategorywiseoverviewComponent', () => {
  let component: CategorywiseoverviewComponent;
  let fixture: ComponentFixture<CategorywiseoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorywiseoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorywiseoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
