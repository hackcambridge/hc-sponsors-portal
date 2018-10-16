import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { LayoutService } from './layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    companyName: string;
    year: number = (new Date()).getFullYear();
    gridLayout: string;

    constructor(private sponsorsService: SponsorsService,
                private router: Router,
                private layoutService: LayoutService) { }

    ngOnInit() {
        this.sponsorsService.getSponsorName().subscribe(
            name => this.companyName = name
        );
        
        this.layoutService.layoutMode$.subscribe(
            mode => this.gridLayout = mode
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
