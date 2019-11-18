import { Component } from '@angular/core';
import { UserService } from './app.service';
import { TokenStorage } from './core/token.storage';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'driving-school-app';

  otherTheme: boolean = false;
  username: string = 'aa';
  isLoggedIn: boolean = false;
  user: User;

  constructor(private token: TokenStorage, private userService: UserService) {
    document.body.classList.add('dark-theme');
    if (token.isUserSignedIn()) {
      this.isLoggedIn = true;
      this.username = token.getUsername();
      console.log(token.getAuthorities());
    }
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

}
