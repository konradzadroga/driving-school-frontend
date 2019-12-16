import { Component } from '@angular/core';
import { UserService } from './app.service';
import { TokenStorage } from './core/token.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'driving-school-app';

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isInstructor: boolean = false;
  otherTheme: boolean = false;
  roles: string[] = [];
  username: string = '';

  constructor(private token: TokenStorage, private router: Router) {
    document.body.classList.add('dark-theme');
    if (token.isUserSignedIn()) {
      this.isLoggedIn = true;
      this.username = token.getUsername();
      this.roles = token.getAuthorities();
    }
    this.roles.forEach(role => {
      if (role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (role === 'ROLE_INSTRUCTOR') {
        this.isInstructor = true;
      }
    })
  }

  changeTheme() {
    if (document.body.classList.contains('default-theme')) {
      document.body.classList.remove('default-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('default-theme');
    }
  }

  signOut(): void {
    this.token.signOut();
    this.router.navigate(['home']).then(() =>
    this.token.reloadPage());
  }

}
