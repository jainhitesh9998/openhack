import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OpenhackSharedModule } from 'app/shared/shared.module';
import { ZoneComponent } from './zone.component';
import { ZoneDetailComponent } from './zone-detail.component';
import { ZoneUpdateComponent } from './zone-update.component';
import { ZoneDeletePopupComponent, ZoneDeleteDialogComponent } from './zone-delete-dialog.component';
import { zoneRoute, zonePopupRoute } from './zone.route';

const ENTITY_STATES = [...zoneRoute, ...zonePopupRoute];

@NgModule({
  imports: [OpenhackSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ZoneComponent, ZoneDetailComponent, ZoneUpdateComponent, ZoneDeleteDialogComponent, ZoneDeletePopupComponent],
  entryComponents: [ZoneComponent, ZoneUpdateComponent, ZoneDeleteDialogComponent, ZoneDeletePopupComponent]
})
export class OpenhackZoneModule {}
