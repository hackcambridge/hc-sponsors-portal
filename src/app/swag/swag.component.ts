import { Component } from '@angular/core';
import { SwagModel } from 'app/swag/swag.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';

@Component({
    selector: 'app-swag',
    templateUrl: './swag.component.html'
})
export class SwagComponent extends BaseComponent {
    swagList: SwagModel[] = [];

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(sponsorsService, activatedRoute, router);
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
