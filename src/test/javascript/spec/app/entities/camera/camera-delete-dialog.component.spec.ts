import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OpenhackTestModule } from '../../../test.module';
import { CameraDeleteDialogComponent } from 'app/entities/camera/camera-delete-dialog.component';
import { CameraService } from 'app/entities/camera/camera.service';

describe('Component Tests', () => {
  describe('Camera Management Delete Component', () => {
    let comp: CameraDeleteDialogComponent;
    let fixture: ComponentFixture<CameraDeleteDialogComponent>;
    let service: CameraService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [CameraDeleteDialogComponent]
      })
        .overrideTemplate(CameraDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CameraDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CameraService);
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
