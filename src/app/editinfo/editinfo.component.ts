import { FormControl, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ServerserviceService } from '../serverservice.service';
import { userInfo } from 'os';


@Component({
  selector: 'app-editinfo',
  templateUrl: './editinfo.component.html',
  styleUrls: ['./editinfo.component.css']
})
export class EditinfoComponent implements OnInit {
  minDate = { year: 1990, month: 1, day: 1 };
  maxDate = { year: 2010, month: 12, day: 31 };
  userToken = localStorage.getItem('userToken');
  editResponse ;
  editInfo;
    phone = '';
    fname = '';
    lname = '';
    course = '';
    email = '';
    state = '';
    city = '';
    college = '';
    sem = '';
    dob = '';
    dateob = [];
    token = '';
    model: any;
  constructor(private router: Router, public serverservice: ServerserviceService, public el: ElementRef, public renderer: Renderer2) { }

  ngOnInit() {
    if (this.userToken === null) {
      // this.router.navigateByUrl('/login');
    } else {
      this.serverservice.getEditData().subscribe((response: any) => {
        console.log(response[0]);
        this.model = { year: 2000, month: 12, day: 10};
        this.fname = response[0].fname;
        this.lname = response[0].lname;
        this.email = response[0].email;
        this.state = response[0].state;
        this.city = response[0].city;
        this.college = response[0].college;
        this.sem = response[0].sem;
        this.dob = response[0].dob;
        this.dateob = (this.dob).split('-');
        this.model.year = Number(this.dateob[2]);
        this.model.month = Number(this.dateob[1]);
        this.model.day = Number(this.dateob[0]);
       console.log(this.dateob);
       this.course = response[0].course;
       this.phone = response[0].phone;
       this.token =  localStorage.getItem('userToken');
      });
    }
  }
  Data(form: NgForm) {
    console.log(form.value);
    const messageContianer = this.el.nativeElement.getElementsByClassName('mymessage')[0];
    this.renderer.addClass(messageContianer, 'message-open');
    this.renderer.removeClass(messageContianer, 'message-close');
    if (!navigator.onLine) {
      this.editResponse = 'Seems Your Network Connection is Down! Please try again';
      setTimeout(() => {
        this.renderer.removeClass(messageContianer, 'message-open');
        this.renderer.addClass(messageContianer, 'message-close');
        console.log('inside the down');
      }, 2000);
    } else {
      this.serverservice.putEditData(form.value).subscribe((response) => {
        console.log(response[0].message);
        this.editResponse = response[0].message;
        setTimeout(() => {
          this.renderer.removeClass(messageContianer, 'message-open');
        this.renderer.addClass(messageContianer, 'message-close');
        }, 2000);
        // console.log(messageContianer);
      });
    }
  }
}
