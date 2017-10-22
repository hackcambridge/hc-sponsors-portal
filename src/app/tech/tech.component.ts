import { Component } from '@angular/core';
import { TechListingModel, TechListingType } from 'app/tech/tech-listing.model';

@Component({
    selector: 'app-swag',
    templateUrl: './tech.component.html'
})
export class TechComponent {
    techListings: TechListingModel[] = [];

    addTechListing(): void {
        this.techListings.unshift(new TechListingModel());
    }

    deleteTechListing(index: number): void {
        if (this.techListings[index]) {
            this.techListings.splice(index, 1);
        }
    }
}
