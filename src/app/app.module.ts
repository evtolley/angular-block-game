import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PlayerComponent } from './player/player.component';
import { PlayerService } from './player/player.service';
import { GameBoardService } from './game-board/game-board.service';
import { ProjectileComponent } from './projectile/projectile.component';
import { TargetComponent } from './target/target.component';
import { TargetService } from './target/target.service';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PlayerComponent,
    ProjectileComponent,
    TargetComponent
  ],
  entryComponents: [
    ProjectileComponent,
    TargetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PlayerService,
    GameBoardService,
    TargetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
