import { Component, OnInit } from '@angular/core';
import { EventModel, CompetitionModel } from 'app/events/events.model';
import { BenefitsService } from 'app/benefits/benefits.service';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html'
})
export class EventsComponent extends BaseComponent implements OnInit {
    /** Holds any details about the themed prize that the sponsor wants to run. */
    themedPrize: CompetitionModel;

    /** Holds any details about the side events that the sponsor wants to run. */
    sideEvent: EventModel;

    /** Holds details about any hardware/API prize that the sponsor wants ro run. */
    hardwareApiPrize: CompetitionModel;

    /**
     * Indicates whether the sponsor's benefits includes being able to award a
     * themed prize.
     */
    canAwardThemedPrize: boolean;

    /**
     * Indicates whether the sponsor\s benefits includes being able to run a
     * side-event.
     */
    canRunSideEvent: boolean;

    /**
     * Indicates whether the sponsor's benefits includes being able to run a
     * hardware/API prize.
     */
    canRunHardwareApiPrize: boolean;

    /** Indicates whether the sponsor plans to run a themed prize. */
    doingThemedPrize = false;

    /** Indicates whether the sponsor plans to run as side-event. */
    doingSideEvent = false;

    /** Indicates whether the sponsor plans to run a hardware/API prize. */
    doingHardwareApiPrize = false;

    constructor(private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute,
                private benefitsService: BenefitsService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.canAwardThemedPrize = this.benefitsService.canAwardThemedPrize();
        this.canRunHardwareApiPrize = this.benefitsService.canRunHardwareApiPrize();
        this.canRunSideEvent = this.benefitsService.canRunSideEvent();
    }

    /**
     * Called whenever the sponsor selects that they will or will not do run a
     * themed prize.
     * @param doingThemedPrize Whether the sponsor has selected that they will
     * run a themed prize.
     */
    onDoingThemedPrizeChanged(doingThemedPrize: boolean): void {
        if (!this.canAwardThemedPrize) {
            throw new Error('Cannot set themed prize - sponsor does not have permission to!');
        }
        if (doingThemedPrize) {
            this.themedPrize = new CompetitionModel();
        }
        else {
            this.themedPrize = undefined;
        }
    }

    /**
     * Called whenever the sponsor selects that they will or will not do run a
     * side-event.
     * @param doingSideEvent Whether the sponsor has selected that they will run
     * a side-event.
     */
    onDoingSideEventChanged(doingSideEvent: boolean): void {
        if (!this.canRunSideEvent) {
            throw new Error('Cannot run side event - sponsor does not have permission to!');
        }

        if (doingSideEvent) {
            this.sideEvent = new EventModel();
        }
        else {
            this.sideEvent = undefined;
        }
    }

    /**
     * Called whenever the sponsor selects that they will or will not do run a
     * hardware or API prize.
     * @param doingCompetition Whether the sponsor has selected that they will
     * run a hardware/API prize or not.
     */
    onDoingHardwareApiPrizeChanged(doingCompetition: boolean): void {
        if (!this.canRunHardwareApiPrize) {
            throw new Error('Cannot run side event - sponsor does not have permission to!');
        }

        if (doingCompetition) {
            this.hardwareApiPrize = new CompetitionModel();
        }
        else {
            this.hardwareApiPrize = undefined;
        }
    }
}
