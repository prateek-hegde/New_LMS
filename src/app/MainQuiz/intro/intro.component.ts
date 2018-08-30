import { Component, OnInit } from '@angular/core';
import { ServerserviceService } from '../../serverservice.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  quiz = {
    name: '',
    details: '',
    description: ''
  };
  videopresent: boolean;
  quizID;
  quizQuestion = {};
  constructor(private serverservice: ServerserviceService) { }

  ngOnInit() {
    this.quizID = this.serverservice.mainQuizId;
    
    if(this.quizID === null || this.quizID === undefined){
      this.quizID = localStorage.getItem('quizID');
    }
    localStorage.setItem('quizID', this.quizID);
    this.serverservice.getquizquestion(this.quizID).subscribe((response: any) => {
      this.quiz = response[0]; 
      // this.quizQuestion = response[0].quizObject;

      // localStorage.setItem('quizData', this.quizQuestion);
      });
  }
}