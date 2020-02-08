import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICamera } from 'app/shared/model/camera.model';
import { CameraService } from './camera.service';

@Component({
  selector: 'jhi-camera-delete-dialog',
  templateUrl: './camera-delete-dialog.component.html'
})
export class CameraDeleteDialogComponent {
  camera: ICamera;

  constructor(protected cameraService: CameraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cameraService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cameraListModification',
        content: 'Deleted an camera'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-camera-delete-popup',
  template: ''
})
export class CameraDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ camera }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CameraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.camera = camera;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/camera', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/camera', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
