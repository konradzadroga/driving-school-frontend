import { Component, OnInit } from '@angular/core';
import { ContactService } from '../app.service';
import { ContactDTO } from '../model/contact.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: ContactDTO = {
    "content": ''
  }

  buttonLocked: boolean = false;

  constructor(private contactService: ContactService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  sendContactRequest() {
    this.contactService.sendContactRequest(this.contact).subscribe(
      data => {
        console.log("Contact request has been sent successfully");
        this.contact.content = '';
        this.openSnackBar("Wiadomość została wysłana", "OK");
        this.buttonLocked = false;
      }
    )
  }

  lockButton() {
    this.buttonLocked = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
