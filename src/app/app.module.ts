import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditinfoComponent } from './editinfo/editinfo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ServerserviceService } from './serverservice.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './footer/footer.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModuleintroComponent } from './moduleintro/moduleintro.component';
import { QuizComponent } from './quiz/quiz.component';
import { BubblegameComponent } from './bubblegame/bubblegame.component';
import {AuthService } from './interceptors/auth.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { Game3Component } from './game3/game3.component';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { GameComponentComponent } from './game-component/game-component.component';

import {enableProdMode} from '@angular/core';
import { CertificateComponent } from './certificate/certificate.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { IntroComponent } from './MainQuiz/intro/intro.component';
import { MainquizComponent } from './MainQuiz/mainquiz/mainquiz.component';
import { QuizscoreComponent } from './MainQuiz/quizscore/quizscore.component';
import { OurclientsComponent } from './ourclients/ourclients.component';
import { OurpartnersComponent } from './ourpartners/ourpartners.component';






export const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profilepage' , component: ProfilePageComponent},
  {path: 'edit' , component: EditinfoComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'detailpage/:courseID' , component: DetailpageComponent},
  {path: 'moduleintro' , component: ModuleintroComponent},
  {path: 'quiz' , component: QuizComponent},
  {path: 'bgame' , component: BubblegameComponent},
  {path: 'game3' , component: Game3Component},
  {path: 'score' , component: ScoreDisplayComponent},
  {path: 'game' , component: GameComponentComponent},
  {path: 'aboutus' , component: AboutusComponent},
  {path: 'ourteam' , component: OurteamComponent},
  {path: 'ourclients' , component: OurclientsComponent},
  {path: 'ourpartners' , component: OurpartnersComponent},
  {path: 'quizintro', component: IntroComponent},
  {path: 'mainquiz', component: MainquizComponent},
  {path: 'quizscore', component: QuizscoreComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfilePageComponent,
    EditinfoComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    DetailpageComponent,
    ModuleintroComponent,
    QuizComponent,
    BubblegameComponent,
    Game3Component,
    ScoreDisplayComponent,
    PreloaderComponent,
    GameComponentComponent,
    CertificateComponent,
    AboutusComponent,
    OurteamComponent,
    IntroComponent,
    MainquizComponent,
    QuizscoreComponent,
    OurclientsComponent,
    OurpartnersComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  providers: [
    ServerserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
