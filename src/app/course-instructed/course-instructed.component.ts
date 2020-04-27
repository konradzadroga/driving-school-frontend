import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CourseDTO } from '../model/course.model';
import { CourseService, UserService, DictionaryService } from '../app.service';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-course-instructed',
  templateUrl: './course-instructed.component.html',
  styleUrls: ['./course-instructed.component.scss']
})
export class CourseInstructedComponent implements OnInit {

  myCoursesDisplayedColumns = ['category', 'description', 'startdate', 'action'];
  myCourses = new MatTableDataSource<CourseDTO>();
  courseId: number;
  username: string;

  constructor(private courseService: CourseService, private token: TokenStorage, public dictionary: DictionaryService) { }

  ngOnInit() {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
    this.refreshCourseInfo();
  }

  refreshCourseInfo(): void {
    this.username = this.token.getUsername();
    this.courseService.getInstructorCourses(this.username).subscribe(
      courses => this.myCourses.data = courses
    )
  }

  selectCourseId(id: number) {
    this.courseService.changeCourseId(id);
  }

}
