import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAllListComponent } from './course-all-list.component';

describe('CourseAllListComponent', () => {
  let component: CourseAllListComponent;
  let fixture: ComponentFixture<CourseAllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
