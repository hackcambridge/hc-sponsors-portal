import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home-link',
    templateUrl: './home-link.component.html'
})
export class HomeLinkComponent {
    guid: string;

    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(
            params => this.guid = params['guid']
        );
    }
}
