import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: '[component="home-button"]',
    templateUrl: './home-button.component.html'
})
export class HomeButtonComponent {
    guid: string;

    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(
            params => this.guid = params['guid']
        );
    }
}
