import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActivityMyListComponent } from './course-activity-my-list.component';

describe('CourseActivityMyListComponent', () => {
  let component: CourseActivityMyListComponent;
  let fixture: ComponentFixture<CourseActivityMyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivityMyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityMyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
