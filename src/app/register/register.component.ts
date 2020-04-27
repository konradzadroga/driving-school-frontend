import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DictionaryService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(private router: Router, private authService: AuthService, public dictionary: DictionaryService) { }

  public errorMsg;
  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  pesel: string = '';
  birthdate: Date;
  password: string = '';
  roles = ['ROLE_USER'];
  buttonLocked: boolean = false;
  maxDate: Date = new Date(2001, 0, 1);

  matcher = new ErrorStateMatcher();

  usernameFC = new FormControl('', [
    Validators.required,
  ]);

  nameFC = new FormControl('', [
    Validators.required,
  ]);

  surnameFC = new FormControl('', [
    Validators.required,
  ]);

  emailFC = new FormControl('', [
    Validators.required,
  ])

  birthdateFC = new FormControl('', [
    Validators.required,
  ])

  passwordFC = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  peselFC = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11)
  ]);

  register(): void {
    this.authService.attemptRegistration(this.username, this.name, this.surname, this.email, this.pesel,
      this.birthdate, this.password, this.roles).subscribe(
      data => {
        this.router.navigate(['login']);
      },
      error => {
        this.errorMsg = error;
        this.buttonLocked = false;
      }
    );
  }

  lockButton(): void {
    this.buttonLocked = true;
  }

}
