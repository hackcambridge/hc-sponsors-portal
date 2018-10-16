import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: '[component="changes-saved"]',
    templateUrl: './changes-saved.component.html'
})
export class ChangesSavedComponent {
    guid: string;

    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(
            params => this.guid = params['guid']
        );
    }
}
