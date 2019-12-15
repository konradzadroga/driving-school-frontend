import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActivityAddCommentComponent } from './course-activity-add-comment.component';

describe('CourseActivityAddCommentComponent', () => {
  let component: CourseActivityAddCommentComponent;
  let fixture: ComponentFixture<CourseActivityAddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseActivityAddCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseActivityAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
