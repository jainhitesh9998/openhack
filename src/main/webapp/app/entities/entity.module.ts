import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'turnstile',
        loadChildren: () => import('./turnstile/turnstile.module').then(m => m.OpenhackTurnstileModule)
      },
      {
        path: 'camera',
        loadChildren: () => import('./camera/camera.module').then(m => m.OpenhackCameraModule)
      },
      {
        path: 'zone',
        loadChildren: () => import('./zone/zone.module').then(m => m.OpenhackZoneModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class OpenhackEntityModule {}
