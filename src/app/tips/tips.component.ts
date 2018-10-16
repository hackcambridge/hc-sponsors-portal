import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'app/layout.service';

@Component({
    selector: 'section[component="tips"][grid="rows"]',
    templateUrl: './tips.component.html'
})
export class TipsComponent extends BaseComponent {

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private layoutService: LayoutService) {
        super(sponsorsService, activatedRoute, router);
        this.layoutService.setLayoutMode('a4');
    }
}
