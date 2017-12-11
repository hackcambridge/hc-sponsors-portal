import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html'
})
export class TipsComponent extends BaseComponent {

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(sponsorsService, activatedRoute, router);
    }
}
