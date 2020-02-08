import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITurnstile } from 'app/shared/model/turnstile.model';
import { AccountService } from 'app/core/auth/account.service';
import { TurnstileService } from './turnstile.service';

@Component({
  selector: 'jhi-turnstile',
  templateUrl: './turnstile.component.html'
})
export class TurnstileComponent implements OnInit, OnDestroy {
  turnstiles: ITurnstile[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected turnstileService: TurnstileService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.turnstileService
      .query()
      .pipe(
        filter((res: HttpResponse<ITurnstile[]>) => res.ok),
        map((res: HttpResponse<ITurnstile[]>) => res.body)
      )
      .subscribe(
        (res: ITurnstile[]) => {
          this.turnstiles = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTurnstiles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITurnstile) {
    return item.id;
  }

  registerChangeInTurnstiles() {
    this.eventSubscriber = this.eventManager.subscribe('turnstileListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
