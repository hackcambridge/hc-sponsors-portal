import { Component, OnInit } from '@angular/core';
import { EventModel, CompetitionModel, EventsSummaryModel } from 'app/events/events.model';
import { BenefitsService } from 'app/benefits/benefits.service';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'app/events/events.service';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';

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

    /**
     * Indicates if the user is doing a hardware or API prize competition.
     */
    doingHardwareApiPrize: boolean;

    /**
     * Indicates if the user is doing a side event.
     */
    doingSideEvent: boolean;

    /**
     * Indicates if the user is doing a themed prize.
     */
    doingThemedPrize: boolean;

    constructor(private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute,
                private benefitsService: BenefitsService,
                private eventsService: EventsService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            params => this.getBenefits(params['guid'])
        );
    }

    private getBenefits(magicLink: string): void {
        this.benefitsService.getSponsorBenefitDescriptions(magicLink).first().subscribe(
            benefits => {
                this.canAwardThemedPrize = this.benefitsService.canAwardThemedPrize(benefits);
                this.canRunHardwareApiPrize = this.benefitsService.canRunHardwareApiPrize(benefits);
                this.canRunSideEvent = this.benefitsService.canRunSideEvent(benefits);
            });

        this.eventsService.getHardwareApiCompetition(magicLink).first().subscribe(
            competitions => {
                if (competitions) {
                    this.hardwareApiPrize = competitions.hardwareApiCompetition;
                    this.sideEvent = competitions.sideEvent;
                    this.themedPrize = competitions.themedCompetition;
                }
                else {
                    this.hardwareApiPrize = undefined;
                    this.sideEvent = undefined;
                    this.themedPrize = undefined;
                }

                this.doingHardwareApiPrize = this.hardwareApiPrize !== undefined;
                this.doingSideEvent = this.sideEvent !== undefined;
                this.doingThemedPrize = this.themedPrize !== undefined;
            }
        )
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

        this.doingThemedPrize = doingThemedPrize;
        this.saveEventsState();
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

        this.doingSideEvent = doingSideEvent;
        this.saveEventsState()
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

        this.doingHardwareApiPrize = doingCompetition;
        this.saveEventsState();
    }

    /**
     * Saves the currenty entered events into the database.
     */
    saveEventsState(): void {
        const events: EventsSummaryModel = {
            hardwareApiCompetition: this.hardwareApiPrize,
            sideEvent: this.sideEvent,
            themedCompetition: this.themedPrize
        };

        this.activatedRoute.params.first().subscribe(
            params => this.eventsService.saveEvents(params['guid'], events)
        );
    }
}
