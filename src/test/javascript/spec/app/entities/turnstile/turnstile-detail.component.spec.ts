import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OpenhackTestModule } from '../../../test.module';
import { TurnstileDetailComponent } from 'app/entities/turnstile/turnstile-detail.component';
import { Turnstile } from 'app/shared/model/turnstile.model';

describe('Component Tests', () => {
  describe('Turnstile Management Detail Component', () => {
    let comp: TurnstileDetailComponent;
    let fixture: ComponentFixture<TurnstileDetailComponent>;
    const route = ({ data: of({ turnstile: new Turnstile(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [TurnstileDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TurnstileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurnstileDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.turnstile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
