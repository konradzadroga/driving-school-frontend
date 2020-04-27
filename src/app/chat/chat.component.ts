import { Component, OnInit } from '@angular/core';
import { Message, MessageDTO, SendMessageDTO } from '../model/message.model';
import { MessageService, UserService, DictionaryService } from '../app.service';
import { TokenStorage } from '../core/token.storage';
import { MatTableDataSource } from '@angular/material';
import { UserBasicDTO } from '../model/user.model';

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
  admins = new MatTableDataSource<UserBasicDTO>();
  instructors = new MatTableDataSource<UserBasicDTO>();
  users = new MatTableDataSource<UserBasicDTO>();
  displayedColumns = ['username', 'name', 'surname'];
  receiverUsername: string = '';
  mode: string = "admins";
  showMode: string = "Administratorzy";
  selectedRow;
  interval: any;
  noMessagesYet: boolean = false;


  constructor(private messageService: MessageService, private userService: UserService, private token: TokenStorage, public dictionary: DictionaryService) { }

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
        this.noMessagesYet = false;
      }, error => {
        this.noMessagesYet = true;
      }
    );
  }

  refreshUsersInfo(): void {
    this.userService.getUsersWithParticularRole('ROLE_ADMIN').subscribe(
      admins => this.admins.data = admins
    );
    this.userService.getUsersWithParticularRole('ROLE_INSTRUCTOR').subscribe(
      instructors => this.instructors.data = instructors
    );
    this.userService.getUsersWithParticularRole('ROLE_USER').subscribe(
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
        this.refreshMessages();
      }
    )
  }

  selectRow(row) {
    this.selectedRow = row;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
