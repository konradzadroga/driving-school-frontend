import { Component, OnInit } from '@angular/core';
import { Message, MessageDTO, SendMessageDTO } from '../model/message.model';
import { MessageService, UserService } from '../app.service';
import { TokenStorage } from '../core/token.storage';
import { MatTableDataSource } from '@angular/material';
import { UserDTO } from '../model/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  myUsername: string;
  messages: MessageDTO[];
  newMessage: SendMessageDTO;
  newMessageContent: string;
  admins = new MatTableDataSource<UserDTO>();
  instructors = new MatTableDataSource<UserDTO>();
  users = new MatTableDataSource<UserDTO>();
  displayedColumns = ['username', 'name', 'surname'];
  receiverUsername: string = '';
  mode: string = "admins";
  showMode: string = "Administratorzy";
  selectedRow;
  interval: any;


  constructor(private messageService: MessageService, private userService: UserService, private token: TokenStorage) { }

  ngOnInit() {
    this.myUsername = this.token.getUsername();
    this.refreshMessages();
    this.interval = setInterval(() => {
      this.refreshMessages()
    }, 1000);
    this.refreshUsersInfo();
  }

  refreshMessages(): void {
    this.messageService.getMessagesWithParticularUser(this.receiverUsername).subscribe(
      messages => {
        this.messages = messages;
      }
    );
  }

  refreshUsersInfo(): void {
    this.userService.getUsersWithParticularRole('ROLE_ADMIN').subscribe(
      admins => this.admins.data = admins
    );
    this.userService.getUsersWithParticularRole('ROLE_INSTRUCTORS').subscribe(
      instructors => this.instructors.data = instructors
    );
    this.userService.getUsersWithParticularRole('ROLE_ADMIN').subscribe(
      users => this.users.data = users
    );
  }

  switchReceiver(username: string) {
    this.receiverUsername = username;
    this.refreshMessages();
  }

  setMode(mode: string): void {
    switch (mode) {
      case "admins": {
        this.mode = "admins";
        this.showMode = "Administratorzy";
        break;
      }
      case "instructors": {
        this.mode = "instructors";
        this.showMode = "Instruktorzy";
        break;
      }
      case "users": {
        this.mode = "users";
        this.showMode = "Użytkownicy";
        break;
      }
    }
    this.refreshUsersInfo();
  }

  sendMessage(): void {
    this.newMessage = {
      "content": this.newMessageContent,
      "receiverUsername": this.receiverUsername
    }
    this.messageService.sendMessage(this.newMessage).subscribe(
      data => {
        this.newMessageContent = '';
        this.refreshMessages();
      }
    )
  }

  selectRow(row) {
    this.selectedRow = row;
    // more stuff to do...
  }

}
