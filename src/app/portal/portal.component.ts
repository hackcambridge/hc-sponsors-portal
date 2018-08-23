import { Component, OnInit } from '@angular/core';
import { BenefitsService, SponsorBenefitTypes } from 'app/benefits/benefits.service';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html'
})
export class PortalComponent extends BaseComponent implements OnInit {
    sponsorshipTier = '';
    sponsorshipBenefits: SponsorshipBenefitModel[];

    portalLinks: PortalLink[] = [];
    
    guid: string;

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private benefitsService: BenefitsService) {
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
                this.showLinksFromBenefits(benefits);
                this.sponsorshipBenefits = benefits;
            }
        );
    }

    private getSponsorshipTier(guid: string): void {
        this.sponsorsService.getSponsorTier().subscribe(
            tier => this.sponsorshipTier = tier
        );
    }

    private showLinksFromBenefits(benefits: SponsorshipBenefitModel[]): void {
        this.portalLinks.push({ pageUrl: 'tips', text: 'Read our tips and tricks' });

        this.portalLinks.push({ pageUrl: 'people', text: 'Let us know who’s coming' });

        // This year we will not be asking for social media via this, as we have
        // already asked for it via email

        // this.portalLinks.push({ pageUrl: 'social-media', text: 'Provide Social Media Assets' });

        if (this.benefitsService.canRunWorkshopLikeEvent(benefits)) {
            this.portalLinks.push({ pageUrl: 'workshops', text: 'Tell us about any workshops' });
        }

        if (this.benefitsService.canListHardwareAndApis(benefits)) {
            this.portalLinks.push({ pageUrl: 'tech', text: 'Register your tech with us' });
        }

        // This year we will not be asking for swag details via this, as we have
        // already asked for it via email
        //
        // if (this.benefitsService.canBringSwag(benefits)) {
        //     portalLinks.push({ pageUrl: 'swag', text: 'Ensure your swag is OK' });
        // }

        if (this.benefitsService.canRunCompetitionAndEvents(benefits)) {
            this.portalLinks.push({ pageUrl: 'events', text: 'Plan competitions and events' });
        }

        if (this.benefitsService.canRunOpeningCeremonyPresentation(benefits)) {
            this.portalLinks.push({ pageUrl: 'presentation', text: 'Send us your presentation' });
        }
    }
}

class PortalLink {
    pageUrl: string;
    text: string;
}
