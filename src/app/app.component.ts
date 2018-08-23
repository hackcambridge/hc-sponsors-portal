import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { SponsorsService } from 'app/sponsors/sponsors.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    companyName: string;

    constructor(private sponsorsService: SponsorsService,
                private router: Router) { }

    ngOnInit() {
        this.sponsorsService.getSponsorName().subscribe(
            name => this.companyName = name
        );

        // When we navigate to a new page, we want to scroll to the top of the
        // page.
        this.router.events.subscribe(event => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo(0, 0);
        });
    }
}
