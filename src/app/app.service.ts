import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserBasicDTO, UserDTO } from './model/user.model';
import { ActivityDTO } from './model/activity.model'
import { CourseDTO, AddCourseDTO } from './model/course.model'
import { MessageDTO, SendMessageDTO } from './model/message.model'
import { PictureDTO } from './model/picture.model'
import { ContactDTO } from './model/contact.model';
import { interval } from 'rxjs'
import { mergeMap } from 'rxjs/operators';
import { ExamDTO } from './model/exam.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

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

  constructor(private http: HttpClient) { }

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

  constructor(private http: HttpClient) { }

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

  constructor(private http: HttpClient) { }

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

  constructor(private http: HttpClient) { }

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


  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/activities/'

  public getActivitiesByCourse(id: number): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(this.url + 'courses/' + id);
  }

  public getActivitiesByCourseWhereUserIsSignedUp(id: number): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(this.url + 'courses/' + id + '/student');
  }

  public getActivitiesDatesByCourse(id: number): Observable<Date[]> {
    return this.http.get<Date[]>(this.url + 'courses/' + id + "/dates");
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

@Injectable()
export class ExamService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/exams/'

  public getAllExams(): Observable<ExamDTO[]> {
    return this.http.get<ExamDTO[]>(this.url);
  }

  public getExamsByCourseId(id: number): Observable<ExamDTO[]> {
    return this.http.get<ExamDTO[]>(this.url + "courses/" + id);
  }

  public getExamsByStudentUsername(username: string): Observable<ExamDTO[]> {
    return this.http.get<ExamDTO[]>(this.url + "students/" + username);
  }

  public getExamsByInstructorUsername(username: string): Observable<ExamDTO[]> {
    return this.http.get<ExamDTO[]>(this.url + "instructors/" + username);
  }

  public signInForAnExam(id: number): Observable<ExamDTO> {
    return this.http.put<ExamDTO>(this.url + "signin/" + id, null);
  }

}

@Injectable()
export class DictionaryService {

  listOfUsers: string;
  addCourse: string;
  ourPortalAllowsMessaging;
  admins: string;
  instructors: string;
  users: string;
  login: string;
  name: string;
  surname: string;
  chooseUserToStartChat: string;
  noMessagesWithThisUserYet: string;
  newMessage: string;
  contactWithUsUsingThisForm: string;
  ourAdminsWillReply: string;
  yourMessageThere: string;
  send: string;
  allCourses: string;
  myCourses: string;
  coursesManagedByMe: string;
  thereTypeYourComment: string;
  allActivities: string;
  myActivities: string;
  belowAllActivitiesInThisCourse: string;
  date: string;
  hour: string;
  instructor: string;
  signIn: string;
  youAreNotSignedForAnyActivities: string;
  belowAllActivitiesYourAreSignedTo: string;
  rate: string;
  comment: string;
  category: string;
  description: string;
  numberOfPlaces: string;
  price: string;
  instructorLogin: string;
  courseStartDate: string;
  belowAllCoursesYouCanSignTo: string;
  freePlaces: string;
  nameAndSurnameOfInstructor: string;
  belowAllExamsWithinCourse: string;
  isThisDateReserved: string;
  infoAboutTheCourse: string;
  backToExamMenu: string;
  belowAllCoursesYouAreInstructorTo: string;
  activities: string;
  nobodySignedInForActivities: string;
  belowAllActivitiesInThisCourseYouAreInstructing: string;
  student: string;
  commentIt: string;
  youHaveNoCourses: string;
  bellowAllCoursesYouAreSignedTo: string;
  internalExam: string;
  youHaveNoExams: string;
  bellowAllInternalExams: string;
  examPassed: string;
  no: string;
  yes: string;
  showCourseInfo: string;
  passingOver50: string;
  since1980: string;
  quailifiedInstructors: string;
  signInToPage: string;
  loginDemanded: string;
  passwordDemanded: string;
  wrongUsernameOrPassword: string;
  signUp: string;
  choosePaymentWay: string;
  paymentSuccessful: string;
  backToCourseList: string;
  pesel: string;
  dateOfBirth: string;
  uploadPhoto: string;
  nameIsDemanded: string;
  surnameIsDemanded: string;
  emailIsDemanded: string;
  email: string;
  peselIsDemanded: string;
  dateOfBirthIsDemanded: string;
  youAlreadyHaveAnAcc: string;
  belowListOfUsers: string;
  permissions: string;
  action: string;
  grantAdminPermissions: string;
  grantInstructorPermissions: string;
  startDate: string;
  successfullySignedInForExam: string;
  commentAddedSuccessfully: string;
  successfullySignedInForActivity: string;
  youDontHaveAnAcc: string;
  password: string;
  language: string;
  currentLanguage: string;
  homepage: string;
  links: string;
  theme: string;
  adminPanel: string;
  internalExams: string;
  courses: string;
  messages: string;
  contact: string;
  myProfile: string;
  signOut: string;

  constructor() { }

  getLanguage(): string {
    return this.language;
  }

  setLanguage(language: string): void {
    this.language = language;

    if (this.language === 'pl') {
      this.listOfUsers = 'Lista użytkowników';
      this.addCourse = 'Dodaj kurs';
      this.ourPortalAllowsMessaging = 'Nasz portal umożliwia rozmowy na chacie z administratorami, instruktorami oraz innymi użytkownikami portalu.';
      this.admins = 'Administratorzy';
      this.instructors = 'Instruktorzy';
      this.users = 'Użytkownicy';
      this.login = 'Login';
      this.name = 'Imię';
      this.surname = 'Nazwisko';
      this.chooseUserToStartChat = 'Wybierz użytkownika z menu po lewej stronie aby rozpocząć rozmowę.';
      this.noMessagesWithThisUserYet = 'Nie masz jeszcze wiadomości z tym użytkownikiem. Napisz pierwszą.';
      this.newMessage = 'Nowa wiadomość';
      this.contactWithUsUsingThisForm = 'Skontaktuj się z nami za pomocą poniższego formularza.';
      this.ourAdminsWillReply = 'Nasza administracja wyśle wiadomość e-mail z odpowiedzią tak szybko jak to będzie możliwe.';
      this.yourMessageThere = 'Tu wpisz swoją wiadomość';
      this.send = 'Wyślij';
      this.allCourses = 'Wszystkie kursy';
      this.myCourses = 'Moje kursy';
      this.coursesManagedByMe = 'Zarządzane przeze mnie kursy';
      this.thereTypeYourComment = 'Tu wpisz swoj komentarz';
      this.allActivities = 'Wszystkie zajęcia';
      this.myActivities = 'Moje zajęcia';
      this.belowAllActivitiesInThisCourse = 'Poniżej znajdują się wszystkie dostępne terminy zajęć praktycznych wewnątrz tego kursu na które możesz się zapisać.';
      this.date = 'Data';
      this.hour = 'Godzina';
      this.instructor = 'Instruktor';
      this.signIn = 'Zapisz się';
      this.youAreNotSignedForAnyActivities = 'Nie jesteś zapisany/a na żadne zajęcia.';
      this.belowAllActivitiesYourAreSignedTo = 'Poniżej znajdują się wszystkie zajęcia praktyczne na które jesteś zapisany/a.';
      this.rate = 'Ocena';
      this.comment = 'Komentarz';
      this.category = 'Kategoria';
      this.description = 'Opis';
      this.numberOfPlaces = 'Liczba miejsc';
      this.price = 'Koszt';
      this.instructorLogin = 'Login instruktora';
      this.courseStartDate = 'Data startu kursu';
      this.belowAllCoursesYouCanSignTo = 'Poniżej znajdują się wszystkie kursy na które możesz się zapisać.';
      this.freePlaces = 'Wolne miejsca';
      this.startDate = 'Data startu';
      this.nameAndSurnameOfInstructor = 'Imię i nazwisko instruktora';
      this.successfullySignedInForExam = 'Pomyślnie zapisałeś się na egzamin wewnętrzny';
      this.commentAddedSuccessfully = 'Komentarz został dodany pomyślnie';
      this.successfullySignedInForActivity = 'Rejestracja na zajęcia przebiegła pomyślnie';
      this.belowAllExamsWithinCourse = 'Poniżej znajdują się wszystkie dostępne terminy egzaminu wewnętrznego praktycznego wewnątrz tego kursu.';
      this.isThisDateReserved = 'Termin zarezerwowany';
      this.infoAboutTheCourse = 'Informacje o kursie';
      this.backToExamMenu = 'Powróć do listy egzaminów';
      this.belowAllCoursesYouAreInstructorTo = 'Poniżej znajdują się wszystkie kursy w których jesteś instruktorem.';
      this.activities = 'Zajęcia';
      this.nobodySignedInForActivities = 'Nikt się jeszcze nie zapisał na zajęcia praktyczne wewnątrz tego kursu.';
      this.belowAllActivitiesInThisCourseYouAreInstructing = 'Poniżej znajdują się wszystkie terminy zajęć na które zapisali się kursanci wewnątrz tego kursu oraz te które już się odbyły.';
      this.student = 'Kursant';
      this.commentIt = 'Skomentuj';
      this.youHaveNoCourses = 'Nie zapisałeś/aś się jeszcze na żaden kurs.';
      this.bellowAllCoursesYouAreSignedTo = 'Poniżej znajdują się wszystkie kursy na jakie zostałeś/aś zapisany/a.';
      this.internalExam = 'Egzamin wewnętrzny';
      this.youHaveNoExams = 'Nie zapisałeś/aś się jeszcze na żaden egzamin.';
      this.bellowAllInternalExams = 'Poniżej znajdują się wszystkie egzaminy wewnętrzne praktyczne na które jesteś zapisany/a oraz te które już się odbyły.';
      this.examPassed = 'Egzamin zaliczony';
      this.no = 'Nie';
      this.yes = 'Tak';
      this.showCourseInfo = 'Pokaż informacje o kursie';
      this.passingOver50 = 'Nasi kursanci uzyskali zdawalność egzaminów państwowych praktycznych powyżej 50%';
      this.since1980 = 'Jesteśmy rynku od 1980 roku';
      this.quailifiedInstructors = 'Posiadamy wysoce wykwalifikowanych instruktorów';
      this.signInToPage = 'Zaloguj się';
      this.loginDemanded = 'Login jest wymagany';
      this.passwordDemanded = 'Hasło jest wymagane i musi zawierać co najmniej 6 znaków';
      this.login = 'Login';
      this.password = 'Hasło';
      this.wrongUsernameOrPassword = 'Niepoprawna nazwa użytkownika lub hasło';
      this.youDontHaveAnAcc = 'Nie posiadasz konta?';
      this.signUp = 'Zarejestruj się';
      this.choosePaymentWay = 'Wybierz sposób płatności.';
      this.paymentSuccessful = 'Płatność zrealizowana pomyślnie.';
      this.backToCourseList = 'Powrót do listy kursów';
      this.pesel = 'Numer PESEL';
      this.dateOfBirth = 'Data urodzenia';
      this.uploadPhoto = 'Wstaw zdjęcie profilowe';
      this.nameIsDemanded = 'Imię jest wymagane';
      this.surnameIsDemanded = 'Nazwisko jest wymagane';
      this.emailIsDemanded = 'E-mail jest wymagany';
      this.email = 'E-mail';
      this.peselIsDemanded = 'PESEL jest wymagany i musi zawierać 11 znaków';
      this.dateOfBirthIsDemanded = 'Data urodzenia jest wymagana';
      this.youAlreadyHaveAnAcc = 'Masz już konto?';
      this.belowListOfUsers = 'Poniżej znajduje się lista użytkowników portalu. Jesteś administratorem, możesz zarządzać użytkownikami.';
      this.permissions = 'Uprawnienia';
      this.action = 'Akcja';
      this.grantAdminPermissions = 'Nadaj uprawnienia administratora';
      this.grantInstructorPermissions = 'Nadaj uprawnienia instruktora';
      this.currentLanguage = 'Zmień język';
      this.homepage = 'Strona domowa';
      this.links = 'Przydatne linki';
      this.theme = 'Zmień motyw';
      this.adminPanel = 'Panel administratora';
      this.internalExams = 'Egzaminy wewnętrzne';
      this.courses = 'Kursy';
      this.messages = 'Wiadomości';
      this.contact = 'Kontakt';
      this.myProfile = 'Mój profil';
      this.signOut = 'Wyloguj się';
    } else if (this.language === 'en') {
      this.listOfUsers = 'User list';
      this.addCourse = 'Add course';
      this.ourPortalAllowsMessaging = 'Our portal allows to chat with administrators, instructors and other users.';
      this.admins = 'Administrators';
      this.instructors = 'Instructors';
      this.users = 'Users';
      this.login = 'Login';
      this.name = 'Name';
      this.surname = 'Surname';
      this.chooseUserToStartChat = 'Choose user in menu on left to start the chat.';
      this.noMessagesWithThisUserYet = 'You don\'t have any messages with this user. Send first one';
      this.newMessage = 'New message';
      this.contactWithUsUsingThisForm = 'Contact with us using below form.';
      this.ourAdminsWillReply = 'Our administration will contact with you as soon as possible.';
      this.yourMessageThere = 'Type your message right there.';
      this.send = 'Send';
      this.allCourses = 'All courses';
      this.myCourses = 'My courses';
      this.coursesManagedByMe = 'Courses managed by me';
      this.thereTypeYourComment = 'Type your comment right there';
      this.allActivities = 'All classes';
      this.myActivities = 'My classes';
      this.belowAllActivitiesInThisCourse = 'Below are all available dates of practical classes inside this course that you can sign up for.';
      this.date = 'Date';
      this.hour = 'Time';
      this.instructor = 'Instructor';
      this.signIn = 'Sign up';
      this.youAreNotSignedForAnyActivities = 'You are not signed up for any classes.';
      this.belowAllActivitiesYourAreSignedTo = 'Below are all the practical classes you are enrolled in.';
      this.rate = 'Rate';
      this.comment = 'Comment';
      this.category = 'Category';
      this.description = 'Description';
      this.numberOfPlaces = 'Number of places';
      this.price = 'Price';
      this.instructorLogin = 'Instructor\'s login';
      this.courseStartDate = 'Start date of the course';
      this.belowAllCoursesYouCanSignTo = 'Below are all the courses you can sign up for.';
      this.freePlaces = 'Free places';
      this.startDate = 'Start date';
      this.nameAndSurnameOfInstructor = 'Name and surname of instructor';
      this.successfullySignedInForExam = 'You have successfully signed up for the internal exam';
      this.commentAddedSuccessfully = 'The comment has been added successfully';
      this.successfullySignedInForActivity = 'Registration for the classes was successful';
      this.belowAllExamsWithinCourse = 'Below are all available dates for the internal practical exam within this course.';
      this.isThisDateReserved = 'Is this date reserved?';
      this.infoAboutTheCourse = 'Informations about the course';
      this.backToExamMenu = 'Back to exams list';
      this.belowAllCoursesYouAreInstructorTo = 'Below are all the courses in which you are an instructor.';
      this.activities = 'Activities';
      this.nobodySignedInForActivities = 'Nobody has signed up for practical classes inside this course yet.';
      this.belowAllActivitiesInThisCourseYouAreInstructing = 'Below are all the dates of classes for which students have signed up for this course and those that have already taken place.';
      this.student = 'Student';
      this.commentIt = 'Comment';
      this.youHaveNoCourses = 'You have not yet signed up for any course.';
      this.bellowAllCoursesYouAreSignedTo = 'Below are all the courses you have enrolled in.';
      this.internalExam = 'Internal exam';
      this.youHaveNoExams = 'You have not signed up for any exam yet.';
      this.bellowAllInternalExams = 'Below are all internal practical exams that you have signed up for and those that have already taken place.';
      this.examPassed = 'Exam passed';
      this.no = 'No';
      this.yes = 'Yes';
      this.showCourseInfo = 'Show information about the course';
      this.passingOver50 = 'Our students have passed the practical state exams passing more than 50%';
      this.since1980 = 'We have been on the market since 1980';
      this.quailifiedInstructors = 'Our instructors are highly qualified';
      this.signInToPage = 'Sign in';
      this.loginDemanded = 'Login is demanded';
      this.passwordDemanded = 'Pasword is demanded and it needs to have at least 6 characters';
      this.login = 'Login';
      this.password = 'Password';
      this.wrongUsernameOrPassword = 'Wrong username or password';
      this.youDontHaveAnAcc = 'You don\'t have an account?';
      this.signUp = 'Sign up';
      this.choosePaymentWay = 'Choose your payment method.';
      this.paymentSuccessful = 'Payment completed successfully.';
      this.backToCourseList = 'Back to courses list';
      this.pesel = 'PESEL number';
      this.dateOfBirth = 'Birthdate';
      this.uploadPhoto = 'Upload your photo';
      this.nameIsDemanded = 'Name is demanded';
      this.surnameIsDemanded = 'Surname is demanded';
      this.emailIsDemanded = 'E-mail is demanded';
      this.email = 'E-mail';
      this.peselIsDemanded = 'PESEL is demanded and it needs to have 11 characters';
      this.dateOfBirthIsDemanded = 'Birthdate is demanded';
      this.youAlreadyHaveAnAcc = 'Already have an account?';
      this.belowListOfUsers = 'Below is list of the users. You are administrator, you can manage users and their permissions.';
      this.permissions = 'Permissions';
      this.action = 'Action';
      this.grantAdminPermissions = 'Grant administrator permissions';
      this.grantInstructorPermissions = 'Grant instructor permissions';
      this.currentLanguage = 'Switch language';
      this.homepage = 'Homepage';
      this.links = 'Useful links';
      this.theme = 'Switch theme';
      this.adminPanel = 'Admin panel';
      this.internalExams = 'Internal exams';
      this.courses = 'Courses';
      this.messages = 'Messages';
      this.contact = 'Contact';
      this.myProfile = 'My profile';
      this.signOut = 'Sign out';
    }

  }

}


