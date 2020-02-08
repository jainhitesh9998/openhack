import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenhackTestModule } from '../../../test.module';
import { TurnstileComponent } from 'app/entities/turnstile/turnstile.component';
import { TurnstileService } from 'app/entities/turnstile/turnstile.service';
import { Turnstile } from 'app/shared/model/turnstile.model';

describe('Component Tests', () => {
  describe('Turnstile Management Component', () => {
    let comp: TurnstileComponent;
    let fixture: ComponentFixture<TurnstileComponent>;
    let service: TurnstileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [TurnstileComponent],
        providers: []
      })
        .overrideTemplate(TurnstileComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TurnstileComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TurnstileService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Turnstile(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.turnstiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
