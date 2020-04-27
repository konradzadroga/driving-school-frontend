import { Component, OnInit } from '@angular/core';
import { ActivityService, DictionaryService } from '../app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-course-activity-add-comment',
  templateUrl: './course-activity-add-comment.component.html',
  styleUrls: ['./course-activity-add-comment.component.scss']
})
export class CourseActivityAddCommentComponent implements OnInit {


  activityId: number;
  comment: string = '';

  constructor(private activityService: ActivityService, private _snackBar: MatSnackBar, public dictionary: DictionaryService) { }

  ngOnInit() {
    this.activityService.currentActivityId.subscribe(activityId => this.activityId = activityId);
  }

  sendComment() {
    this.activityService.addComment(this.activityId, this.comment).subscribe(
      data => {
        console.log("Comment has been sent successfully");
        this.comment = '';
        this.openSnackBar(this.dictionary.commentAddedSuccessfully, "OK");
      }
    )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
