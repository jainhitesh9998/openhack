import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IZone } from 'app/shared/model/zone.model';
import { AccountService } from 'app/core/auth/account.service';
import { ZoneService } from './zone.service';

@Component({
  selector: 'jhi-zone',
  templateUrl: './zone.component.html'
})
export class ZoneComponent implements OnInit, OnDestroy {
  zones: IZone[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected zoneService: ZoneService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.zoneService
      .query()
      .pipe(
        filter((res: HttpResponse<IZone[]>) => res.ok),
        map((res: HttpResponse<IZone[]>) => res.body)
      )
      .subscribe(
        (res: IZone[]) => {
          this.zones = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInZones();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IZone) {
    return item.id;
  }

  registerChangeInZones() {
    this.eventSubscriber = this.eventManager.subscribe('zoneListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
