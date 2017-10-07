import { Component } from '@angular/core';
import { SponsorshipBenefitModel } from 'app/portal/sponsorship-benefit.model';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html'
})
export class PortalComponent {
    sponsorshipTier = 'Tera';
    sponsorshipBenefits: SponsorshipBenefitModel[] = [
      {
        name: 'API Demo',
        description: 'Demo your API'
      },
      {
        name: 'Workshop',
        description: 'Run a 30 minute workshop'
      }
    ];
}
