import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { AcceptedKeyBoardEvents } from '../common/accepted-keyboard-events';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {
  
  //private positionX = 0;
  componentIsActive = true;

  ngOnInit(){
      fromEvent(document, 'keydown').pipe(
        takeWhile(() => this.componentIsActive),
        map((event: KeyboardEvent) => {
          if(event.key === AcceptedKeyBoardEvents.RightArrow) {
            //TO DO: Respond to this
          } else if(event.key === AcceptedKeyBoardEvents.LeftArrow) {
            //TO DO: Respond to this
          }
        })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}