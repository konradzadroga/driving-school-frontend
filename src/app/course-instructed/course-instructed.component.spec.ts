import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInstructedComponent } from './course-instructed.component';

describe('CourseInstructedComponent', () => {
  let component: CourseInstructedComponent;
  let fixture: ComponentFixture<CourseInstructedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInstructedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInstructedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
