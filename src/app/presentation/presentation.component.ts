import { Component } from '@angular/core';
import { PresentationModel } from 'app/presentation/presenetation.model';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html'
})
export class PresentationComponent extends BaseComponent {
    /** The link to the uploaded presentation slides. */
    presentation: PresentationModel;


    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute) {
        super(sponsorsService, activatedRoute);
    }

    /** Upload a new set of slides. */
    uploadFile(): void {

    }
}
