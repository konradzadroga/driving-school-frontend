import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivityDTO } from '../model/activity.model';
import { CourseService, ActivityService } from '../app.service';
import { TokenStorage } from '../core/token.storage';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-instructed-activity-list',
  templateUrl: './course-instructed-activity-list.component.html',
  styleUrls: ['./course-instructed-activity-list.component.scss']
})
export class CourseInstructedActivityListComponent implements OnInit {

  courseId: number;
  activityId: number;
  activities = new MatTableDataSource<ActivityDTO>();
  dates: Date[];
  minDateString: string;
  maxDateString: string;
  minDate: Date;
  maxDate: Date;
  rate: number;
  displayedColumns = ['dateOfActivity', 'timeOfActivity', 'student', 'action', 'second-action']

  constructor(private courseService: CourseService, private activityService: ActivityService, private _snackBar: MatSnackBar, private token: TokenStorage) { }


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
    this.activityService.currentActivityId.subscribe(activityId => this.activityId = activityId);
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
    this.activityService.getActivitiesByCourseWhereUserIsSignedUp(this.courseId).subscribe(
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

  selectActivityId(id: number): void {
    this.activityService.changeActivityId(id);
  }

  rateActivity(id: number): void {
    console.log(this.rate);
    this.activityService.addRate(id, this.rate).subscribe(() => {
      console.log("Rate added succesfully")
    })
  }


}
