import { ServerserviceService } from '../serverservice.service';


import {
  Component,
  OnInit,
  ElementRef,
  Renderer,
  Renderer2,
  HostListener
} from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mixinColor } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable()
export class HomeComponent implements OnInit {
  constructor(public el: ElementRef, public renderer: Renderer2, private serverservice: ServerserviceService, public router: Router) { }
  card_image;
  card_title;
  flag = 0;
  quiz = [];
  selectedIndex = 0;
  scrollflag = 0;
  card_description;
  cards = [];
  loader;
  overlaycard = [];
  categorywisefilters = [
    {
      catname: 'No Filter',
      icon: 'filter_none',
    },
    {
      catname: 'School/PU Students',
      icon: 'account_balance'
    },
    {
      catname: 'Engineering Students',
      icon: 'computer'
    },
    {
      catname: 'Management Students',
      icon: 'equalizer'
    },
    // {
    //   catname: 'Post Graduates',
    //   icon: 'school'
    // },
    {
      catname: 'Corporate',
      icon: 'business'
    }
  ];
  sectionwisefilters = [
    {
      menu: 'All',
      move: '#targetAllBottom',
      colorname: 'pills-o'
    },
    {
      menu: 'Quiz',
      move: '#targetQuizBottom',
      colorname: 'pills-r'
    },
    {
      menu: 'Competition',
      move: '#targetCompetitionBottom',
      colorname: 'pills-b'
    },
    {
      menu: 'Hackathon',
      move: '#targetHackathonBottom',
      colorname: 'pills-g'
    }
  ];
  filterwindow: any;
  userToken = localStorage.getItem('userToken');
  scrollTraget: String;
  content: any;
  conten: any;
  allbutn: any;
  currentBtn: any;
  scrollcontent: any;



  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const max = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    const pageoffsetsize = max - 1200;
    if (window.pageYOffset <= 300) {
      this.scrollcontent = this.el.nativeElement.getElementsByClassName('scroll-button-div')[0];
      this.renderer.addClass(this.scrollcontent, 'no-scroll-button');
    } else {
      this.renderer.removeClass(this.scrollcontent, 'no-scroll-button');
    }
    if (window.pageYOffset >= 400 && window.pageYOffset <= pageoffsetsize) {
      this.flag = 1;
      this.content = this.el.nativeElement.getElementsByClassName('filter-section')[0];
      this.renderer.addClass(this.content, 'fixed-side-filter');
    } else if (this.flag) {
      this.flag = 0;
      this.renderer.removeClass(this.content, 'fixed-side-filter');
    }
  }
  clickp(index) {
    this.conten = this.el.nativeElement.getElementsByClassName('pills-button')[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName('pills-button');
    for (let i = 0; i < this.allbutn.length; i++) {
      if (i !== index) {
        // this.renderer.removeClass(this.el.nativeElement.getElementsByClassName('pills-button')[i],'pills-active')
        // this.currentBtn = this.allbutn[i];
        // this.renderer.removeClass(this.currentBtn, 'pills-active');
        // this.renderer.addClass(this.currentBtn, 'pills');
        if (i % 4 === 0) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'pills-active-o');
          this.renderer.addClass(this.currentBtn, 'pills-o');
        } else if (i % 4 === 1) {
          this.currentBtn = this.allbutn[i];
          this.renderer.addClass(this.currentBtn, 'pills-r');
          this.renderer.removeClass(this.currentBtn, 'pills-active-r');
        } else if (i % 4 === 2) {
          this.currentBtn = this.allbutn[i];
          this.renderer.addClass(this.currentBtn, 'pills-b');
          this.renderer.removeClass(this.currentBtn, 'pills-active-b');
        } else if (i % 4 === 3) {
          this.currentBtn = this.allbutn[i];
          this.renderer.addClass(this.currentBtn, 'pills-g');
          this.renderer.removeClass(this.currentBtn, 'pills-active-g');
        }
      }
      if (i === index) {
        if (i % 4 === 0) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'pills-o');
          this.renderer.addClass(this.currentBtn, 'pills-active-o');
        } else if (i % 4 === 1) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'pills-r');
          this.renderer.addClass(this.currentBtn, 'pills-active-r');
        } else if (i % 4 === 2) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'pills-b');
          this.renderer.addClass(this.currentBtn, 'pills-active-b');
        } else if (i % 4 === 3) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'pills-g');
          this.renderer.addClass(this.currentBtn, 'pills-active-g');
        }
      }
    }
  }
  // tslint:disable-next-line:member-ordering
  clickf(index, name) {
    this.conten = this.el.nativeElement.getElementsByClassName(
      'filter-pills-button'
    )[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName(
      'filter-pills-button'
    );
    for (let i = 0; i < this.allbutn.length; i++) {
      if (i !== index) {
        // if (i % 4 == 0){
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
        // else if (i % 4 == 1){
        //   this.currentBtn = this.allbutn[i];
        //   this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        //   this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
        // else if (i % 4 == 2){
        //   this.currentBtn = this.allbutn[i];
        //   this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        //   this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
        // else if (i % 4 == 3){
        //   this.currentBtn = this.allbutn[i];
        //   this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        //   this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
      }
      if (i === index && i === 0) {
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'filter-pills');
        this.renderer.addClass(this.currentBtn, 'filter-pills-active-nf');
      } else if (i === index) {
        if (i % 4 === 0) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-g');
        } else if (i % 4 === 1) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills-r');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-o');
        } else if (i % 4 === 2) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills-b');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-r');
        } else if (i % 4 === 3) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills-g');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-b');
        }
      }
    }
    this.renderer.removeClass(this.conten, 'filter-pills');
    this.renderer.addClass(this.conten, 'filter-pills-active');
  }

  // tslint:disable-next-line:member-ordering
  select(index: number) {
    this.selectedIndex = index;
  }
  openfilter() {
    this.filterwindow = this.el.nativeElement.getElementsByClassName('filter-section-mobile')[0];
    this.renderer.removeClass(this.filterwindow, 'filter-section-mobile-close');
    this.renderer.addClass(this.filterwindow, 'filter-section-mobile-ani');
  }
  closefilter() {
    this.filterwindow = this.el.nativeElement.getElementsByClassName('filter-section-mobile')[0];
    this.renderer.addClass(this.filterwindow, 'filter-section-mobile-close');
    this.renderer.removeClass(this.filterwindow, 'filter-section-mobile-ani');
  }
  // clickm(index) {
  //   this.conten = this.el.nativeElement.getElementsByClassName('filter-pills-button-mobile')[index];
  //   this.allbutn = this.el.nativeElement.getElementsByClassName('filter-pills-button-mobile');
  //   for (let i = 0; i < this.allbutn.length; i++) {
  //     if (i !== index) {
  //       this.currentBtn = this.allbutn[i];
  //       this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
  //       this.renderer.addClass(this.currentBtn, 'filter-pills');
  //     }
  //   }
  //   this.renderer.removeClass(this.conten, 'filter-pills');
  //   this.renderer.addClass(this.conten, 'filter-pills-active');
  // }
  clickm(index) {
    this.conten = this.el.nativeElement.getElementsByClassName(
      'filter-pills-button-mobile'
    )[index];
    this.allbutn = this.el.nativeElement.getElementsByClassName(
      'filter-pills-button-mobile'
    );
    for (let i = 0; i < this.allbutn.length; i++) {
      if (i !== index) {
        // if (i % 4 == 0){
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
        // else if (i % 4 == 1){
        //   this.currentBtn = this.allbutn[i];
        //   this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        //   this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
        // else if (i % 4 == 2){
        //   this.currentBtn = this.allbutn[i];
        //   this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        //   this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
        // else if (i % 4 == 3){
        //   this.currentBtn = this.allbutn[i];
        //   this.renderer.removeClass(this.currentBtn, 'filter-pills-active');
        //   this.renderer.addClass(this.currentBtn, 'filter-pills');
        // }
      }
      if (i === index && i === 0) {
        this.currentBtn = this.allbutn[i];
        this.renderer.removeClass(this.currentBtn, 'filter-pills');
        this.renderer.addClass(this.currentBtn, 'filter-pills-active-nf');
      } else if (i === index) {
        if (i % 4 === 0) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-g');
        } else if (i % 4 === 1) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills-r');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-o');
        } else if (i % 4 === 2) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills-b');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-r');
        } else if (i % 4 === 3) {
          this.currentBtn = this.allbutn[i];
          this.renderer.removeClass(this.currentBtn, 'filter-pills-g');
          this.renderer.addClass(this.currentBtn, 'filter-pills-active-b');
        }
      }
    }
    this.renderer.removeClass(this.conten, 'filter-pills');
    this.renderer.addClass(this.conten, 'filter-pills-active');
  }
  ngOnInit() {
    this.scrollcontent = this.el.nativeElement.getElementsByClassName('scroll-button-div')[0];

    this.renderer.addClass(this.scrollcontent, 'no-scroll-button');
    this.loader = this.el.nativeElement.getElementsByClassName('outter-preloader')[0];
    this.serverservice.getcoursecarddetails().subscribe((response: any) => {
      for (const course of response) {
        this.cards.push(course);
      }
      for (let i = 0; i < this.cards.length; i++) {
        if (i % 4 === 0) {
          this.cards[i].overlaycard = 'overlaycard-orange';
          this.cards[i].color = 'title-class-orange';
        }
        if (i % 4 === 1) {
          this.cards[i].overlaycard = 'overlaycard-red';
          this.cards[i].color = 'title-class-red';
        }
        if (i % 4 === 2) {
          this.cards[i].overlaycard = 'overlaycard-blue';
          this.cards[i].color = 'title-class-blue';
        }
        if (i % 4 === 3) {
          this.cards[i].overlaycard = 'overlaycard-green';
          this.cards[i].color = 'title-class-green';
        }
        if (i % 4 === 0) {
          this.cards[i].overlaycardq = 'overlaycard-red';
          this.cards[i].colorq = 'title-class-red';
        }
        if (i % 4 === 1) {
          this.cards[i].overlaycardq = 'overlaycard-blue';
          this.cards[i].colorq = 'title-class-blue';
        }
        if (i % 4 === 2) {
          this.cards[i].overlaycardq = 'overlaycard-green';
          this.cards[i].colorq = 'title-class-green';
        }
        if (i % 4 === 3) {
          this.cards[i].overlaycardq = 'overlaycard-orange';
          this.cards[i].colorq = 'title-class-orange';
        }
        if (i % 4 === 0) {
          this.cards[i].overlaycardc = 'overlaycard-blue';
          this.cards[i].colorc = 'title-class-blue';
        }
        if (i % 4 === 1) {
          this.cards[i].overlaycardc = 'overlaycard-green';
          this.cards[i].colorc = 'title-class-green';
        }
        if (i % 4 === 2) {
          this.cards[i].overlaycardc = 'overlaycard-orange';
          this.cards[i].colorc = 'title-class-orange';
        }
        if (i % 4 === 3) {
          this.cards[i].overlaycardc = 'overlaycard-red';
          this.cards[i].colorc = 'title-class-red';
        }
        if (i % 4 === 0) {
          this.cards[i].overlaycardh = 'overlaycard-green';
          this.cards[i].colorh = 'title-class-green';
        }
        if (i % 4 === 1) {
          this.cards[i].overlaycardh = 'overlaycard-orange';
          this.cards[i].colorh = 'title-class-orange';
        }
        if (i % 4 === 2) {
          this.cards[i].overlaycardh = 'overlaycard-red';
          this.cards[i].colorh = 'title-class-red';
        }
        if (i % 4 === 3) {
          this.cards[i].overlaycardh = 'overlaycard-blue';
          this.cards[i].colorh = 'title-class-blue';
        }

      }
      setTimeout(() => {
        this.renderer.setStyle(this.loader, 'display', 'none');
      }, 1500);
    });
    this.serverservice.getQuizCards().subscribe((response: any) => {
      // console.log(response);
      let p = 1;
      for (let q of response) {
        this.quiz.push(q);
      }
      for (let i = 0; i < this.quiz.length; i++) {
        if (i % 4 === 0) {
          this.quiz[i].overlaycardq = 'overlaycard-red';
          this.quiz[i].colorq = 'title-class-red';
        }
        if (i % 4 === 1) {
          this.quiz[i].overlaycardq = 'overlaycard-blue';
          this.quiz[i].colorq = 'title-class-blue';
        }
        if (i % 4 === 2) {
          this.quiz[i].overlaycardq = 'overlaycard-green';
          this.quiz[i].colorq = 'title-class-green';
        }
        if (i % 4 === 3) {
          this.quiz[i].overlaycardq = 'overlaycard-orange';
          this.quiz[i].colorq = 'title-class-orange';
        }
      }
      setTimeout(() => {
        this.renderer.setStyle(this.loader, 'display', 'none');
      }, 1500);
    });

  }
  selectedCourse(courseID) {

    localStorage.setItem('courseId', courseID);
    this.router.navigate(['/detailpage', courseID]);
  }
  viewQuiz(id, name)  {
    this.serverservice.mainQuizId = id;
    this.serverservice.MainQuizName = name;
    console.log(this.serverservice.mainQuizId);
  }
}
