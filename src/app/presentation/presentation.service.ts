import { Injectable } from '@angular/core';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { PresentationModel } from 'app/presentation/presentation.model';
import { Observable } from 'rxjs/Observable';
import 'firebase/storage';

@Injectable()
export class PresentationService {
    constructor(private db: AngularFireDatabase,
                private af: FirebaseApp,
                private sponsorsService: SponsorsService) {}

    getUploadedPresentation(magicLink: string): Observable<PresentationModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).first().flatMap(
            guid => this.db.object(`presentations/${guid}/`).valueChanges()
        );
    }

    uploadPresentation(magicLink: string, data: File): Observable<PresentationModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).first().flatMap(
            guid => {
                this.deletePresentation(guid);
                return this.pushUpload(guid, data);
            }
        );
    }

    private deletePresentation(sponsorGuid: string) {
        const presentationPath = `presentations/${sponsorGuid}`;

        this.db.object(presentationPath).valueChanges().first().subscribe(
            (presentation: PresentationModel) => {
                if (presentation) {
                    this.af.storage().ref(presentation.refPath).delete();
                    this.db.object(presentationPath).remove();
                }
            }
        );
    }

    private pushUpload(sponsorGuid: string, data: File): Promise<PresentationModel> {
        const refPath = `${sponsorGuid}/${data.name}`;
        const task = this.af.storage().ref(refPath).put(data);

        return task.then(
            snapshot => {
                const presentation: PresentationModel = {
                    name: data.name,
                    url: snapshot.downloadURL,
                    refPath: refPath
                };

                this.db.object(`presentations/${sponsorGuid}`).set(presentation);

                return presentation;
            }
        );
    }
}
