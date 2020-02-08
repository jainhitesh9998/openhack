import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITurnstile, Turnstile } from 'app/shared/model/turnstile.model';
import { TurnstileService } from './turnstile.service';
import { IZone } from 'app/shared/model/zone.model';
import { ZoneService } from 'app/entities/zone/zone.service';
import { ICamera } from 'app/shared/model/camera.model';
import { CameraService } from 'app/entities/camera/camera.service';

@Component({
  selector: 'jhi-turnstile-update',
  templateUrl: './turnstile-update.component.html'
})
export class TurnstileUpdateComponent implements OnInit {
  isSaving: boolean;

  zoneins: IZone[];

  zoneouts: IZone[];

  camerains: ICamera[];

  cameraouts: ICamera[];

  editForm = this.fb.group({
    id: [],
    identifier: [null, [Validators.required]],
    turnstileId: [null, [Validators.required]],
    androidThingsInId: [null, [Validators.required]],
    androidThingsOutId: [null, [Validators.required]],
    created: [null, [Validators.required]],
    zoneIn: [],
    zoneOut: [],
    cameraIn: [],
    cameraOut: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected turnstileService: TurnstileService,
    protected zoneService: ZoneService,
    protected cameraService: CameraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ turnstile }) => {
      this.updateForm(turnstile);
    });
    this.zoneService
      .query({ filter: 'turnstile-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IZone[]>) => mayBeOk.ok),
        map((response: HttpResponse<IZone[]>) => response.body)
      )
      .subscribe(
        (res: IZone[]) => {
          if (!this.editForm.get('zoneIn').value || !this.editForm.get('zoneIn').value.id) {
            this.zoneins = res;
          } else {
            this.zoneService
              .find(this.editForm.get('zoneIn').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IZone>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IZone>) => subResponse.body)
              )
              .subscribe(
                (subRes: IZone) => (this.zoneins = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.zoneService
      .query({ filter: 'turnstile-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IZone[]>) => mayBeOk.ok),
        map((response: HttpResponse<IZone[]>) => response.body)
      )
      .subscribe(
        (res: IZone[]) => {
          if (!this.editForm.get('zoneOut').value || !this.editForm.get('zoneOut').value.id) {
            this.zoneouts = res;
          } else {
            this.zoneService
              .find(this.editForm.get('zoneOut').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IZone>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IZone>) => subResponse.body)
              )
              .subscribe(
                (subRes: IZone) => (this.zoneouts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.cameraService
      .query({ filter: 'turnstile-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICamera[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICamera[]>) => response.body)
      )
      .subscribe(
        (res: ICamera[]) => {
          if (!this.editForm.get('cameraIn').value || !this.editForm.get('cameraIn').value.id) {
            this.camerains = res;
          } else {
            this.cameraService
              .find(this.editForm.get('cameraIn').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICamera>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICamera>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICamera) => (this.camerains = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.cameraService
      .query({ filter: 'turnstile-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICamera[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICamera[]>) => response.body)
      )
      .subscribe(
        (res: ICamera[]) => {
          if (!this.editForm.get('cameraOut').value || !this.editForm.get('cameraOut').value.id) {
            this.cameraouts = res;
          } else {
            this.cameraService
              .find(this.editForm.get('cameraOut').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICamera>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICamera>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICamera) => (this.cameraouts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(turnstile: ITurnstile) {
    this.editForm.patchValue({
      id: turnstile.id,
      identifier: turnstile.identifier,
      turnstileId: turnstile.turnstileId,
      androidThingsInId: turnstile.androidThingsInId,
      androidThingsOutId: turnstile.androidThingsOutId,
      created: turnstile.created != null ? turnstile.created.format(DATE_TIME_FORMAT) : null,
      zoneIn: turnstile.zoneIn,
      zoneOut: turnstile.zoneOut,
      cameraIn: turnstile.cameraIn,
      cameraOut: turnstile.cameraOut
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const turnstile = this.createFromForm();
    if (turnstile.id !== undefined) {
      this.subscribeToSaveResponse(this.turnstileService.update(turnstile));
    } else {
      this.subscribeToSaveResponse(this.turnstileService.create(turnstile));
    }
  }

  private createFromForm(): ITurnstile {
    return {
      ...new Turnstile(),
      id: this.editForm.get(['id']).value,
      identifier: this.editForm.get(['identifier']).value,
      turnstileId: this.editForm.get(['turnstileId']).value,
      androidThingsInId: this.editForm.get(['androidThingsInId']).value,
      androidThingsOutId: this.editForm.get(['androidThingsOutId']).value,
      created: this.editForm.get(['created']).value != null ? moment(this.editForm.get(['created']).value, DATE_TIME_FORMAT) : undefined,
      zoneIn: this.editForm.get(['zoneIn']).value,
      zoneOut: this.editForm.get(['zoneOut']).value,
      cameraIn: this.editForm.get(['cameraIn']).value,
      cameraOut: this.editForm.get(['cameraOut']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITurnstile>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackZoneById(index: number, item: IZone) {
    return item.id;
  }

  trackCameraById(index: number, item: ICamera) {
    return item.id;
  }
}
