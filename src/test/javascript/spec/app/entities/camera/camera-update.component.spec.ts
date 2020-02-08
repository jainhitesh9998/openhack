import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OpenhackTestModule } from '../../../test.module';
import { CameraUpdateComponent } from 'app/entities/camera/camera-update.component';
import { CameraService } from 'app/entities/camera/camera.service';
import { Camera } from 'app/shared/model/camera.model';

describe('Component Tests', () => {
  describe('Camera Management Update Component', () => {
    let comp: CameraUpdateComponent;
    let fixture: ComponentFixture<CameraUpdateComponent>;
    let service: CameraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [CameraUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CameraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CameraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CameraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Camera(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Camera();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
