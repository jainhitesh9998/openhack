import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Camera } from 'app/shared/model/camera.model';
import { CameraService } from './camera.service';
import { CameraComponent } from './camera.component';
import { CameraDetailComponent } from './camera-detail.component';
import { CameraUpdateComponent } from './camera-update.component';
import { CameraDeletePopupComponent } from './camera-delete-dialog.component';
import { ICamera } from 'app/shared/model/camera.model';

@Injectable({ providedIn: 'root' })
export class CameraResolve implements Resolve<ICamera> {
  constructor(private service: CameraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICamera> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Camera>) => response.ok),
        map((camera: HttpResponse<Camera>) => camera.body)
      );
    }
    return of(new Camera());
  }
}

export const cameraRoute: Routes = [
  {
    path: '',
    component: CameraComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cameras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CameraDetailComponent,
    resolve: {
      camera: CameraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cameras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CameraUpdateComponent,
    resolve: {
      camera: CameraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cameras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CameraUpdateComponent,
    resolve: {
      camera: CameraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cameras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cameraPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CameraDeletePopupComponent,
    resolve: {
      camera: CameraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Cameras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
