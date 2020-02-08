import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenhackSharedModule } from 'app/shared/shared.module';
import { CameraComponent } from './camera.component';
import { CameraDetailComponent } from './camera-detail.component';
import { CameraUpdateComponent } from './camera-update.component';
import { CameraDeletePopupComponent, CameraDeleteDialogComponent } from './camera-delete-dialog.component';
import { cameraRoute, cameraPopupRoute } from './camera.route';

const ENTITY_STATES = [...cameraRoute, ...cameraPopupRoute];

@NgModule({
  imports: [OpenhackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CameraComponent, CameraDetailComponent, CameraUpdateComponent, CameraDeleteDialogComponent, CameraDeletePopupComponent],
  entryComponents: [CameraComponent, CameraUpdateComponent, CameraDeleteDialogComponent, CameraDeletePopupComponent]
})
export class OpenhackCameraModule {}
