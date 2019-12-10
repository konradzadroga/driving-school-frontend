import { Component, OnInit } from '@angular/core';
import { CourseService, ActivityService } from '../app.service';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { ActivityDTO } from '../model/activity.model';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../core/format-datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}, 
    {provide: DatePipe}
  ]
})
export class CourseActivityListComponent implements OnInit {

  courseId: number;
  activities = new MatTableDataSource<ActivityDTO>();
  displayedColumns = ['dateOfActivity', 'timeOfActivity', 'instructor', 'action']

  constructor(private courseService: CourseService, private activityService: ActivityService) { }


  applyFilter(filterValue: Date) {
    let transformedDate: string = '';
    let datePipe: DatePipe = new DatePipe('en-US');
    transformedDate = datePipe.transform(filterValue, 'yyyy-MM-dd');
    this.activities.filter = transformedDate.trim().toLowerCase();
  }

  ngOnInit() {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
    this.activityService.getActivitiesByCourse(this.courseId).subscribe(
      activities => this.activities.data = activities
    );
  }

}
