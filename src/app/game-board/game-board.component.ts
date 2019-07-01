import { Component, ChangeDetectionStrategy, ElementRef,
  OnInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ViewChild, ComponentRef } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';
import { GameBoardService } from './game-board.service';
import { ProjectileComponent } from '../projectile/projectile.component';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit, OnDestroy {

  constructor(private el: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private gameBoardService: GameBoardService) {}

  componentIsActive = true;
  windowOffset$ = new BehaviorSubject<number>(0);

  // they player's container is the gameboard, so we can get it this way
  @ViewChild('player', { read: ViewContainerRef, static: true }) viewContainer: ViewContainerRef;

  private projectileFactory: ComponentFactory<ProjectileComponent>;

  ngOnInit() {
    //if the window is resized, we recalculate the window offset
    fromEvent(window, 'resize')
    .pipe(
      takeWhile(() => this.componentIsActive),
      map(event => {
        this.calculateWindowOffset();
      })
    )
    .subscribe();

    this.calculateWindowOffset();

    // set up the component factories
    this.projectileFactory = this.componentFactoryResolver.resolveComponentFactory(ProjectileComponent);
  }

  calculateWindowOffset() {
      const rect = this.el.nativeElement.getBoundingClientRect();
      this.windowOffset$.next(this.gameBoardService.calculateWindowOffset(rect.left));
  }

  respondToPlayerShot(playerXPosition: number) {
    const projectile: ComponentRef<ProjectileComponent> = this.viewContainer.createComponent(this.projectileFactory);
    projectile.instance.marginLeft$.next(`${playerXPosition}px`);

    // we listen for the missed targets event - if the player misses, we unsubscribe and destroy
    projectile.instance.missedTargets.subscribe(res => {
      projectile.instance.missedTargets.unsubscribe();
      projectile.destroy();
    });
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }
}
