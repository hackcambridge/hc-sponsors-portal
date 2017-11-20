import { Component } from '@angular/core';
import { TechListingModel, TechListingType } from 'app/tech/tech-listing.model';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-swag',
    templateUrl: './tech.component.html'
})
export class TechComponent extends BaseComponent {
    techListings: TechListingModel[] = [];

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute) {
        super(sponsorsService, activatedRoute);
    }

    addTechListing(): void {
        this.techListings.unshift(new TechListingModel());
    }

    deleteTechListing(index: number): void {
        if (this.techListings[index]) {
            this.techListings.splice(index, 1);
        }
    }
}
