import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenhackTestModule } from '../../../test.module';
import { CameraComponent } from 'app/entities/camera/camera.component';
import { CameraService } from 'app/entities/camera/camera.service';
import { Camera } from 'app/shared/model/camera.model';

describe('Component Tests', () => {
  describe('Camera Management Component', () => {
    let comp: CameraComponent;
    let fixture: ComponentFixture<CameraComponent>;
    let service: CameraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OpenhackTestModule],
        declarations: [CameraComponent],
        providers: []
      })
        .overrideTemplate(CameraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CameraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CameraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Camera(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cameras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
