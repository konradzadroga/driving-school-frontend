import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { CourseDTO } from '../model/course.model';
import { UserDTO } from '../model/user.model';
import { CourseService, UserService, DictionaryService } from '../app.service';

declare let paypal: any;

@Component({
  selector: 'app-course-all-list',
  templateUrl: './course-all-list.component.html',
  styleUrls: ['./course-all-list.component.scss']
})
export class CourseAllListComponent implements OnInit {

  allCoursesDisplayedColumns = ['category', 'description', 'places', 'startdate', 'instructorNameAndSurname', 'cost', 'signup'];
  allCourses = new MatTableDataSource<CourseDTO>();
  myCourses = new MatTableDataSource<CourseDTO>();
  courseId: number;
  user: UserDTO;

  constructor(private courseService: CourseService, private userService: UserService, private _snackBar: MatSnackBar, public dictionary: DictionaryService) { }

  ngOnInit() {
    this.refreshCourseInfo();
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  refreshCourseInfo(): void {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
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

  
  selectCourseId(id: number) {
    this.courseService.changeCourseId(id);
  }



}
