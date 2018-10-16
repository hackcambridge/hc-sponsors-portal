import { Component, OnInit } from '@angular/core';
import { BenefitsService } from 'app/benefits/benefits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopModel } from 'app/workshops/workshop.model';
import { WorkshopService } from 'app/workshops/workshop.service';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { LayoutService } from 'app/layout.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'section[component="workshops"][grid="rows"][ng-init="$parent.selected=item.counter-1"]',
    templateUrl: './workshops.component.html'
})
export class WorkshopComponent extends BaseComponent implements OnInit {
    hasWorkshopSlot: boolean;
    hasProductDemoSlot: boolean;

    productDemo: WorkshopModel;
    workshop: WorkshopModel;

    doingProductDemo: boolean;
    doingProductDemoUnset: boolean;
    doingWorkshop: boolean;
    doingWorkshopUnset: boolean;

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private workshopService: WorkshopService,
                private benefitsService: BenefitsService,
                private layoutService: LayoutService) {
        super(sponsorsService, activatedRoute, router);
        this.layoutService.setLayoutMode('a4');
    }

    ngOnInit(): void {
        this.guid$.pipe(first()).subscribe(
            guid => {
                this.getIsAllowedWorkshops(guid);
                this.getWorkshops(guid);
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

    private getIsAllowedWorkshops(guid: string): void {
        this.benefitsService.getSponsorBenefitDescriptions(guid).pipe(first()).subscribe(
            benefits => {
                this.hasProductDemoSlot = this.benefitsService.hasProductDemoSlot(benefits);
                this.hasWorkshopSlot = this.benefitsService.hasWorkshopSlot(benefits);
            }
        );
    }

    private getWorkshops(guid: string): void {

        // Whether to display the "-- Select --" option.
        this.workshopService.getDoingProductDemo(guid).pipe(first()).subscribe(
            doingProductDemo => {
                this.doingProductDemoUnset = doingProductDemo == null;
                this.workshopService.getProductDemos(guid).pipe(first()).subscribe(
                    demo => {
                        this.productDemo = demo;
                        this.doingProductDemo = demo !== null;
                    }
                );
            }
        );

        this.workshopService.getDoingWorkshop(guid).pipe(first()).subscribe(
            workshop => {
                this.doingWorkshopUnset = workshop == null;
                this.workshopService.getWorkshop(guid).pipe(first()).subscribe(
                    workshop => {
                        this.workshop = workshop;
                        this.doingWorkshop = workshop !== null;
                    }
                );
            }
        );

    }

    saveProductDemo(): void {
        const productDemo = this.doingProductDemo ? this.productDemo : null;
        this.guid$.pipe(first()).subscribe(
            guid => this.workshopService.saveProductDemo(guid, productDemo)
        );
    }

    saveWorkshop(): void {
        const workshop = this.doingWorkshop ? this.workshop : null;
        this.guid$.pipe(first()).subscribe(
            guid => this.workshopService.saveWorkshop(guid, workshop)
        );
    }
}
