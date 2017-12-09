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
    sponsorshipBenefits: SponsorshipBenefitModel[];

    portalLinksLeft: PortalLink[] = [];
    portalLinksCentre: PortalLink[] = [];
    portalLinksRight: PortalLink[] = [];

    constructor(private benefitsService: BenefitsService,
                private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.determineVisibleLinks();
    }

    /**
     * Based on the sponsorship benefits available to this specific sponsor,
     * show and hide different links on the 'What You Need To Do' section.
     */
    private determineVisibleLinks(): void {
        const routeParams = this.activatedRoute.params.subscribe(
            params => this.showLinksForMagicLink(params['code'])
        );
    }

    private showLinksForMagicLink(magicLink: string) {
        this.benefitsService.getSponsorBenefitDescriptions(magicLink).first().subscribe(
            benefits => {
                this.showLinksFromBenefits(benefits);
                this.sponsorshipBenefits = benefits;
            }
        );
    }

    private showLinksFromBenefits(benefits: SponsorshipBenefitModel[]): void {
        const portalLinks: PortalLink[] = [];

        portalLinks.push({ pageUrl: 'tips', text: 'Read our tips and tricks' });

        portalLinks.push({ pageUrl: 'people', text: 'Let Us Know Who\'s Coming' });

        // This year we will not be asking for social media via this, as we have
        // already asked for it via email

        // portalLinks.push({ pageUrl: 'social-media', text: 'Provide Social Media Assets' });

        if (this.benefitsService.canRunWorkshopLikeEvent(benefits)) {
            portalLinks.push({ pageUrl: 'workshops', text: 'Tell us about any workshops' });
        }

        if (this.benefitsService.canListHardwareAndApis(benefits)) {
            portalLinks.push({ pageUrl: 'tech', text: 'Register your tech with us' });
        }

        // This year we will not be asking for swag details via this, as we have
        // already asked for it via email
        //
        // if (this.benefitsService.canBringSwag(benefits)) {
        //     portalLinks.push({ pageUrl: 'swag', text: 'Ensure your swag is OK' });
        // }

        if (this.benefitsService.canRunCompetitionAndEvents(benefits)) {
            portalLinks.push({ pageUrl: 'events', text: 'Plan competitions and events' });
        }

        if (this.benefitsService.canRunOpeningCeremonyPresentation(benefits)) {
            portalLinks.push({ pageUrl: 'presentation', text: 'Send us your presentation' });
        }

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
