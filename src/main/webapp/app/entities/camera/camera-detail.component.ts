import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICamera } from 'app/shared/model/camera.model';

@Component({
  selector: 'jhi-camera-detail',
  templateUrl: './camera-detail.component.html'
})
export class CameraDetailComponent implements OnInit {
  camera: ICamera;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ camera }) => {
      this.camera = camera;
    });
  }

  previousState() {
    window.history.back();
  }
}
