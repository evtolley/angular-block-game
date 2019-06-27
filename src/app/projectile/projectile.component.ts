import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { AcceptedKeyBoardEvents } from '../common/accepted-keyboard-events';

@Component({
  selector: 'projectile',
  templateUrl: './projectile.component.html',
  styleUrls: ['./projectile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectileComponent implements OnInit, OnDestroy {

  componentIsActive = true;
  private leftMargin$ = new BehaviorSubject<string>('0px');

  currentXPosition: number;

  ngOnInit() {
      fromEvent(document, 'keydown').pipe(
        takeWhile(() => this.componentIsActive),
        map((event: KeyboardEvent) => {

        })
      ).subscribe();
  }

  ngOnDestroy() {
      this.componentIsActive = false;
  }
}
