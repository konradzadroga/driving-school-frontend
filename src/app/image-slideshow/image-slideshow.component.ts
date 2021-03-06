import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { DictionaryService } from '../app.service';

@Component({
  selector: 'app-image-slideshow',
  templateUrl: './image-slideshow.component.html',
  styleUrls: ['./image-slideshow.component.scss']
})
export class ImageSlideshowComponent implements OnInit {


  constructor(config: NgbCarouselConfig, public dictionary: DictionaryService) {  
    config.interval = 2000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = true;  
  }  

  ngOnInit() {
  }

}
