import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivityDTO } from '../model/activity.model';
import { CourseService, ActivityService, DictionaryService } from '../app.service';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-course-activity-my-list',
  templateUrl: './course-activity-my-list.component.html',
  styleUrls: ['./course-activity-my-list.component.scss']
})
export class CourseActivityMyListComponent implements OnInit {

  courseId: number;
  activities = new MatTableDataSource<ActivityDTO>();
  displayedColumns = ['dateOfActivity', 'timeOfActivity', 'instructor', 'rate', 'comment']

  constructor(private courseService: CourseService, private activityService: ActivityService, public dictionary: DictionaryService) { }

  ngOnInit() {
    this.refreshActivitiesInfo();
  }


  refreshActivitiesInfo(): void {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
    this.activityService.getUserActivitesByCourse(this.courseId).subscribe(
      activities => this.activities.data = activities
    );
  }



}


