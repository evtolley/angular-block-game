import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { PlayerService } from './player.service';
import { AcceptedKeyBoardEvents } from '../common/accepted-keyboard-events';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor(private playerService: PlayerService){}
  
  componentIsActive = true;
  private leftMargin$ = new BehaviorSubject<string>('0px');

  @Input() 
  windowOffset: number;

  @Output() 
  shoot = new EventEmitter<number>();

  currentXPosition: number;

  ngOnInit(){
      fromEvent(document, 'mousemove').pipe(
        takeWhile(() => this.componentIsActive),
        map((event: MouseEvent) => {
          if(event.x >= this.playerService.calculatePlayerMinLeftMargin(this.windowOffset) 
            && event.x <= this.playerService.calculatePlayerMaxLeftMargin(this.windowOffset))  {
            this.currentXPosition = event.x;
            this.leftMargin$.next(`${this.playerService.calculatePlayerCurrentLeftMargin(this.windowOffset, event.x)}px`);
          }
        })
      ).subscribe();

      fromEvent(document, 'keydown').pipe(
        takeWhile(() => this.componentIsActive),
        map((event: KeyboardEvent) => {
          if(event.code === AcceptedKeyBoardEvents.Space) {
            this.shoot.emit(this.currentXPosition);
          }
        })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}