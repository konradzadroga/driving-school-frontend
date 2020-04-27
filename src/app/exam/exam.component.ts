import { Component, OnInit } from '@angular/core';
import { ExamService, CourseService, DictionaryService } from '../app.service';
import { MatTableDataSource } from '@angular/material';
import { ExamDTO } from '../model/exam.model';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(private examService: ExamService, private token: TokenStorage, private courseService: CourseService, public dictionary: DictionaryService) { }

  myExams = new MatTableDataSource<ExamDTO>();
  myExamsDisplayedColumns = ['dateOfExam', 'timeOfExam', 'instructorNameAndSurname', 'passed', 'showCourse'];
  username: string;
  dataLoaded: Promise<boolean>;

  ngOnInit() {
    this.username = this.token.getUsername();
    this.refreshStudentExamsInfo(this.username);
  }

  refreshStudentExamsInfo(username: string): void {
    this.examService.getExamsByStudentUsername(username).subscribe(
      exams => {
        this.myExams.data = exams;
        this.dataLoaded = Promise.resolve(true);
        console.log(this.myExams.data)
      }
    );
  }

  selectCourseId(id: number) {
    this.courseService.changeCourseId(id);
  }

}
