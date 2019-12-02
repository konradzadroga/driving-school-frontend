import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserDTO} from './model/user.model';
import {Course} from './model/course.model'
import {Message, MessageDTO, SendMessageDTO} from './model/message.model'
import { interval } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/users/';

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public getSignedInUser(): Observable<User> {
    return this.http.get<User>(this.url + 'me');
  }

  public addCourseToUser(id: number): Observable<User> {
    return this.http.put<User>(this.url + 'users/courses/add/' + id, null);
  }

  public getUsersWithParticularRole(role: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.url + 'roles/' + role);
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

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/messages/';

  public getMessagesWithParticularUser(username: string): Observable<MessageDTO[]> {
    return this.http.get<MessageDTO[]>(this.url + username);
  }

  public getMessagesWithParticularUserWithTicker(username: string) {
    return interval(5000).pipe(
      mergeMap(() => {
        return this.http.get<MessageDTO[]>(this.url + username)
      })
    );
  }

  public sendMessage(message: SendMessageDTO): Observable<Message> {
    return this.http.post<Message>(this.url + 'send', message);
  }
  

}