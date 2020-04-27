import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../app.service';

@Component({
  selector: 'app-payment-succesfull',
  templateUrl: './payment-succesfull.component.html',
  styleUrls: ['./payment-succesfull.component.scss']
})
export class PaymentSuccesfullComponent implements OnInit {

  constructor(public dictionary: DictionaryService) { }

  ngOnInit() {
  }

}
