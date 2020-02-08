import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenhackSharedModule } from 'app/shared/shared.module';
import { TurnstileComponent } from './turnstile.component';
import { TurnstileDetailComponent } from './turnstile-detail.component';
import { TurnstileUpdateComponent } from './turnstile-update.component';
import { TurnstileDeletePopupComponent, TurnstileDeleteDialogComponent } from './turnstile-delete-dialog.component';
import { turnstileRoute, turnstilePopupRoute } from './turnstile.route';

const ENTITY_STATES = [...turnstileRoute, ...turnstilePopupRoute];

@NgModule({
  imports: [OpenhackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TurnstileComponent,
    TurnstileDetailComponent,
    TurnstileUpdateComponent,
    TurnstileDeleteDialogComponent,
    TurnstileDeletePopupComponent
  ],
  entryComponents: [TurnstileComponent, TurnstileUpdateComponent, TurnstileDeleteDialogComponent, TurnstileDeletePopupComponent]
})
export class OpenhackTurnstileModule {}
