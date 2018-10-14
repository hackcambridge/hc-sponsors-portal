import { Component, OnInit } from '@angular/core';
import { BenefitsService, SponsorBenefitTypes } from 'app/benefits/benefits.service';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { EventsService } from 'app/events/events.service';
import { PeopleService } from 'app/people/people.service';
import { PresentationService } from 'app/presentation/presentation.service';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { TechService } from 'app/tech/tech.service';
import { WorkshopService } from 'app/workshops/workshop.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html'
})
export class PortalComponent extends BaseComponent implements OnInit {
    sponsorshipTier = '';
    sponsorshipBenefits: SponsorshipBenefitModel[];

    portalLinks: PortalLink[] = [];
    todoLinks: CheckedPortalLink[] = [];

    guid: string;

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private benefitsService: BenefitsService,
                private workshopService: WorkshopService,
                private presentationService: PresentationService,
                private eventsService: EventsService,
                private peopleService: PeopleService,
                private techService: TechService) {
        super(sponsorsService, activatedRoute, router);
    }

    ngOnInit(): void {
        this.determineVisibleLinks();
    }

    /**
     * Based on the sponsorship benefits available to this specific sponsor,
     * show and hide different links on the 'What You Need To Do' section.
     */
    private determineVisibleLinks(): void {
        this.guid$.subscribe(
            guid => {
                this.showLinksForSponsor(guid);
                this.getSponsorshipTier(guid);
                this.guid = guid;
            }
        );
    }

    private showLinksForSponsor(guid: string): void {
        this.benefitsService.getSponsorBenefitDescriptions(guid).pipe(first()).subscribe(
            benefits => {
                this.showLinksFromBenefits(guid, benefits);
                this.sponsorshipBenefits = benefits;
            }
        );
    }

    private getSponsorshipTier(guid: string): void {
        this.sponsorsService.getSponsorTier().subscribe(
            tier => this.sponsorshipTier = tier
        );
    }

    private showLinksFromBenefits(guid: string, benefits: SponsorshipBenefitModel[]): void {
        this.portalLinks.push({ pageUrl: 'tips', text: 'Read our tips and tricks' });

        // This year we will not be asking for social media via this, as we have
        // already asked for it via email

        // this.portalLinks.push({ pageUrl: 'social-media', text: 'Provide Social Media Assets' });

        if (this.benefitsService.canRunWorkshopLikeEvent(benefits)) {
            this.portalLinks.push({ pageUrl: 'workshops', text: 'Submit your workshops' });

            this.workshopService.getDoingProductDemo(guid).pipe(first()).subscribe(
                doingProductDemo => {
                    this.todoLinks.push({
                        pageUrl: 'workshops',
                        text: 'Submit product demo information',
                        checked: doingProductDemo !== null,
                        care: true
                    });
                }
            );

            this.workshopService.getDoingWorkshop(guid).pipe(first()).subscribe(
                doingWorkshop => {
                    this.todoLinks.push({
                        pageUrl: 'workshops',
                        text: 'Submit workshop information',
                        checked: doingWorkshop !== null,
                        care: true
                    });
                }
            );
        }

        // This year we will not be asking for swag details via this, as we have
        // already asked for it via email
        //
        // if (this.benefitsService.canBringSwag(benefits)) {
        //     portalLinks.push({ pageUrl: 'swag', text: 'Ensure your swag is OK' });
        // }

        if (this.benefitsService.canRunCompetitionAndEvents(benefits)) {
            this.portalLinks.push({ pageUrl: 'events', text: 'Submit your competitions and events' });
            this.eventsService.getCompetitions(guid).pipe(first()).subscribe(
                competitions => {
                    var hardwareAPIComp = competitions == null ?
                                          false :
                                          competitions["doingHardwareApiCompetition"] !== undefined;

                    var sideEventFlag = competitions == null ?
                                        false :
                                        competitions["doingSideEvent"] !== undefined;

                    var themedComp = competitions == null ?
                                     false :
                                     competitions["doingThemedCompetition"] !== undefined;

                    this.todoLinks.push({
                        pageUrl: 'events',
                        text: 'Submit hardware/API competition information',
                        checked: hardwareAPIComp,
                        care: true
                    });
                    this.todoLinks.push({
                        pageUrl: 'events',
                        text: 'Submit side event information',
                        checked: sideEventFlag,
                        care: true
                    });
                    this.todoLinks.push({
                        pageUrl: 'events',
                        text: 'Submit themed competition information',
                        checked: themedComp,
                        care: true
                    });
                }
            );
        }

        if (this.benefitsService.canRunOpeningCeremonyPresentation(benefits)) {
            this.portalLinks.push({ pageUrl: 'presentation', text: 'Submit your presentation' });
            this.presentationService.getUploadedPresentation(guid).pipe(first()).subscribe(
                presentation => {
                    this.todoLinks.push({
                        pageUrl: 'presentation',
                        text: 'Send opening ceremony presentation',
                        checked: presentation !== null,
                        care: true
                    });
                }
            );
        }

        this.portalLinks.push({ pageUrl: 'people', text: 'Submit your attendees' });
        this.peopleService.getMentors(guid).pipe(first()).subscribe(
            mentors => {
                var numMentors = mentors == null ? 0 : mentors.length;
                var mentorsString = numMentors == 0 ?
                                    "You're not bringing any mentors." :
                                    numMentors == 1 ?
                                    "You're bringing a single mentor." :
                                    "You're bringing "+ numMentors +" mentors.";
                this.todoLinks.push({
                    pageUrl: 'people',
                    text: mentorsString,
                    checked: false,
                    care: false
                });
            }
        );
        this.benefitsService.getMaxNumberOfRecruiters(guid).subscribe(
           limit => {
               if(limit > 0) {
                   this.peopleService.getRecruiters(guid).pipe(first()).subscribe(
                       recruiters => {
                           var numRecruiters = recruiters == null ? 0 : recruiters.length;
                           var recruitersString = numRecruiters == 0 ?
                                                "You're not bringing any recruiters." :
                                                numRecruiters == 1 ?
                                                "You're bringing a single recruiter." :
                                                "You're bringing "+ numRecruiters +" recruiters.";
                           this.todoLinks.push({
                               pageUrl: 'people',
                               text: recruitersString,
                               checked: false,
                               care: false
                           });
                       }
                   );
               }
           }
        );



        if (this.benefitsService.canListHardwareAndApis(benefits)) {
            this.portalLinks.push({ pageUrl: 'tech', text: 'Submit your tech' });
            this.techService.getTechList(guid).pipe(first()).subscribe(
                tech => {
                    var numTech = tech == null ? 0 : tech.length;
                    var techString = numTech == 0 ?
                                     "You're not bringing any tech." :
                                     numTech == 1 ?
                                     "You're bringing one item of tech." :
                                     "You're bringing "+ numTech +" items of tech.";
                    this.todoLinks.push({
                        pageUrl: 'tech',
                        text: techString,
                        checked: false,
                        care: false
                    });
                }
            );
        }


    }

}

class PortalLink {
    pageUrl: string;
    text: string;
}

class CheckedPortalLink {
    pageUrl: string;
    text: string;
    checked: boolean;
    care: boolean; // Whether or not to do the strikethrough
}
