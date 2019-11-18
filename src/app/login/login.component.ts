import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {
  }

  username: string;
  password: string;
  loginFailed: boolean = false;
  loggedIn: boolean = false;
  errorMsg: string = '';

  ngOnInit() {
    if (this.loggedIn != false) {
      this.router.navigate(['user']);
    }
  }

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.loginFailed = false;
        this.token.saveToken(data.token);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.authorities);
        this.loggedIn = true;
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMsg = error.error.message;
        this.loginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}