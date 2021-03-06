import { Component, OnInit } from '@angular/core';
import { DetailpageComponent } from '../detailpage/detailpage.component';
import { ServerserviceService } from '../serverservice.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css']
})
export class GameComponentComponent implements OnInit {
  quizPercent: string;
  gamePercent: string;
  gameURL: string;
  nativeURL: String;
  currentModule: string;
  courseID: string;
  score: string;
  currentModuleCounter;
  token;
  url;
  constructor(public serverService: ServerserviceService, public sanitizer: DomSanitizer, public router: Router ) { }

  ngOnInit() {
    this.currentModuleCounter = this.serverService.currentModuleCounter;
    this.token = localStorage.getItem('userToken');
    this.score = localStorage.getItem('quizScore');
    this.courseID =  localStorage.getItem('courseId');
    this.gameURL = localStorage.getItem('gameURL');
    this.quizPercent = localStorage.getItem('quizPercent');
    this.nativeURL = window.location.href;
    this.currentModule = this.nativeURL.substring(this.nativeURL.indexOf('=') + 1, this.nativeURL.length);
    this.url = this.gameURL + '?ct=' + this.currentModule +
    '&tk=' + this.token + '&id=' + this.courseID ;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.url);
  }

}
