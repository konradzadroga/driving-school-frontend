import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user/user.model';
import {Course} from './course/course.model'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/';

  public getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'me');
  }

}

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/';

  public getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + 'courses');
  }

}