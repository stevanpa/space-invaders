import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameBoardSpaceInvadersComponent } from './components/game-board-space-invaders/game-board-space-invaders.component';

@NgModule({
    declarations: [
        AppComponent,
        GameBoardComponent,
        GameBoardSpaceInvadersComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
