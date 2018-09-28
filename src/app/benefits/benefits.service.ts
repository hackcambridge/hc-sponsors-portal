import { Injectable } from '@angular/core';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
/**
 * This service provides information about the benefits that the current
 * sponsor is entitled to based on their sponsorship package.
 */
export class BenefitsService {
    constructor(private db: AngularFireDatabase) {}

    private getSponsorBenefitDescriptionsObject(guid: string): AngularFireObject<SponsorshipBenefitModel[]> {
        return this.db.object(`/sponsors/${guid}/benefits`);
    }

    private getMaxRecruitersObject(guid: string): AngularFireObject<number> {
        return this.db.object(`/sponsors/${guid}/maxRecruiters`);
    }

    getSponsorBenefitDescriptions(guid: string): Observable<SponsorshipBenefitModel[]> {
        return this.getSponsorBenefitDescriptionsObject(guid).valueChanges();
    }

    canRunWorkshopLikeEvent(benefits: SponsorshipBenefitModel[]): boolean {
        return this.hasWorkshopSlot(benefits) || this.hasProductDemoSlot(benefits);
    }

    canListHardwareAndApis(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) =>
            benefit.id === SponsorBenefitTypes.AdvertiseTechBeforeEvent ||
            benefit.id === SponsorBenefitTypes.BringHardwareListTech);
    }

    canBringSwag(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.BrandedSwag);
    }

    canRunCompetitionAndEvents(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) =>
            benefit.id === SponsorBenefitTypes.SideEvent ||
            benefit.id === SponsorBenefitTypes.ThemedPrize ||
            benefit.id === SponsorBenefitTypes.AwardHardwareApiPrize);
    }

    canRunOpeningCeremonyPresentation(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.OpeningCeremonyPresentation);
    }

    canAwardThemedPrize(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.ThemedPrize);
    }

    canRunHardwareApiPrize(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.AwardHardwareApiPrize);
    }

    canRunSideEvent(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.SideEvent);
    }

    getMaxNumberOfRecruiters(guid: string): Observable<number> {
        return this.getMaxRecruitersObject(guid).valueChanges();
    }

    hasWorkshopSlot(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.WorkshopSlot);
    }

    hasProductDemoSlot(benefits: SponsorshipBenefitModel[]): boolean {
        return benefits.some((benefit, i, a) => benefit.id === SponsorBenefitTypes.ProductDemoSlot);
    }

    getPresentationObject(guid: String): Observable<Object> {
        return
    }
}

export enum SponsorBenefitTypes {
    // Tera sponsor benefits
    ThemedPrize = 'themed-prize',
    SideEvent = 'side-event',
    WorkshopSlot = 'workshop-slot',
    OpeningCeremonyPresentation = 'opening-ceremony',
    StallInFoyer = 'stall-in-foyer',
    LogoOnProjector = 'logo-on-projector',

    // Giga sponsor packages
    ProductDemoSlot = 'product-demo-slot',
    CVsBeforeEvent = 'cvs-before-event',
    AwardHardwareApiPrize = 'award-hardware-api-prize',
    LargeStall = 'large-stall',
    AdvertiseTechBeforeEvent = 'advertise-tech',

    // Mega sponsor packages
    CVsAfterEvent = 'cvs-after-event',
    SmallStall = 'small-stall',
    LogoOnBanner = 'logo-on-banner',
    BrandedSwag = 'swag',
    SendRecruiters = 'send-recruiters',

    // Kilo sponsor packages
    BringHardwareListTech = 'bring-hardware-list-tech',
    LogoOnWebsite = 'logo-on-website',
    SendMentors = 'send-mentors',
    AnnouncementOnSocialMedia = 'social-media'
}
