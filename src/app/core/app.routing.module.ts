import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { LoginComponent } from '../login/login.component';
import { CourseComponent } from '../course/course.component';
import { RegisterComponent } from '../register/register.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HomeComponent } from '../home/home.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ChatComponent } from '../chat/chat.component';
import { ContactComponent } from '../contact/contact.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { CourseActivityListComponent } from '../course-activity-list/course-activity-list.component';
import { CourseAllListComponent } from '../course-all-list/course-all-list.component';
import { CourseMineListComponent } from '../course-mine-list/course-mine-list.component';
import { PaymentComponent } from '../payment/payment.component';
import { CourseInstructedComponent } from '../course-instructed/course-instructed.component';
import { CourseInstructedActivityListComponent } from '../course-instructed-activity-list/course-instructed-activity-list.component';
import { PaymentSuccesfullComponent } from '../payment-succesfull/payment-succesfull.component';
import { CourseActivityAddCommentComponent } from '../course-activity-add-comment/course-activity-add-comment.component';
import { CourseActivityMyListComponent } from '../course-activity-my-list/course-activity-my-list.component';
import { CourseAddComponent } from '../course-add/course-add.component';
import { ExamComponent } from '../exam/exam.component';
import { CourseExamListComponent } from '../course-exam-list/course-exam-list.component';
import { CourseInfoComponent } from '../course-info/course-info.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'course', component: CourseComponent, children: [
    {path: 'course-all-list', component: CourseAllListComponent},
    {path: 'course-mine-list', component: CourseMineListComponent},
    {path: 'course-instructed', component: CourseInstructedComponent},
    {path: 'course-exam-list', component: CourseExamListComponent},
    {path: 'course-activities', component: CourseActivityListComponent},
    {path: 'course-activities-mine', component: CourseActivityMyListComponent},
    {path: 'course-instructed-activities', component: CourseInstructedActivityListComponent, children: [
      {path: 'activity-add-comment', component: CourseActivityAddCommentComponent}
    ]}
  ] },
  { path: "course-info", component: CourseInfoComponent},
  { path: "exam", component: ExamComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin', component: AdminPanelComponent, children:
      [{path: 'user-list', component: UserListComponent},
      {path: 'add-course', component: CourseAddComponent}]
  },
  { path: '', component: HomeComponent },
  { path: 'payment', component: PaymentComponent},
  { path: 'payment-completed', component: PaymentSuccesfullComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
