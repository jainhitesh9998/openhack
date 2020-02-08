import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Zone } from 'app/shared/model/zone.model';
import { ZoneService } from './zone.service';
import { ZoneComponent } from './zone.component';
import { ZoneDetailComponent } from './zone-detail.component';
import { ZoneUpdateComponent } from './zone-update.component';
import { ZoneDeletePopupComponent } from './zone-delete-dialog.component';
import { IZone } from 'app/shared/model/zone.model';

@Injectable({ providedIn: 'root' })
export class ZoneResolve implements Resolve<IZone> {
  constructor(private service: ZoneService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IZone> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Zone>) => response.ok),
        map((zone: HttpResponse<Zone>) => zone.body)
      );
    }
    return of(new Zone());
  }
}

export const zoneRoute: Routes = [
  {
    path: '',
    component: ZoneComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Zones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ZoneDetailComponent,
    resolve: {
      zone: ZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Zones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ZoneUpdateComponent,
    resolve: {
      zone: ZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Zones'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ZoneUpdateComponent,
    resolve: {
      zone: ZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Zones'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const zonePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ZoneDeletePopupComponent,
    resolve: {
      zone: ZoneResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Zones'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
