import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ElementRef } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { PlayerService } from './player.service';
import { GameConstants } from '../common/game-constants';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor(private playerService: PlayerService){}
  
  private positionX$ = new BehaviorSubject<string>('0px');
  componentIsActive = true;

  @Input() 
  windowOffset: number;

  currentXPosition: number;

  ngOnInit(){
      fromEvent(document, 'mousemove').pipe(
        takeWhile(() => this.componentIsActive),
        map((event: MouseEvent) => {
          if(event.x >= this.playerService.calculatePlayerMinLeftMargin(this.windowOffset) 
            && event.x <= this.playerService.calculatePlayerMaxLeftMargin(this.windowOffset))  {
            this.currentXPosition = event.x;
            this.positionX$.next(`${this.playerService.calculatePlayerCurrentLeftMargin(this.windowOffset, event.x)}px`);
          }
        })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}