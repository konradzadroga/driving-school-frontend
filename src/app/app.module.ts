import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from './core/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import {AppRoutingModule} from './core/app.routing.module';
import { LoginComponent } from './login/login.component';
import {UserService, CourseService, MessageService, PictureService, ContactService, ActivityService, ExamService, DictionaryService} from "./app.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./core/auth.service";
import {Interceptor} from "./core/interceptor";
import {TokenStorage} from "./core/token.storage";
import { CourseComponent } from './course/course.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { ImageSlideshowComponent} from './image-slideshow/image-slideshow.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChatComponent } from './chat/chat.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ContactComponent } from './contact/contact.component';
import { CourseActivityListComponent } from './course-activity-list/course-activity-list.component';
import { CourseAllListComponent } from './course-all-list/course-all-list.component';
import { CourseMineListComponent } from './course-mine-list/course-mine-list.component';
import { PaymentComponent } from './payment/payment.component';
import { CourseInstructedComponent } from './course-instructed/course-instructed.component';
import { CourseInstructedActivityListComponent } from './course-instructed-activity-list/course-instructed-activity-list.component';
import { PaymentSuccesfullComponent } from './payment-succesfull/payment-succesfull.component';
import { CourseActivityAddCommentComponent } from './course-activity-add-comment/course-activity-add-comment.component'
import { BarRatingModule } from "ngx-bar-rating";
import { CourseActivityMyListComponent } from './course-activity-my-list/course-activity-my-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { ExamComponent } from './exam/exam.component';
import { CourseExamListComponent } from './course-exam-list/course-exam-list.component';
import { CourseInfoComponent } from './course-info/course-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    CourseComponent,
    RegisterComponent,
    UserProfileComponent,
    HomeComponent,
    ImageSlideshowComponent,
    UserListComponent,
    ChatComponent,
    AdminPanelComponent,
    ContactComponent,
    CourseActivityListComponent,
    CourseAllListComponent,
    CourseMineListComponent,
    PaymentComponent,
    CourseInstructedComponent,
    CourseInstructedActivityListComponent,
    PaymentSuccesfullComponent,
    CourseActivityAddCommentComponent,
    CourseActivityMyListComponent,
    CourseAddComponent,
    ProgressSpinnerDialogComponent,
    ExamComponent,
    CourseExamListComponent,
    CourseInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BarRatingModule
  ],
  providers: [UserService, AuthService, TokenStorage, CourseService, MessageService, PictureService, ContactService, ActivityService, ExamService, DictionaryService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProgressSpinnerDialogComponent
  ]
})
export class AppModule { }