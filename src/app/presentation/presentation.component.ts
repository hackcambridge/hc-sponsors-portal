import { Component } from '@angular/core';
import { PresentationModel } from 'app/presentation/presenetation.model';

@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html'
})
export class PresentationComponent {
    /** The link to the uploaded presentation slides. */
    presentation: PresentationModel = {
        fileName: 'Example.pptx',
        fileUrl: 'http://test.com'
    };

    /** Upload a new set of slides. */
    uploadFile(): void {

    }
}
