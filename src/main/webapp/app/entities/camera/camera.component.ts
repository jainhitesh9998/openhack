import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICamera } from 'app/shared/model/camera.model';
import { AccountService } from 'app/core/auth/account.service';
import { CameraService } from './camera.service';

@Component({
  selector: 'jhi-camera',
  templateUrl: './camera.component.html'
})
export class CameraComponent implements OnInit, OnDestroy {
  cameras: ICamera[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cameraService: CameraService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cameraService
      .query()
      .pipe(
        filter((res: HttpResponse<ICamera[]>) => res.ok),
        map((res: HttpResponse<ICamera[]>) => res.body)
      )
      .subscribe(
        (res: ICamera[]) => {
          this.cameras = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCameras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICamera) {
    return item.id;
  }

  registerChangeInCameras() {
    this.eventSubscriber = this.eventManager.subscribe('cameraListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
