import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OpenhackTestModule } from '../../../test.module';
import { CameraDetailComponent } from 'app/entities/camera/camera-detail.component';
import { Camera } from 'app/shared/model/camera.model';

describe('Component Tests', () => {
  describe('Camera Management Detail Component', () => {
    let comp: CameraDetailComponent;
    let fixture: ComponentFixture<CameraDetailComponent>;
    const route = ({ data: of({ camera: new Camera(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [CameraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CameraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CameraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.camera).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
