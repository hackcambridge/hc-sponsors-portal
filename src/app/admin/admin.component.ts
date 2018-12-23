import { SponsorIndexModel } from 'app/admin/sponsor-index.model';
import { SponsorNoteModel } from 'app/admin/sponsor-note.model';
import { AdminService } from 'app/admin/admin.service';
import { BenefitsService } from 'app/benefits/benefits.service';
import { EventsService } from 'app/events/events.service';
import { PeopleService } from 'app/people/people.service';
import { PresentationService } from 'app/presentation/presentation.service';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { TechService } from 'app/tech/tech.service';
import { WorkshopService } from 'app/workshops/workshop.service';
import { Component } from '@angular/core';
import { LayoutService } from 'app/layout.service';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { first } from 'rxjs/operators';

@Component({
    selector: 'section[component="admin"]',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    sponsors: SponsorIndexModel[];

    constructor(private adminService: AdminService,
                private layoutService: LayoutService,
                private benefitsService: BenefitsService,
                private workshopService: WorkshopService,
                private eventsService: EventsService,
                private peopleService: PeopleService,
                private techService: TechService,
                private presentationService: PresentationService) {
        adminService.getSponsors().subscribe(
            sponsors => {
                this.sponsors = (sponsors ? sponsors.sort((a, b) => a.name.localeCompare(b.name)) : []);
                for (let sponsor of this.sponsors) {
                    this.benefitsService.getSponsorBenefitDescriptions(sponsor.id).pipe(first()).subscribe(
                        benefits => sponsor.notes = this.generateSponsorNotes(sponsor.id, benefits)
                    );
                }
            }
        );
        this.layoutService.setLayoutMode('a4');
    }

    private generateSponsorNotes(guid: string, benefits: SponsorshipBenefitModel[]): SponsorNoteModel[] {
        var sponsorNotes: SponsorNoteModel[] = []

        if(this.benefitsService.hasProductDemoSlot(benefits)) {
            this.workshopService.getDoingProductDemo(guid).pipe(first()).subscribe(
                doingProductDemo => {
                    if(doingProductDemo == null) {
                        sponsorNotes.push({
                            text: "No Product Demo Information Submitted",
                            link: guid + "/workshops"
                        });
                    }
                }
            );
        }

        if(this.benefitsService.hasWorkshopSlot(benefits)) {
            this.workshopService.getDoingWorkshop(guid).pipe(first()).subscribe(
                doingWorkshop => {
                    if(doingWorkshop == null) {
                        sponsorNotes.push({
                            text: "No Workshop Information Submitted",
                            link: guid + "/workshops"
                        });
                    }
                }
            );
        }


        if (this.benefitsService.canRunCompetitionAndEvents(benefits)) {
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

                    if(!hardwareAPIComp) {
                        sponsorNotes.push({
                            text: "No Hardwarte/API Competition Information Submitted",
                            link: guid + "/events"
                        });
                    }
                    if(!sideEventFlag) {
                        sponsorNotes.push({
                            text: "No Side Event Information Submitted",
                            link: guid + "/events"
                        });
                    }
                    if(!themedComp) {
                        sponsorNotes.push({
                            text: "No Themed Competition Information Submitted",
                            link: guid + "/events"
                        });
                    }
                }
            );
        }

        if (this.benefitsService.canRunOpeningCeremonyPresentation(benefits)) {
            this.presentationService.getUploadedPresentation(guid).pipe(first()).subscribe(
                presentation => {
                    if(presentation != null) {
                        sponsorNotes.push({
                            text: "No Opening Ceremony Presentation Submitted",
                            link: guid + "/presentation"
                        });
                    }
                }
            );
        }

        this.peopleService.getMentors(guid).pipe(first()).subscribe(
            mentors => {
                var numMentors = mentors == null ? 0 : mentors.length;
                sponsorNotes.push({
                    text: "Mentors: " + numMentors,
                    link: guid + "/people"
                });
            }
        );

        this.benefitsService.getMaxNumberOfRecruiters(guid).subscribe(
           limit => {
               if(limit > 0) {
                   this.peopleService.getRecruiters(guid).pipe(first()).subscribe(
                       recruiters => {
                           var numRecruiters = recruiters == null ? 0 : recruiters.length;
                           sponsorNotes.push({
                               text: "Recruiters: " + numRecruiters,
                               link: guid + "/people"
                           });
                       }
                   );
               }
           }
        );

        if (this.benefitsService.canListHardwareAndApis(benefits)) {
            this.techService.getTechList(guid).pipe(first()).subscribe(
                tech => {
                    var numTech = tech == null ? 0 : tech.length;
                    sponsorNotes.push({
                        text: "Items of Tech: " + numTech,
                        link: guid + "/tech"
                    });
                }
            );
        }

        return sponsorNotes;
    }
}
