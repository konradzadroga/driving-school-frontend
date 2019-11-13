import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Course } from './course.model';
import { Router } from '@angular/router';
import { CourseService } from '../app.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  displayedColumns = ['id', 'name', 'description'];
  dataSource = new MatTableDataSource<Course>();

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      data => {
        this.dataSource.data = data;
        console.log(data);
      }
    )
  }

}
