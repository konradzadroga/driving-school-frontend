import { Component, OnInit } from '@angular/core';
import { CourseService, DictionaryService } from '../app.service';
import { CourseDTO } from '../model/course.model';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

  courseId: number;
  course: CourseDTO;
  dataLoaded: Promise<boolean>;

  constructor(private courseService: CourseService, public dictionary: DictionaryService) { }

  ngOnInit() {
    this.refreshCourseInfo();
  }

  refreshCourseInfo(): void {
    this.courseService.currentCourseId.subscribe(courseId => {
      this.courseId = courseId;
      this.courseService.getCourseById(this.courseId).subscribe(course => {
        this.course = course;
        this.dataLoaded = Promise.resolve(true);
      }
      )
    })
  }


}
