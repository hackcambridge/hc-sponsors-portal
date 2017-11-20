import { Component } from '@angular/core';
import { SwagModel } from 'app/swag/swag.model';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-swag',
    templateUrl: './swag.component.html'
})
export class SwagComponent extends BaseComponent {
    swagList: SwagModel[] = [];

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute) {
        super(sponsorsService, activatedRoute);
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
