import { Component, ChangeDetectionStrategy, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { from, fromEvent, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { GameBoardService } from './game-board.service';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit, OnDestroy {
  constructor(private el: ElementRef, private gameBoardService: GameBoardService){}

  componentIsActive = true
  windowOffset$ = new BehaviorSubject<number>(0);

  ngOnInit() {
    fromEvent(window, 'resize')
    .pipe(
      takeWhile(() => this.componentIsActive),
      map(event => { 
        this.calculateWindowOffset();
      })
    )
    .subscribe();

    this.calculateWindowOffset();
  }

  calculateWindowOffset() {
      const rect = this.el.nativeElement.getBoundingClientRect();
      this.windowOffset$.next(this.gameBoardService.calculateWindowOffset(rect.left)) 
  }

  respondToPlayerShot(playerXPosition: number) {
    //TO DO: Respond to this
    console.log(playerXPosition);
  }

  ngOnDestroy(){
    this.componentIsActive = false;
  }
}