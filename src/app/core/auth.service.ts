import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  appUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('Trying to authenticate.');
    return this.http.post<any>(this.appUrl + "signin", credentials);
  }

  attemptRegistration(username: string, name: string, surname: string, email: string, pesel: string, birthdate: Date,
    password: string, roles: string[]): Observable<any> {
      const signUpForm = {username: username, name: name, surname: surname, email: email, pesel: pesel, birthdate: Date, 
      password: password, roles: roles}
      const options = {responseType: 'text' as 'json'}
      return this.http.post<any>(this.appUrl + "signup", signUpForm, options)
    }

}