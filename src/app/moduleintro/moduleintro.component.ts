import { Router , ActivatedRoute } from '@angular/router';
import { ServerserviceService } from './../serverservice.service';
import { Component, OnInit } from '@angular/core';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-moduleintro',
  templateUrl: './moduleintro.component.html',
  styleUrls: ['./moduleintro.component.css']
})
export class ModuleintroComponent implements OnInit {

  totalModules: any;
  url: string;
  currentModule: any;
  moduleIntro = {
    title : '',
    description : '',
    details : ''
  };
  userToken: string;
  selectedCourseId: any;
  data;
  videopresent = false;
  userStat = {
    module: -1,
    quiz: -1
  };
  gameURL: any;
  game: boolean;
  constructor(public serverservice: ServerserviceService, public router: Router , public route: ActivatedRoute,
     private userState: UserStateService) {

   }

  ngOnInit() {
    this.selectedCourseId = localStorage.getItem('courseId');
    this.url = window.location.href;
    this.currentModule = this.url.substring(this.url.indexOf('=') + 1, this.url.length);

    this.userToken = localStorage.getItem('userToken');
    this.data = this.userState.getAllData();
    this.initializeData(this.data);
    if (this.currentModule == 1) {
      this.videopresent = true;
    }
    console.log('videopresent is' + this.videopresent)
    this.userState.test();
    this.gameURL = this.data[this.currentModule].game;
    console.log(this.gameURL);
    if (typeof(this.gameURL) === 'undefined') {
      this.game = false;
      console.log('game false');
    } else {
      this.game = true;
      console.log ('game true');
    }
    localStorage.setItem('gameURL', this.gameURL);


    console.log(this.currentModule);
    // this.serverservice.getallModuleDetails(this.userToken, this.selectedCourseId).subscribe((response: any) => {
    //   console.log(response);
    // });
  }
  initializeData(response) {
    this.totalModules = response.length;
    if ( this.currentModule < this.totalModules) {
      this.serverservice.allmodulesarray = response[this.currentModule];
      console.log(response.length);
      this.moduleIntro = this.serverservice.allmodulesarray.intro;
    } else {
      this.router.navigateByUrl('/score');
    }
  }
  navigatToNxt() {
    if (this.game) {
       localStorage.setItem('gamethenquiz', '1');
       this.router.navigateByUrl('/game?ct=' + this.currentModule);
    } else {
       localStorage.setItem('gamethenquiz', '0');
      this.router.navigateByUrl('/quiz?ct=' + this.currentModule);
    }
  }
}
