import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBasicDTO, UserDTO} from './model/user.model';
import {Course, CourseDTO} from './model/course.model'
import {MessageDTO, SendMessageDTO} from './model/message.model'
import {PictureDTO} from './model/picture.model'
import {ContactDTO} from './model/contact.model';
import { interval } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/users/';

  public getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.url);
  }

  public getSignedInUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.url + 'me');
  }

  public addCourseToUser(id: number): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.url + 'courses/add/' + id, null);
  }

  public getUsersWithParticularRole(role: string): Observable<UserBasicDTO[]> {
    return this.http.get<UserBasicDTO[]>(this.url + 'roles/' + role);
  }


}

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/courses';

  public getCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.url);
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

  public sendMessage(message: SendMessageDTO): Observable<any> {
    return this.http.post<any>(this.url + 'send', message);
  }
  

}

@Injectable()
export class PictureService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/pictures/'

  public uploadPicture(file: any): Observable<PictureDTO> {
    return this.http.post<PictureDTO>(this.url + 'upload', file);
  }

  public getUserPicture(username: String): Observable<PictureDTO> {
    return this.http.get<PictureDTO>(this.url + username);
  }

}

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/contact/'

  public sendContactRequest(contact: ContactDTO): Observable<ContactDTO> {
    return this.http.post<ContactDTO>(this.url, contact);
  }

}