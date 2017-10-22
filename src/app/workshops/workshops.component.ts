import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'app/benefits/benefits.service';

@Component({
    selector: 'app-mentors',
    templateUrl: './workshops.component.html'
})
export class WorkshopComponent implements OnInit {
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

    constructor(private benefitsService: BenefitsService) {}

    ngOnInit(): void {
        this.hasProductDemoSlot = this.benefitsService.hasProductDemoSlot();
        this.hasWorkshopSlot = this.benefitsService.hasWorkshopSlot();
    }
}
