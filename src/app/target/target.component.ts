import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { timer, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

@Component({
    selector: 'target',
    templateUrl: './target.component.html',
    styleUrls: ['./target.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TargetComponent implements OnInit, OnDestroy {

    componentIsActive = true;
    speed: number;
    leftMargin = 0;
    leftMargin$ = new BehaviorSubject<string>('0px');

    ngOnInit() {
        // TO DO: Remove hard coded speed
        this.speed = 14;

        timer(0, this.speed).pipe(
            // TO DO: Make it change direction when it hits the sides
            takeWhile(() => this.componentIsActive),
            map(() => {
                this.leftMargin++;
                this.leftMargin$.next(`${this.leftMargin}px`);
            })
        ).subscribe();
    }

    ngOnDestroy() {
        this.componentIsActive = false;
    }
  }