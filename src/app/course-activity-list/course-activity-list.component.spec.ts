import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActivityListComponent } from './course-activity-list.component';

describe('CourseActivityListComponent', () => {
  let component: CourseActivityListComponent;
  let fixture: ComponentFixture<CourseActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
