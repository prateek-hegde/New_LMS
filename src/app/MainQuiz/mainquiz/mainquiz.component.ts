import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
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
  quizID;
  // quizData;
  userToken;
  quiz = [];
  qustionLength: number;
  questionCounter;
  currentQuestion: any;
  mediaURL: any;
  disabled = false;
  quizOptions = [];
  subject = new Subject();
  couter;
  countDown = 200;
  timer;
  isImage;
  imageUrl;
  correctAns: any;
  clickedList: any;
  score = 0;
  correctList: any;
  optionClass = '';
  sendScore = {};

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    this.captureValues();
    event.returnValue = false;
  }

  constructor(public el: ElementRef, private serverservice: ServerserviceService, private router: Router, public renderer: Renderer2) { }

  captureValues() {
    localStorage.setItem('questionCounter', this.questionCounter);
  }

  nextQuestion(){
    this.questionCounter++ ;

    if (this.questionCounter < this.qustionLength){
      this.startTimer();
      this.currentQuestion = this.quiz[this.questionCounter].question; 
      this.quizOptions = this.quiz[this.questionCounter].options;
      this.correctAns = this.quiz[this.questionCounter].correctAnswer;
      this.mediaURL = this.quiz[this.questionCounter].media;
      
      if(this.mediaURL === null || this.mediaURL === undefined){
        this.isImage = false;
      } else {
        this.isImage = true;
        this.imageUrl = this.mediaURL;
      }
      
      
    } else {
      console.log('qstn counter', this.questionCounter);
      
      localStorage.setItem('questionCounter', null);
      localStorage.setItem('quizID', null);
      console.log('game over');

      this.sendScore = {
        quizID: this.quizID,
        score: this.score,
        token: this.userToken
      }
      if(this.questionCounter > 0){
        this.serverservice.sendQuizScore(this.sendScore).subscribe((response) => {
          this.questionCounter = -1;
          console.log('posting score');
          setTimeout(() => {
            this.router.navigate(['quizscore']);
          }, 500);
    
        });
    }
     
      
    }
  }

  skip() {
    this.timer.unsubscribe();
    this.nextQuestion();
  }

  startTimer() {
    this.timer = timer(1, 1000);
    this.timer = this.timer.pipe(takeUntil(this.subject)).subscribe(x => {
      if (x <= this.countDown) {
        this.couter = this.countDown - x;
      } else {
        this.subject.next();
        this.timer.unsubscribe();
        this.nextQuestion();
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
      // this.renderer.addClass(this.correctList, 'choicebuttoncorrect');
      this.renderer.addClass(this.clickedList, 'selected');
      setTimeout(() => {
        // this.renderer.removeClass(this.correctList, 'choicebuttoncorrect');
        this.renderer.removeClass(this.clickedList, 'selected');
        this.disabled = false;
        this.nextQuestion();
      }, 600);
    } else {
      // this.score = this.score - 10;
      // this.renderer.addClass(this.correctList, 'choicebuttoncorrect');
      // this.renderer.addClass(this.clickedList, 'choicebuttonwrong');
      this.renderer.addClass(this.clickedList, 'selected');
      this.timer.unsubscribe();
      setTimeout(() => {
        // this.renderer.removeClass(this.correctList, 'choicebuttoncorrect');
        // this.renderer.removeClass(this.clickedList, 'choicebuttonwrong');
        this.renderer.addClass(this.clickedList, 'selected');
        this.disabled = false;
        this.nextQuestion();
      }, 600);
    }
  }

  isLoggedIn(){
    this.userToken = localStorage.getItem('userToken');
    if(this.userToken === null || this.userToken === undefined){
        this.router.navigate(['login']);
    }
  }

  checkQuiz(){
    // console.log('check api called');
    let data = {
      quizID: this.quizID
    }
    this.serverservice.isPlayed(data).subscribe((response: any) => {
      console.log(response);
      
      if(response.message === 1){
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit() {
    this.quizID = localStorage.getItem('quizID');
    this.isLoggedIn();
    this.checkQuiz();
    this.serverservice.getquizquestion(this.quizID).subscribe((response: any) => {
      this.quiz = response[0].quizObject; 
      
      this.questionCounter = localStorage.getItem('questionCounter');
      if (this.questionCounter === null) {
        localStorage.setItem('questionCounter', '-1');
        this.questionCounter = -1;
      }  
      
      this.qustionLength = this.quiz.length;
      this.nextQuestion();

    });
      

  }

  ngOnDestroy() {
    localStorage.setItem('questionCounter', this.questionCounter);
  }
  

}
