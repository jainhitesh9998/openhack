import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Turnstile } from 'app/shared/model/turnstile.model';
import { TurnstileService } from './turnstile.service';
import { TurnstileComponent } from './turnstile.component';
import { TurnstileDetailComponent } from './turnstile-detail.component';
import { TurnstileUpdateComponent } from './turnstile-update.component';
import { TurnstileDeletePopupComponent } from './turnstile-delete-dialog.component';
import { ITurnstile } from 'app/shared/model/turnstile.model';

@Injectable({ providedIn: 'root' })
export class TurnstileResolve implements Resolve<ITurnstile> {
  constructor(private service: TurnstileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITurnstile> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Turnstile>) => response.ok),
        map((turnstile: HttpResponse<Turnstile>) => turnstile.body)
      );
    }
    return of(new Turnstile());
  }
}

export const turnstileRoute: Routes = [
  {
    path: '',
    component: TurnstileComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Turnstiles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TurnstileDetailComponent,
    resolve: {
      turnstile: TurnstileResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Turnstiles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TurnstileUpdateComponent,
    resolve: {
      turnstile: TurnstileResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Turnstiles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TurnstileUpdateComponent,
    resolve: {
      turnstile: TurnstileResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Turnstiles'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const turnstilePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TurnstileDeletePopupComponent,
    resolve: {
      turnstile: TurnstileResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Turnstiles'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
