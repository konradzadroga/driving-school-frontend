import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { CourseDTO } from '../model/course.model';
import { UserDTO } from '../model/user.model';
import { CourseService, UserService } from '../app.service';

@Component({
  selector: 'app-course-all-list',
  templateUrl: './course-all-list.component.html',
  styleUrls: ['./course-all-list.component.scss']
})
export class CourseAllListComponent implements OnInit {

  allCoursesDisplayedColumns = ['category', 'description', 'places', 'startdate', 'instructorUsername', 'cost', 'signup'];
  allCourses = new MatTableDataSource<CourseDTO>();
  myCourses = new MatTableDataSource<CourseDTO>();
  user: UserDTO;

  constructor(private courseService: CourseService, private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshCourseInfo();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  refreshCourseInfo(): void {
    this.courseService.getCourses().subscribe(
      data => {
        this.allCourses.data = data;
      });

    this.userService.getSignedInUser().subscribe(
      data => {
        this.user = data;
        this.myCourses.data = this.user.courses;
      });
  }

  checkIfAlreadyRegistered(id: number): boolean {

    let isUserAlreadyRegistered: boolean = false;

    this.myCourses.data.forEach(course => {
      if (course.id == id) {
        isUserAlreadyRegistered = true;
      }
    });

    return isUserAlreadyRegistered;
  }

  signUpForCourse(id: number): void {
    this.userService.addCourseToUser(id).subscribe(
      () => {
        this.refreshCourseInfo();
      }
    );
  }



}
