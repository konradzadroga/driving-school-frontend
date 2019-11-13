import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  constructor(private router: Router, private authService: AuthService) { }

  username: string;
  name: string;
  surname: string;
  email: string;
  pesel: string;
  birthdate: Date;
  password: string;
  roles = ['ROLE_USER'];

  register(): void {
    this.authService.attemptRegistration(this.username, this.name, this.surname, this.email, this.pesel,
      this.birthdate, this.password, this.roles).subscribe(
      data => {
        this.router.navigate(['login']);
        console.log(data)
      }
    );
  }

}
