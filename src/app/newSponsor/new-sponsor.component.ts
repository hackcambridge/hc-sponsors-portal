import { Component } from '@angular/core';
import { AdminService } from 'app/admin/admin.service';
import { SponsorshipBenefitModel } from 'app/benefits/sponsorship-benefit.model';
import { SponsorModel } from 'app/admin/sponsor.model';
import { SponsorshipTier } from 'app/sponsors/sponsorship-tier.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-sponsor',
    templateUrl: 'new-sponsor.component.html'
})
export class NewSponsorComponent {
    sponsorName: string;
    tier: SponsorshipTier;
    maxRecruiters: number;
    benefits: SponsorshipBenefitModel[];
    selectedBenefits: boolean[];

    constructor(private adminService: AdminService,
                private router: Router) {
        adminService.getBenefits().first().subscribe(
            benefits => {
                this.benefits = benefits;
                this.selectedBenefits = [].fill(false, 0, benefits.length);
            }
        );
    }

    addBenefit(): void {
        const name = prompt('What is the name of this benefit?');

        if (!name) {
            return;
        }

        const benefit: SponsorshipBenefitModel = {
            id: name.replace(/\s+/, '-').toLowerCase(),
            name: name
        };

        this.benefits.push(benefit);
        this.selectedBenefits.push(false);

        this.adminService.saveBenefits(this.benefits).catch(
            (error: Error) => alert(error.message)
        );
    }

    saveSponsor(): void {
        const sponsor: SponsorModel = {
            name: this.sponsorName,
            maxRecruiters: this.maxRecruiters,
            tier: this.tier,
            benefits: this.benefits.filter((value, index, array) => this.selectedBenefits[index])
        };

        this.adminService.addSponsor(sponsor).subscribe(
            key => key ? this.router.navigate([ '/', key ]) : null,
            (error: Error) => alert(error.message)
        );
    }
}