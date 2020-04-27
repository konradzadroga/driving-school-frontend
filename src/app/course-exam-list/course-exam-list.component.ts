import { Component, OnInit } from '@angular/core';
import { CourseService, ExamService, DictionaryService } from '../app.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ExamDTO } from '../model/exam.model';

@Component({
  selector: 'app-course-exam-list',
  templateUrl: './course-exam-list.component.html',
  styleUrls: ['./course-exam-list.component.scss']
})
export class CourseExamListComponent implements OnInit {

  courseId: number;
  exams = new MatTableDataSource<ExamDTO>();
  examsDisplayedColumns = ['dateOfExam', 'timeOfExam', 'instructorNameAndSurname', 'occupied', 'signIn'];

  constructor(private courseService: CourseService, private examService: ExamService, private _snackBar: MatSnackBar, public dictionary: DictionaryService) { }

  ngOnInit() {
    this.refreshCourseExamsInfo();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  refreshCourseExamsInfo(): void {
    this.courseService.currentCourseId.subscribe(courseId => {
      this.courseId = courseId
    });
    this.examService.getExamsByCourseId(this.courseId).subscribe(exams => {
      this.exams.data = exams
    });
  }

  signInForAnExam(id: number): void {
    this.examService.signInForAnExam(id).subscribe(exam => {
      this.refreshCourseExamsInfo();
      this.openSnackBar(this.dictionary.successfullySignedInForExam, "OK");
    });
  }

}
