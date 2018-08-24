import { Component, OnInit } from '@angular/core';
import { ServerserviceService } from '../../serverservice.service';

@Component({
  selector: 'app-quizscore',
  templateUrl: './quizscore.component.html',
  styleUrls: ['./quizscore.component.css']
})
export class QuizscoreComponent implements OnInit {
  totalScore;
  quizName = 'Main Quiz';

  constructor(private serverservice: ServerserviceService) { }

  ngOnInit() {
    this.totalScore = this.serverservice.MainQuizScore;
    this.quizName = this.serverservice.MainQuizName;
  }
  clear() {
    this.serverservice.Quizquestion = '';
    this.serverservice.mainQuizId = 0;
    this.serverservice.mainQuizCounter = 0;
    this.serverservice.MainQuizScore = 0;
    this.serverservice.MainQuizName = '';
    console.log('allClear');
  }

}
