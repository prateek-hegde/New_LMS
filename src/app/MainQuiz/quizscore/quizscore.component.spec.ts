import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizscoreComponent } from './quizscore.component';

describe('QuizscoreComponent', () => {
  let component: QuizscoreComponent;
  let fixture: ComponentFixture<QuizscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
