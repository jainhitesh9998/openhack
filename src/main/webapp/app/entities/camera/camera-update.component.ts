import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICamera, Camera } from 'app/shared/model/camera.model';
import { CameraService } from './camera.service';

@Component({
  selector: 'jhi-camera-update',
  templateUrl: './camera-update.component.html'
})
export class CameraUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    identifier: [null, [Validators.required]],
    location: [null, [Validators.required]]
  });

  constructor(protected cameraService: CameraService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ camera }) => {
      this.updateForm(camera);
    });
  }

  updateForm(camera: ICamera) {
    this.editForm.patchValue({
      id: camera.id,
      identifier: camera.identifier,
      location: camera.location
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const camera = this.createFromForm();
    if (camera.id !== undefined) {
      this.subscribeToSaveResponse(this.cameraService.update(camera));
    } else {
      this.subscribeToSaveResponse(this.cameraService.create(camera));
    }
  }

  private createFromForm(): ICamera {
    return {
      ...new Camera(),
      id: this.editForm.get(['id']).value,
      identifier: this.editForm.get(['identifier']).value,
      location: this.editForm.get(['location']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICamera>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
