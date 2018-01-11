import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html'
})
export class SchedulesComponent extends BaseComponent {

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(sponsorsService, activatedRoute, router);
    }
}
