import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInstructedActivityListComponent } from './course-instructed-activity-list.component';

describe('CourseInstructedActivityListComponent', () => {
  let component: CourseInstructedActivityListComponent;
  let fixture: ComponentFixture<CourseInstructedActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInstructedActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInstructedActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
