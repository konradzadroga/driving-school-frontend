import { Component, OnInit } from '@angular/core';
import { UserService } from '../app.service';
import { User } from '../user/user.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  displayedColumns = ['username', 'name', 'surname', 'email', 'pesel', 'birthdate'];
  dataSource = new MatTableDataSource<User>();
  username: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getSignedInUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error)
      }
    );
  }
}
