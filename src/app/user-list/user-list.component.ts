import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { User, UserDTO } from '../model/user.model';
import { UserService } from '../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allUsersDisplayedColumns = ['username', 'name', 'surname', 'email', 'roles', 'action'];
  allUsers = new MatTableDataSource<UserDTO>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.refreshUsersInfo();
  }

  refreshUsersInfo(): void {
    this.userService.getAllUsers().subscribe(
      users => {
        this.allUsers.data = users;
        this.mapRoles();
      }
    )
  }

  mapRoles() : void {
    this.allUsers.data.forEach(user => {

      let userRoles: string[] = [];

      user.roles.forEach(role => {
        if (role === "ROLE_ADMIN") {
          userRoles.push("Administrator");
        }
        if (role === "ROLE_INSTRUCTOR") {
          userRoles.push("Instruktor");
        }
        if (role === "ROLE_USER") {
          userRoles.push("Użytkownik");
        }
      });
      user.roles = userRoles;
    });
  }

  deleteUser(username: string): void {
    this.userService.deleteUser(username).subscribe(
      data => {
        this.refreshUsersInfo();
      })
  }

  makeUserAdmin(username: string): void {
    this.userService.assignRoleToUser("ROLE_ADMIN", username).subscribe(
      data => {
        this.refreshUsersInfo();
      }
    )
  }

  makeUserInstructor(username: string): void {
    this.userService.assignRoleToUser("ROLE_INSTRUCTOR", username).subscribe(
      data => {
        this.refreshUsersInfo();
      }
    )
  }

}
