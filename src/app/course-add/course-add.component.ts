import { Component, OnInit } from '@angular/core';
import { UserService, CourseService, DictionaryService } from '../app.service';
import { UserBasicDTO } from '../model/user.model';
import { AddCourseDTO, CourseDTO } from '../model/course.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  category: string;
  description: string;
  places: number;
  startDate: Date;
  cost: number;
  instructorUsername: string;
  instructors: string[] = [];
  minDate = new Date();
  categories: string[] = ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'B+E', 'C', 'C1', 'C+E', 'D', 'D1', 'D1+E', 'D+E', 'Tramwaj' ]


  constructor(private userService: UserService, private courseService: CourseService, private _snackBar: MatSnackBar, public dictionary: DictionaryService) {
   }

  ngOnInit() {
    this.userService.getUsersWithParticularRole('ROLE_INSTRUCTOR').subscribe(
      users => {
        users.forEach(user => {
          this.instructors.push(user.username);
        })
      }
    );
  }

  addCourse(): void {
    let courseDTO: AddCourseDTO;

    courseDTO = {
      category: this.category,
      description: this.description,
      cost: this.cost,
      places: this.places,
      instructorUsername: this.instructorUsername,
      startdate: this.startDate
    }

    console.log(courseDTO);

    this.courseService.addCourse(courseDTO).subscribe(
      data => {
        console.log("Kurs dodany");
        this.openSnackBar("Kurs został dodany", "OK");
        this.refreshPage();
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  refreshPage() {
    window.location.reload();
  }

}
