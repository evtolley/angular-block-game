import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { GameConstants } from '../common/game-constants';

@Component({
  selector: 'projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectileComponent implements OnInit, OnDestroy {

  componentIsActive = true;
  marginLeft$ = new BehaviorSubject<string>('0px');
  private marginTop = GameConstants.GAMEBOARD_HEIGHT - GameConstants.PLAYER_HEIGHT;
  marginTop$ = new BehaviorSubject<string>(`${this.marginTop}px`);

  @Output() missedTargets = new EventEmitter();


  ngOnInit() {
      timer(0, 1).pipe(
          takeWhile(() => this.componentIsActive),
          map(() => {
              this.marginTop -= 15;
              // TO DO: Fix these magic numbers
              if (this.marginTop <= -25) {
                this.missedTargets.emit();
              } else {
                this.marginTop$.next(`${this.marginTop}px`);
              }
          })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}
