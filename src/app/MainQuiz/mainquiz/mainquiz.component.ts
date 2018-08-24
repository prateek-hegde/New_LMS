import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ServerserviceService } from '../../serverservice.service';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainquiz',
  templateUrl: './mainquiz.component.html',
  styleUrls: ['./mainquiz.component.css']
})
export class MainquizComponent implements OnInit {
  id = '5b7da438034379661ff93950';
  quiz = [];
  qustionLength: number;
  questionCounter: number;
  currentQustion: any;
  mediaURL: any;
  disabled = false;
  currentOption = [];
  subject = new Subject();
  couter;
  countDown = 2;
  timer;
  data = [];
  qtimer: void;
  correctAns: any;
  clickedList: any;
  score = 0;
  correctList: any;
  optionClass = '';
  sendScore = {
    quizID : '',
    score: 0,
  };


  constructor(public el: ElementRef, private serverservice: ServerserviceService, private router: Router, public renderer: Renderer2) { }

  ngOnInit() {
    this.id = this.serverservice.mainQuizId;
    this.questionCounter = 0;
    this.serverservice.getquizquestion(this.id).subscribe((response: any) => {
      for (const quiz of response) {
        console.log(response);
        this.quiz.push(quiz.quizObject);
      }
      console.log(this.quiz);
      console.log(this.quiz[this.serverservice.mainQuizCounter].length);
      console.log(this.serverservice.mainQuizCounter);
      this.qustionLength = this.quiz[this.serverservice.mainQuizCounter].length;
      console.log(this.qustionLength);
      this.startTimer();
      if (this.questionCounter < this.qustionLength) {
        console.log(this.quiz[this.serverservice.mainQuizCounter]);
        console.log('ajsdh');
        this.currentQustion = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].question;
        this.mediaURL = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].media;
        this.correctAns = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].correctAnswer;
        for (const j of this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].options) {
          this.currentOption.push(j);
        }
        this.qtimer = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].time;
        console.log(this.correctAns);
      }
    });
  }
  store() {
    console.log('ashdgksjd');
    if (this.questionCounter < this.qustionLength) {
      console.log(this.quiz[this.serverservice.mainQuizCounter]);
      console.log('ajsdh');
      this.currentQustion = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].question;
      this.correctAns = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].correctAnswer;
      this.mediaURL = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].media;
      this.currentOption = [];
      for (const j of this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].options) {
        this.currentOption.push(j);
      }
      this.qtimer = this.quiz[this.serverservice.mainQuizCounter][this.questionCounter].time;
      console.log(this.currentOption);
      this.startTimer();
    } else {
      this.sendScore.quizID = this.id;
      this.sendScore.score = this.score;
      this.serverservice.sendQuizScore(this.sendScore).subscribe((response: any) => {
        console.log(response);
      });
      this.serverservice.MainQuizScore = this.score;
      this.router.navigate(['quizscore']);
    }
  }
  startTimer() {
    this.timer = timer(1, 1000);
    this.timer = this.timer.pipe(takeUntil(this.subject)).subscribe(x => {
      if (x <= this.countDown) {
        this.couter = this.countDown - x;
      } else {
        this.subject.next();
        this.timer.unsubscribe();
        this.questionCounter += 1;
        this.store();
      }
    });
  }

  check(index) {
    this.clickedList = this.el.nativeElement.getElementsByClassName(
      'dynamic' + index
    )[0];
    this.correctList = this.el.nativeElement.getElementsByClassName(
      'dynamic' + (this.correctAns - 1)
    )[0];
    console.log(this.correctList);
    this.disabled = true;
    if (this.correctAns === index + 1) {
      this.timer.unsubscribe();
      this.score = this.score + 10;
      this.renderer.addClass(this.correctList, 'choicebuttoncorrect');
      setTimeout(() => {
        this.renderer.removeClass(this.correctList, 'choicebuttoncorrect');
        this.disabled = false;
        this.questionCounter += 1;
        this.store();
      }, 1500);
    } else {
      this.score = this.score - 10;
      this.renderer.addClass(this.correctList, 'choicebuttoncorrect');
      this.renderer.addClass(this.clickedList, 'choicebuttonwrong');
      this.timer.unsubscribe();
      setTimeout(() => {
        this.renderer.removeClass(this.correctList, 'choicebuttoncorrect');
        this.renderer.removeClass(this.clickedList, 'choicebuttonwrong');
        this.disabled = false;
        this.questionCounter += 1;
        this.store();
      }, 1500);
    }
  }
  skip() {
    this.timer.unsubscribe();
    this.questionCounter += 1;
    this.store();
  }

}
