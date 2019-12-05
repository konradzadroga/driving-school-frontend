import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CustomMaterialModule} from './core/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import {AppRoutingModule} from './core/app.routing.module';
import { LoginComponent } from './login/login.component';
import {UserService, CourseService, MessageService, PictureService} from "./app.service";
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
import { AdminPanelComponent } from './admin-panel/admin-panel.component'

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
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [UserService, AuthService, TokenStorage, CourseService, MessageService, PictureService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }