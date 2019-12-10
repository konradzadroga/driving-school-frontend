import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMineListComponent } from './course-mine-list.component';

describe('CourseMineListComponent', () => {
  let component: CourseMineListComponent;
  let fixture: ComponentFixture<CourseMineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseMineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
