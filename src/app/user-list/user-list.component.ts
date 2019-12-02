import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User } from '../model/user.model';
import { UserService } from '../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allUsersDisplayedColumns = ['username', 'name', 'surname', 'email'];
  allUsers = new MatTableDataSource<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.refreshUsersInfo();
  }

  refreshUsersInfo(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.allUsers.data = data;
      }
    )
  }

}
