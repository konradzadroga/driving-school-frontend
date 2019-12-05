import { Component, OnInit } from '@angular/core';
import { UserService, PictureService } from '../app.service';
import { User, UserDTO } from '../model/user.model';
import { MatTableDataSource } from '@angular/material';
import { PictureDTO } from '../model/picture.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserDTO;
  picture: PictureDTO;
  file: File = null;
  form: FormGroup;
  displayedColumns = ['username', 'name', 'surname', 'email', 'pesel', 'birthdate'];
  dataSource = new MatTableDataSource<UserDTO>();

  constructor(private userService: UserService, private pictureService: PictureService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.refreshUserInfo();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      file_upload: null
    });
  }

  refreshUserInfo() {
    this.userService.getSignedInUser().subscribe(
      user => {
        this.user = user;
        this.pictureService.getUserPicture(this.user.username).subscribe(
          picture => {
            this.picture = picture;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error)
      }
    );
  }

  fileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    let body = new FormData();
    body.append("file", this.file);
    this.pictureService.uploadPicture(body)
    .subscribe(
      (data) => {this.picture = data},
      error => console.log(error),
      () => { console.log("completed") }
    );
  }

}

