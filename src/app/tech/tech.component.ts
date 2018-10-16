import { Component, OnInit } from '@angular/core';
import { TechListingModel, TechListingType } from 'app/tech/tech-listing.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { TechService } from 'app/tech/tech.service';
import { LayoutService } from 'app/layout.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'section[component="tech"][grid="rows"]',
    templateUrl: './tech.component.html'
})
export class TechComponent extends BaseComponent implements OnInit {
    techListings: TechListingModel[] = [];

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private techService: TechService,
                private layoutService: LayoutService) {
        super(sponsorsService, activatedRoute, router);
        this.layoutService.setLayoutMode('a4');
    }

    ngOnInit(): void {
        this.guid$.subscribe(
            guid => this.getTechListing(guid)
        );
    }

    getTechListing(guid: string): void {
        this.techService.getTechList(guid).pipe(first()).subscribe(
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
