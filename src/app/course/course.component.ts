import { Component, OnInit } from '@angular/core';import { TokenStorage } from '../core/token.storage';
;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  isInstructor: boolean = false;

  constructor(private token: TokenStorage) { }

  ngOnInit(): void {
    this.isUserAnInstructor();
  }

  isUserAnInstructor(): void {
    let roles = this.token.getAuthorities();
    roles.forEach(role => {
      if (role==='ROLE_INSTRUCTOR') {
        this.isInstructor = true;
      }
    })
  }

}
