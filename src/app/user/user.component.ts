import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from '../model/user.model';
import {UserService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
  }

}