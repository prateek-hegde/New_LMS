import { ServerserviceService } from './../serverservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, Subject } from 'rxjs';

import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  Renderer2,
  HostListener
} from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  nativeURL: string;
  postData: {};
  quizPercent: number;
  game: boolean;
  gameURL: any;
  url: string;
  data;
  correctList: any;
  clickedList: any;
  correctAnswer: any;
  imageUrl: any;
  currentQustionMedia: any;
  currentOption: any;
  qustionLength;
  quizdetails = [];
  userToken: string;
  selectedCourseId: any;
  subject = new Subject();
  couter;
  countDown = 14;
  currentModule;
  questionCounter;
  quizQustions = [];
  currentQustion;
  timer;
  isimage;
  disabled = false;
  score = 0;
  tempGameScore: any;
  postForTempData: any;
  gameandthenquiz: any;

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    console.log('Processing beforeunload...');
    this.captureValues();
    event.returnValue = false;
  }

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    public serverservice: ServerserviceService,
    public route: ActivatedRoute,
    public router: Router,
    public userState: UserStateService
  ) { }
  captureValues() {
    localStorage.setItem('questionCounter', this.questionCounter);
  }
  // nextQuestion Starts Here
  nextQuestion() {
    this.questionCounter++;
    console.log(this.questionCounter);
    if (this.questionCounter < this.qustionLength) {
      this.startTimer();
      this.currentQustion = this.quizQustions[
        this.questionCounter
      ].question.qstn;
      this.currentOption = this.quizQustions[this.questionCounter].options;
      this.correctAnswer = this.quizQustions[this.questionCounter].correctAns;
      console.log(this.currentOption);
      this.currentQustionMedia = this.quizQustions[
        this.questionCounter
      ].question.media;
      if (this.currentQustionMedia === null || this.currentQustionMedia === 'undefined' || this.currentQustionMedia === 'undefined,null') {
        this.isimage = false;
      } else {
        this.isimage = true;
        this.imageUrl = this.quizQustions[
          this.questionCounter
        ].question.mediaURL;
      }
    } else {
      if (this.serverservice.currentModuleCounter <= this.data.length) {
        this.serverservice.currentModuleCounter++;
        this.questionCounter = -1;
        localStorage.setItem('questionCounter', null);

        console.log(localStorage.getItem('questionCounter'));
        localStorage.setItem('quizScore', String(this.score));
        this.nativeURL = window.location.href;

        console.log('score is' + this.score);
        this.quizPercent = ((this.score / (this.qustionLength * 10)) * 100);
        console.log('this is quiz score' + this.quizPercent);
        console.log('game and the quiz outside ' + this.gameandthenquiz);

        if ( this.gameandthenquiz === 1 ) {
          console.log('game and the quiz inside 1 ' + this.gameandthenquiz);
          console.log('this is type of gatq inside 1 ' + typeof(this.gameandthenquiz));
        this.postData = {
          courseID: localStorage.getItem('courseId'),
          score: (this.quizPercent + Number(this.tempGameScore)) / 2,
          module: this.nativeURL.substring(this.nativeURL.indexOf('=') + 1, this.nativeURL.length),
          token: localStorage.getItem('userToken')
        };
      } else {
        console.log('game and the quiz inside 0 ' + this.gameandthenquiz);
        console.log('this is type of gatq inside 0' + typeof(this.gameandthenquiz));
        this.postData = {
          courseID: localStorage.getItem('courseId'),
          score: this.quizPercent,
          module: this.nativeURL.substring(this.nativeURL.indexOf('=') + 1, this.nativeURL.length),
          token: localStorage.getItem('userToken')
        };
      }
        console.log(this.postData);
        this.serverservice.sendModuleData(this.postData).subscribe((response: any) => {
          console.log(response);
        });
        setTimeout(() => {
          this.router.navigateByUrl('/moduleintro?ct=' + ++this.currentModule);
        }, 300);

      }
      console.log('Game Over');
    }
  }

  check(index) {
    this.clickedList = this.el.nativeElement.getElementsByClassName(
      'dynamic' + index
    )[0];
    this.correctList = this.el.nativeElement.getElementsByClassName(
      'dynamic' + (this.correctAnswer - 1)
    )[0];
    console.log(this.correctList);
    this.disabled = true;
    if (this.correctAnswer === index + 1) {
      this.timer.unsubscribe();
      this.score = this.score + 10;
      this.renderer.addClass(this.correctList, 'choicebuttoncorrect');
      setTimeout(() => {
        this.renderer.removeClass(this.correctList, 'choicebuttoncorrect');
        this.disabled = false;
        this.nextQuestion();
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
        this.nextQuestion();
      }, 1500);
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

  ngOnInit() {
    this.gameandthenquiz = Number (localStorage.getItem('gamethenquiz'));
    console.log('game and the quiz ' + this.gameandthenquiz);
    console.log('this is type of gatq' + typeof(this.gameandthenquiz));
    this.questionCounter = localStorage.getItem('questionCounter');
    console.log(localStorage.getItem('questionCounter'));
    if (this.questionCounter === null) {
      localStorage.setItem('questionCounter', '-1');
    }
    this.questionCounter = localStorage.getItem('questionCounter');
    this.userToken = localStorage.getItem('userToken');
    this.selectedCourseId = this.route.snapshot.params['id'];
    this.url = window.location.href;
    this.currentModule = this.url.substring(
      this.url.indexOf('=') + 1,
      this.url.length
    );
    this.data = this.userState.getAllData();
    this.quizQustions = this.data[this.currentModule].quiz;

    this.qustionLength = this.quizQustions.length;
    console.log(this.quizQustions);
    console.log(this.data);
    this.postForTempData = {
      courseID: localStorage.getItem('courseId'),
      token: localStorage.getItem('userToken')
    };
    this.serverservice.getTempGameScore(this.postForTempData).subscribe((response: any) => {
      this.tempGameScore = response[0].score;
      console.log('temp game score' + this.tempGameScore);
    });
    this.nextQuestion();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('Destroyed');
    localStorage.setItem('questionCounter', this.questionCounter);
  }

}
