import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardSpaceInvadersComponent } from './game-board-space-invaders.component';

describe('GameBoardSpaceInvadersComponent', () => {
  let component: GameBoardSpaceInvadersComponent;
  let fixture: ComponentFixture<GameBoardSpaceInvadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardSpaceInvadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardSpaceInvadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
