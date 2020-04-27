import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../app.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(public dictionary: DictionaryService) { }

  ngOnInit() {
  }

}
