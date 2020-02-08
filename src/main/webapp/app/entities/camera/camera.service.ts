import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICamera } from 'app/shared/model/camera.model';

type EntityResponseType = HttpResponse<ICamera>;
type EntityArrayResponseType = HttpResponse<ICamera[]>;

@Injectable({ providedIn: 'root' })
export class CameraService {
  public resourceUrl = SERVER_API_URL + 'api/cameras';

  constructor(protected http: HttpClient) {}

  create(camera: ICamera): Observable<EntityResponseType> {
    return this.http.post<ICamera>(this.resourceUrl, camera, { observe: 'response' });
  }

  update(camera: ICamera): Observable<EntityResponseType> {
    return this.http.put<ICamera>(this.resourceUrl, camera, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICamera>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICamera[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
