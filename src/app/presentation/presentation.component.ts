import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresentationService } from 'app/presentation/presentation.service';
import { PresentationModel } from 'app/presentation/presentation.model';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { BaseComponent } from 'app/base.component';

@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html'
})
export class PresentationComponent extends BaseComponent implements OnInit {
    /** The link to the uploaded presentation slides. */
    presentation: PresentationModel;

    /** The user is uploading a new file, despite having uploaded one previously. */
    uploadNewFile: boolean;

    /** true if an upload is being performed. */
    uploadInProgress: boolean;

    constructor(private sponsorsService: SponsorsService,
                private activatedRoute: ActivatedRoute,
                private presentationService: PresentationService) {
        super(sponsorsService, activatedRoute);
    }

    ngOnInit(): void {
        this.guid$.subscribe(
            guid => {
                this.presentationService.getUploadedPresentation(guid).subscribe(
                    presentation => this.presentation = presentation
                );
            }
        );
    }

    /** Upload a new set of slides. */
    uploadFile(event): void {
        const fileList: FileList = event.target.files;

        if (fileList.length > 0) {
            const file: File = fileList[0];

            this.guid$.subscribe(
                guid => {
                    this.uploadInProgress = true;
                    const upload = this.presentationService.uploadPresentation(guid, file);

                    upload.then(
                        presentation => {
                            this.presentation = presentation;
                            this.uploadInProgress = false;
                            this.uploadNewFile = false;
                            alert('Presentation was uploaded successfully');
                        },
                        (error: Error) => {
                            this.uploadInProgress = false;
                            this.uploadNewFile = false;
                            alert(`Error uploading presentation:\n ${ error.message }`);
                        }
                    );
                }
            );
        }
    }
}
