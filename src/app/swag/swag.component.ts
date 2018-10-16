import { Component } from '@angular/core';
import { SwagModel } from 'app/swag/swag.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { LayoutService } from 'app/layout.service';

@Component({
    selector: 'section[component="swag"][grid="rows"]',
    templateUrl: './swag.component.html'
})
export class SwagComponent extends BaseComponent {
    swagList: SwagModel[] = [];

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private layoutService: LayoutService) {
        super(sponsorsService, activatedRoute, router);
        this.layoutService.setLayoutMode('a4');
    }

    addSwag(): void {
        this.swagList.unshift(new SwagModel());
    }

    deleteSwag(index: number): void {
        if (this.swagList[index]) {
            this.swagList.splice(index, 1);
        }
    }
}
