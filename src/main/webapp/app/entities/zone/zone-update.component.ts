import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IZone, Zone } from 'app/shared/model/zone.model';
import { ZoneService } from './zone.service';
import { ICamera } from 'app/shared/model/camera.model';
import { CameraService } from 'app/entities/camera/camera.service';

@Component({
  selector: 'jhi-zone-update',
  templateUrl: './zone-update.component.html'
})
export class ZoneUpdateComponent implements OnInit {
  isSaving: boolean;

  cameras: ICamera[];

  editForm = this.fb.group({
    id: [],
    identifier: [null, [Validators.required]],
    x1: [null, [Validators.required]],
    y1: [null, [Validators.required]],
    x2: [null, [Validators.required]],
    y2: [null, [Validators.required]],
    camera: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected zoneService: ZoneService,
    protected cameraService: CameraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ zone }) => {
      this.updateForm(zone);
    });
    this.cameraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICamera[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICamera[]>) => response.body)
      )
      .subscribe((res: ICamera[]) => (this.cameras = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(zone: IZone) {
    this.editForm.patchValue({
      id: zone.id,
      identifier: zone.identifier,
      x1: zone.x1,
      y1: zone.y1,
      x2: zone.x2,
      y2: zone.y2,
      camera: zone.camera
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const zone = this.createFromForm();
    if (zone.id !== undefined) {
      this.subscribeToSaveResponse(this.zoneService.update(zone));
    } else {
      this.subscribeToSaveResponse(this.zoneService.create(zone));
    }
  }

  private createFromForm(): IZone {
    return {
      ...new Zone(),
      id: this.editForm.get(['id']).value,
      identifier: this.editForm.get(['identifier']).value,
      x1: this.editForm.get(['x1']).value,
      y1: this.editForm.get(['y1']).value,
      x2: this.editForm.get(['x2']).value,
      y2: this.editForm.get(['y2']).value,
      camera: this.editForm.get(['camera']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZone>>) {
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

  trackCameraById(index: number, item: ICamera) {
    return item.id;
  }
}
