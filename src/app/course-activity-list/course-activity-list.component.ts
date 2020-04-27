import { Component, OnInit } from '@angular/core';
import { CourseService, ActivityService, DictionaryService } from '../app.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivityDTO } from '../model/activity.model';
import { DatePipe } from '@angular/common';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss'],
  providers: [
    {provide: DatePipe}
  ]
})
export class CourseActivityListComponent implements OnInit {

  courseId: number;
  activities = new MatTableDataSource<ActivityDTO>();
  dates: Date[];
  minDateString: string;
  maxDateString: string;
  minDate: Date;
  maxDate: Date;
  displayedColumns = ['dateOfActivity', 'timeOfActivity', 'instructor', 'action']

  constructor(private courseService: CourseService, private activityService: ActivityService, private _snackBar: MatSnackBar, private token: TokenStorage, public dictionary: DictionaryService) { }


  applyFilter(filterValue: Date) {
    let transformedDate: string = '';
    let datePipe: DatePipe = new DatePipe('en-US');
    transformedDate = datePipe.transform(filterValue, 'yyyy-MM-dd');
    this.activities.filter = transformedDate.trim().toLowerCase();
  }

  ngOnInit() {
    this.refreshActivitiesInfo();
    this.refreshDateInfo();
  }


  refreshActivitiesInfo(): void {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
    this.activityService.getActivitiesByCourse(this.courseId).subscribe(
      activities => this.activities.data = activities
    );
  }

  refreshDateInfo(): void {
    this.activityService.getActivitiesDatesByCourse(this.courseId).subscribe(
      dates => { 
      this.dates = dates;
      this.minDateString = dates[0].toString();
      this.maxDateString = dates[dates.length-1].toString();
      let minYear = parseInt(this.minDateString.substring(0,4));
      let minMonth = parseInt(this.minDateString.substring(5,7)) - 1;
      let minDay = parseInt(this.minDateString.substring(8,10));
      let maxYear = parseInt(this.maxDateString.substring(0,4));
      let maxMonth = parseInt(this.maxDateString.substring(5,7)) - 1;
      let maxDay = parseInt(this.maxDateString.substring(8,10));
      this.minDate = new Date(minYear, minMonth, minDay);
      this.maxDate = new Date(maxYear, maxMonth, maxDay);
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  signUp(id: number) : void {
    this.activityService.signUpForActivity(id).subscribe(() => {
      this.refreshActivitiesInfo();
      this.openSnackBar(this.dictionary.successfullySignedInForActivity, "OK")})
  }

}
