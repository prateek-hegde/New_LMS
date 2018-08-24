import { Component, OnInit } from '@angular/core';
import { ServerserviceService } from '../../serverservice.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {
  quiz = {};
  constructor(private serverservice: ServerserviceService) { }

  ngOnInit() {
    this.serverservice.getquizcarddetails().subscribe((response: any) => {
      for (const quiz of response) {
        if (this.serverservice.mainQuizId === quiz._id) {
          this.quiz = (quiz);
          console.log(this.quiz);
        }
      }
    });
  }

}
