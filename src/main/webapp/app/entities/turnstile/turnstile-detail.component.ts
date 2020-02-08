import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITurnstile } from 'app/shared/model/turnstile.model';

@Component({
  selector: 'jhi-turnstile-detail',
  templateUrl: './turnstile-detail.component.html'
})
export class TurnstileDetailComponent implements OnInit {
  turnstile: ITurnstile;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ turnstile }) => {
      this.turnstile = turnstile;
    });
  }

  previousState() {
    window.history.back();
  }
}
