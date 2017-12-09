import { Injectable } from '@angular/core';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { PresentationModel } from 'app/presentation/presentation.model';
import { Observable } from 'rxjs/Observable';
import 'firebase/storage';

@Injectable()
export class PresentationService {
    constructor(private db: AngularFireDatabase,
                private af: FirebaseApp,
                private sponsorsService: SponsorsService) {}

    private getPresentationObject(guid: string): AngularFireObject<PresentationModel> {
        return this.db.object(`sponsors/${guid}/presentation`);
    }

    getUploadedPresentation(magicLink: string): Observable<PresentationModel> {
        return this.sponsorsService.getSponsorGuid(magicLink).first().flatMap(
            guid => this.getPresentationObject(guid).valueChanges()
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
        const presentationObject = this.getPresentationObject(sponsorGuid);

        presentationObject.valueChanges().first().subscribe(
            (presentation: PresentationModel) => {
                if (presentation) {
                    this.af.storage().ref(presentation.refPath).delete();
                    presentationObject.remove();
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

                this.getPresentationObject(sponsorGuid).set(presentation);

                return presentation;
            }
        );
    }
}
