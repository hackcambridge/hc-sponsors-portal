import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    companyName = 'Acme Inc';

    constructor(private router: Router) { }

    ngOnInit() {
        // When we navigate to a new page, we want to scroll to the top of the
        // page.
        this.router.events.subscribe(event => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo(0, 0)
        });
    }
}
