import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITurnstile } from 'app/shared/model/turnstile.model';

type EntityResponseType = HttpResponse<ITurnstile>;
type EntityArrayResponseType = HttpResponse<ITurnstile[]>;

@Injectable({ providedIn: 'root' })
export class TurnstileService {
  public resourceUrl = SERVER_API_URL + 'api/turnstiles';

  constructor(protected http: HttpClient) {}

  create(turnstile: ITurnstile): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turnstile);
    return this.http
      .post<ITurnstile>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turnstile: ITurnstile): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turnstile);
    return this.http
      .put<ITurnstile>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurnstile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurnstile[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(turnstile: ITurnstile): ITurnstile {
    const copy: ITurnstile = Object.assign({}, turnstile, {
      created: turnstile.created != null && turnstile.created.isValid() ? turnstile.created.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created != null ? moment(res.body.created) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((turnstile: ITurnstile) => {
        turnstile.created = turnstile.created != null ? moment(turnstile.created) : null;
      });
    }
    return res;
  }
}
