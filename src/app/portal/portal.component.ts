import { Component, OnInit } from '@angular/core';
import { BenefitsService, SponsorBenefitTypes } from 'app/benefits/benefits.service';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { BaseComponent } from 'app/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-portal',
    templateUrl: './portal.component.html'
})
export class PortalComponent extends BaseComponent implements OnInit {
    sponsorshipTier = 'Tera';
    sponsorshipBenefits: SponsorshipBenefitModel[] = [];

    portalLinksLeft: PortalLink[] = [];
    portalLinksCentre: PortalLink[] = [];
    portalLinksRight: PortalLink[] = [];

    constructor(private benefitsService: BenefitsService,
                private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.populateBenefitsList();
        this.determineVisibleLinks();
    }

    private populateBenefitsList(): void {
        this.sponsorshipBenefits = this.benefitsService.getSponsorBenefitDescriptions();
    }

    /**
     * Based on the sponsorship benefits available to this specific sponsor,
     * show and hide different links on the 'What You Need To Do' section.
     */
    private determineVisibleLinks(): void {
        const portalLinks: PortalLink[] = [];

        portalLinks.push({ pageUrl: 'people', text: 'Let Us Know Who\'s Coming' });
        portalLinks.push({ pageUrl: 'social-media', text: 'Provide Social Media Assets' });

        if (this.benefitsService.canRunWorkshopLikeEvent()) {
            portalLinks.push({ pageUrl: 'workshops', text: 'Tell us about any workshops' });
        }

        if (this.benefitsService.canListHardwareAndApis()) {
            portalLinks.push({ pageUrl: 'tech', text: 'Register your tech with us' });
        }

        if (this.benefitsService.canBringSwag()) {
            portalLinks.push({ pageUrl: 'swag', text: 'Ensure your swag is OK' });
        }

        if (this.benefitsService.canRunCompetitionAndEvents()) {
            portalLinks.push({ pageUrl: 'events', text: 'Plan any competitions and events' });
        }

        if (this.benefitsService.canRunOpeningCeremonyPresentation()) {
            portalLinks.push({ pageUrl: 'presentation', text: 'Send us your presentation' });
        }

        portalLinks.push({ pageUrl: 'details', text: 'Confirm your details' });
        portalLinks.push({ pageUrl: 'tips', text: 'Read our tips and tricks' });

        // Now split the links evenly across the three columns
        this.portalLinksLeft = [];
        this.portalLinksCentre = [];
        this.portalLinksRight = [];

        for (let i = 0; i < portalLinks.length; i++) {
            if (i % 3 === 0) {
                this.portalLinksLeft.push(portalLinks[i]);
            }
            else if (i % 3 === 1) {
                this.portalLinksCentre.push(portalLinks[i]);
            }
            else {
                this.portalLinksRight.push(portalLinks[i]);
            }
        }
    }
}

class PortalLink {
    pageUrl: string;
    text: string;
}
