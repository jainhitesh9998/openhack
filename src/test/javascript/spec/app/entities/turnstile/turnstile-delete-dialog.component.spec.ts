import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OpenhackTestModule } from '../../../test.module';
import { TurnstileDeleteDialogComponent } from 'app/entities/turnstile/turnstile-delete-dialog.component';
import { TurnstileService } from 'app/entities/turnstile/turnstile.service';

describe('Component Tests', () => {
  describe('Turnstile Management Delete Component', () => {
    let comp: TurnstileDeleteDialogComponent;
    let fixture: ComponentFixture<TurnstileDeleteDialogComponent>;
    let service: TurnstileService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [TurnstileDeleteDialogComponent]
      })
        .overrideTemplate(TurnstileDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurnstileDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurnstileService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
