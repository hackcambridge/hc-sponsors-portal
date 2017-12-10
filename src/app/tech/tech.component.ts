import { Component, OnInit } from '@angular/core';
import { TechListingModel, TechListingType } from 'app/tech/tech-listing.model';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { TechService } from 'app/tech/tech.service';

@Component({
    selector: 'app-swag',
    templateUrl: './tech.component.html'
})
export class TechComponent extends BaseComponent implements OnInit {
    techListings: TechListingModel[] = [];

    constructor(private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute,
                private techService: TechService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.guid$.subscribe(
            guid => this.getTechListing(guid)
        );
    }

    getTechListing(guid: string): void {
        this.techService.getTechList(guid).first().subscribe(
            listing => this.techListings = (listing ? listing : [])
        );
    }

    addTechListing(): void {
        this.techListings.unshift(new TechListingModel());
        this.saveTechListing();
    }

    deleteTechListing(index: number): void {
        if (this.techListings[index]) {
            this.techListings.splice(index, 1);
            this.saveTechListing();
        }
    }

    saveTechListing(): void {
        this.guid$.subscribe(
            guid => this.saveTechListingForGuid(guid)
        );
    }

    saveTechListingForGuid(guid: string): void {
        this.techService.setTechList(guid, this.techListings).catch(
            (error: Error) => alert(`Error saving data: ${error.message}`)
        );
    }
}
