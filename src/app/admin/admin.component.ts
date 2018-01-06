import { SponsorIndexModel } from 'app/admin/sponsor-index.model';
import { AdminService } from 'app/admin/admin.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    sponsors: SponsorIndexModel[];

    constructor(private adminService: AdminService) {
        adminService.getSponsors().subscribe(
            sponsors => this.sponsors = (sponsors ? sponsors.sort((a, b) => a.name.localeCompare(b.name)) : [])
        );
    }
}
