import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'app/benefits/benefits.service';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mentors',
    templateUrl: './workshops.component.html'
})
export class WorkshopComponent extends BaseComponent implements OnInit {
    hasWorkshopSlot: boolean;
    hasProductDemoSlot: boolean;

    productDemoTitle: string;
    productDemoDescription: string;
    productDemoSpeaker: string;

    workshopTitle: string;
    workshopDescription: string;
    workshopSpeaker: string;

    doingWorkshop: boolean;
    doingProductDemo: boolean;

    constructor(private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute,
                private benefitsService: BenefitsService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.hasProductDemoSlot = this.benefitsService.hasProductDemoSlot();
        this.hasWorkshopSlot = this.benefitsService.hasWorkshopSlot();
    }
}
