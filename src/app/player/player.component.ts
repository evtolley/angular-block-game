import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { PlayerService } from './player.service';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {

  constructor(private playerService: PlayerService){}
  
  private positionX$ = new BehaviorSubject<string>('0px');
  componentIsActive = true;

  @Input() 
  windowOffset: number;

  ngOnInit(){
      fromEvent(document, 'mousemove').pipe(
        takeWhile(() => this.componentIsActive),
        map((event: MouseEvent) => {
          if(event.x >= this.windowOffset && event.x <= 970 + this.windowOffset)  {
            this.positionX$.next(this.playerService.calculatePlayerPosition(this.windowOffset, event.x));
          }
        })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}