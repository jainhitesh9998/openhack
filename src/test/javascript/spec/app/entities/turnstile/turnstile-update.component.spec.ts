import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OpenhackTestModule } from '../../../test.module';
import { TurnstileUpdateComponent } from 'app/entities/turnstile/turnstile-update.component';
import { TurnstileService } from 'app/entities/turnstile/turnstile.service';
import { Turnstile } from 'app/shared/model/turnstile.model';

describe('Component Tests', () => {
  describe('Turnstile Management Update Component', () => {
    let comp: TurnstileUpdateComponent;
    let fixture: ComponentFixture<TurnstileUpdateComponent>;
    let service: TurnstileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [TurnstileUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TurnstileUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TurnstileUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurnstileService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Turnstile(123);
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
        const entity = new Turnstile();
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
