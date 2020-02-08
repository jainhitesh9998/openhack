import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITurnstile } from 'app/shared/model/turnstile.model';
import { TurnstileService } from './turnstile.service';

@Component({
  selector: 'jhi-turnstile-delete-dialog',
  templateUrl: './turnstile-delete-dialog.component.html'
})
export class TurnstileDeleteDialogComponent {
  turnstile: ITurnstile;

  constructor(protected turnstileService: TurnstileService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.turnstileService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'turnstileListModification',
        content: 'Deleted an turnstile'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-turnstile-delete-popup',
  template: ''
})
export class TurnstileDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ turnstile }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TurnstileDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.turnstile = turnstile;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/turnstile', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/turnstile', { outlets: { popup: null } }]);
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
