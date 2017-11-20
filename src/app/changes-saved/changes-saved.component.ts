import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-changes-saved',
    templateUrl: './changes-saved.component.html'
})
export class ChangesSavedComponent {
    magicUrl: string;

    constructor(activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(
            params => this.magicUrl = params['code']
        );
    }
}
