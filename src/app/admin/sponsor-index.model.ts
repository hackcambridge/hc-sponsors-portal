import { SponsorNoteModel } from 'app/admin/sponsor-note.model';

export class SponsorIndexModel {
    id: string;
    name: string;
    notes: SponsorNoteModel[] = [];
}
