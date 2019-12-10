import { Component, OnInit } from '@angular/core';
import { CourseService } from '../app.service';

@Component({
  selector: 'app-course-activity-list',
  templateUrl: './course-activity-list.component.html',
  styleUrls: ['./course-activity-list.component.scss']
})
export class CourseActivityListComponent implements OnInit {

  courseId: number;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.currentCourseId.subscribe(courseId => this.courseId = courseId);
  }

}
