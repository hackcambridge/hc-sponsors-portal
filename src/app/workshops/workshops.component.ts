import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'app/benefits/benefits.service';
import { ActivatedRoute } from '@angular/router';
import { WorkshopModel } from 'app/workshops/workshop.model';
import { WorkshopService } from 'app/workshops/workshop.service';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';

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
                private workshopService: WorkshopService,
                private activatedRoute: ActivatedRoute,
                private benefitsService: BenefitsService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.activatedRoute.params.first().subscribe(
            params => {
                this.getIsAllowedWorkshops(params['guid']);
                this.getWorkshops(params['guid']);
            }
        );
    }

    onDoingProductDemoChange(value: boolean): void {
        if (value) {
            this.productDemo = new WorkshopModel();
            this.doingProductDemo = true;
        }
        else {
            this.productDemo = null;
            this.doingProductDemo = false;
        }

        this.saveProductDemo();
    }

    onDoingWorkshopChange(value: boolean): void {
        if (value) {
            this.workshop = new WorkshopModel();
            this.doingWorkshop = true;
        }
        else {
            this.workshop = null;
            this.doingWorkshop = false;
        }

        this.saveWorkshop();
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
        this.workshopService.getWorkshop(magicLink).first().subscribe(
            workshop => {
                this.workshop = workshop;
                this.doingWorkshop = workshop !== null;
            }
        );

        this.workshopService.getProductDemos(magicLink).first().subscribe(
            demo => {
                this.productDemo = demo;
                this.doingProductDemo = demo !== null;
            }
        );
    }

    saveProductDemo(): void {
        const productDemo = this.doingProductDemo ? this.productDemo : null;

        this.activatedRoute.params.first().subscribe(
            params => this.workshopService.saveProductDemo(params['guid'], productDemo)
        );
    }

    saveWorkshop(): void {
        const workshop = this.doingWorkshop ? this.workshop : null;

        this.activatedRoute.params.first().subscribe(
            params => this.workshopService.saveWorkshop(params['guid'], workshop)
        );
    }
}
