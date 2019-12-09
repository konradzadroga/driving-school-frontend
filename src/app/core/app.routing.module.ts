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

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'course', component: CourseComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin', component: AdminPanelComponent, children:
      [{path: 'user-list', component: UserListComponent}]
  },
  { path: '', component: HomeComponent },
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
