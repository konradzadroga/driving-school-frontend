import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Course } from '../model/course.model';
import { Router } from '@angular/router';
import { CourseService, UserService } from '../app.service';
import { User, UserDTO } from '../model/user.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  allCoursesDisplayedColumns = ['name', 'description', 'places', 'signup'];
  myCoursesDisplayedColumns = ['name', 'description'];
  allCourses = new MatTableDataSource<Course>();
  myCourses = new MatTableDataSource<Course>();
  mode: string = 'all';
  user: UserDTO;

  constructor(private router: Router, private courseService: CourseService, private userService: UserService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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


  switchModeToMine(): void {
    this.mode = 'mine';
    this.refreshCourseInfo();
  }

  switchModeToAll(): void {
    this.mode = 'all';
    this.refreshCourseInfo();
  }

  signUpForCourse(id: number): void {
    this.userService.addCourseToUser(id).subscribe(
      () => {
        this.refreshCourseInfo();
      }
    );
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

}
