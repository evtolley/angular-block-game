import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
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
  private leftMargin = '0px';
  private marginTop = GameConstants.GAMEBOARD_HEIGHT - GameConstants.PLAYER_HEIGHT;

  marginTop$ = new BehaviorSubject<string>(`${this.marginTop}px`);

  ngOnInit() {
      timer(0, 1).pipe(
          takeWhile(() => this.componentIsActive),
          map(() => {
              this.marginTop -= 7;
              this.marginTop$.next(`${this.marginTop}px`);
          })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}
