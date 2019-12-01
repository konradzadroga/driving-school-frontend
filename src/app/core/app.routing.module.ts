import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {LoginComponent} from '../login/login.component';
import { CourseComponent } from '../course/course.component';
import { RegisterComponent } from '../register/register.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { HomeComponent } from '../home/home.component';
import { UserListComponent } from '../user-list/user-list.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'course', component: CourseComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'home', component: HomeComponent},
  {path : '', component : HomeComponent},
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
