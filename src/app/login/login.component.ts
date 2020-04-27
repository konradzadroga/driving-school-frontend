import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, ErrorStateMatcher, MatDialogRef} from '@angular/material';
import {AuthService} from '../core/auth.service';
import {TokenStorage} from '../core/token.storage';
import { FormControl, Validators } from '@angular/forms';
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';
import { DictionaryService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage, public dictionary: DictionaryService) {
  }

  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  loggedIn: boolean = false;
  errorMsg: string = '';

  matcher = new ErrorStateMatcher();

  usernameFC = new FormControl('', [
    Validators.required,
  ])

  passwordFC = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  ngOnInit() {
    if (this.token.isUserSignedIn()) {
      this.router.navigate(['home']);
    }
  }

  login(): void {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.loginFailed = false;
        this.token.saveToken(data.token);
        this.token.saveUsername(data.username);
        this.token.saveAuthorities(data.authorities);
        this.loggedIn = true;
        dialogRef.close();
        this.token.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMsg = error;
        this.loginFailed = true;
        dialogRef.close();
      }
    );
  }


}