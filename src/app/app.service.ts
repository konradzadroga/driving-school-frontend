import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {UserBasicDTO, UserDTO} from './model/user.model';
import {ActivityDTO} from './model/activity.model'
import {CourseDTO, AddCourseDTO} from './model/course.model'
import {MessageDTO, SendMessageDTO} from './model/message.model'
import {PictureDTO} from './model/picture.model'
import {ContactDTO} from './model/contact.model';
import { interval } from 'rxjs'
import { mergeMap} from 'rxjs/operators';


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

  public deleteUser(username: string): Observable<UserDTO> {
    return this.http.delete<UserDTO>(this.url + username + '/delete')
  }

  public assignRoleToUser(role: string, username: string): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.url + 'roles/assign/' + role + '/' + username, null);
  }


}

@Injectable()
export class CourseService {

  private courseIdSource = new BehaviorSubject<number>(-1);
  
  currentCourseId = this.courseIdSource.asObservable();

  private url = 'http://localhost:8080/courses';

  constructor(private http: HttpClient) {}

  public changeCourseId(id: number) {
    this.courseIdSource.next(id);
  }

  public getCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.url);
  }

  public getCourseById(id: number): Observable<CourseDTO> {
    return this.http.get<CourseDTO>(this.url + '/' + id);
  }

  public getInstructorCourses(username: string): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(this.url + '/instructor/' + username);
  }

  public addCourse(courseDTO: AddCourseDTO): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(this.url + '/add', courseDTO);
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

@Injectable()
export class ActivityService {

  private activityIdSource = new BehaviorSubject<number>(-1);
  
  currentActivityId = this.activityIdSource.asObservable();

  public changeActivityId(id: number) {
    this.activityIdSource.next(id);
  }


  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/activities/'

  public getActivitiesByCourse(id: number): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(this.url +'courses/' + id);
  }

  public getActivitiesByCourseWhereUserIsSignedUp(id: number): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(this.url + 'courses/' + id + '/student');
  }

  public getActivitiesDatesByCourse(id: number): Observable<Date[]> {
    return this.http.get<Date[]>(this.url +'courses/' + id + "/dates");
  }

  public getUserActivitesByCourse(id: number): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(this.url + 'courses/' + id + "/mine");
  }

  public signUpForActivity(id: number): Observable<ActivityDTO> {
    return this.http.post<ActivityDTO>(this.url + 'courses/' + id + '/signup', null);
  }

  public addComment(id: number, comment: string): Observable<ActivityDTO> {
    return this.http.post<ActivityDTO>(this.url + id + '/comment', comment);
  }

  public addRate(id: number, rate: number): Observable<ActivityDTO> {
    return this.http.post<ActivityDTO>(this.url + id + '/rate/' + rate, null);
  }


}