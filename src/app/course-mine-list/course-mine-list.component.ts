import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CourseDTO } from '../model/course.model';
import { CourseService, UserService } from '../app.service';
import { UserDTO } from '../model/user.model';

@Component({
  selector: 'app-course-mine-list',
  templateUrl: './course-mine-list.component.html',
  styleUrls: ['./course-mine-list.component.scss']
})
export class CourseMineListComponent implements OnInit {

  myCoursesDisplayedColumns = ['category', 'description', 'startdate', 'instructorUsername', 'action'];
  myCourses = new MatTableDataSource<CourseDTO>();
  courseId: number;
  user: UserDTO;

  constructor(private courseService: CourseService, private userService: UserService) { }

  ngOnInit() {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
    this.refreshCourseInfo();
  }

  refreshCourseInfo(): void {
    this.userService.getSignedInUser().subscribe(
      data => {
        this.user = data;
        this.myCourses.data = this.user.courses;
      });
  }

  selectCourseId(id: number) {
    this.courseService.changeCourseId(id);
  }

}
