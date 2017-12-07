import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'app/benefits/benefits.service';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';
import { WorkshopModel } from 'app/workshops/workshop.model';

@Component({
    selector: 'app-mentors',
    templateUrl: './workshops.component.html'
})
export class WorkshopComponent extends BaseComponent implements OnInit {
    hasWorkshopSlot: boolean;
    hasProductDemoSlot: boolean;

    productDemo: WorkshopModel;
    workshop: WorkshopModel;

    doingProductDemo: boolean;
    doingWorkshop: boolean;

    constructor(private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute,
                private benefitsService: BenefitsService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            params => this.getIsAllowedWorkshops(params['code'])
        );
    }

    onDoingProductDemoChange(value: boolean): void {
        if (value) {
            this.productDemo = new WorkshopModel();
            this.doingProductDemo = true;
        }
        else {
            this.productDemo = undefined;
            this.doingProductDemo = false;
        }
    }

    onDoingWorkshopChange(value: boolean): void {
        if (value) {
            this.workshop = new WorkshopModel();
            this.doingWorkshop = true;
        }
        else {
            this.workshop = undefined;
            this.doingWorkshop = false;
        }
    }

    private getIsAllowedWorkshops(magicLink: string): void {
        this.benefitsService.getSponsorBenefitDescriptions(magicLink).first().subscribe(
            benefits => {
                this.hasProductDemoSlot = this.benefitsService.hasProductDemoSlot(benefits);
                this.hasWorkshopSlot = this.benefitsService.hasWorkshopSlot(benefits);
            }
        );
    }

    private getWorkshops(magicLink: string): void {
        
    }
}
