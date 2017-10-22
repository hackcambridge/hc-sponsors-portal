import { Component } from '@angular/core';
import { PersonModel } from 'app/people/person.model';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html'
})
export class PeopleComponent {
    henry: PersonModel = {
        name: 'Henry Thompson',
        email: 'hello@henrythompson.me',
        phoneNumber: '07501252170'
    };

    mentors: PersonModel[] = [
        this.henry,
        {
            name: 'Justin Malcic',
            email: 'jmalcic@icloud.com',
            phoneNumber: '07320838798'
        }
    ];

    recruiters: PersonModel[] = [
        {
            name: 'Henry Thompson',
            email: 'hello@henrythompson.me',
            phoneNumber: '07501252170'
        },
        {
            name: 'Justin Malcic',
            email: 'jmalcic@icloud.com',
            phoneNumber: '07320838798'
        }
    ];

    /** The maximum number of recruiters this sponsor may bring. */
    recruiterLimit = 5;

    /** True if the entries for all mentors have been filled out. */
    mentorDetailsCompleted = true;

    /** True if the entries for all recruiters have been filled out. */
    recruiterDetailsCompleted = true;

    /** The mentor nominated to be Hack Cambridge judge. */
    judge: PersonModel = this.henry;

    addMentor(): void {
        // Only allow a mentor to be added if the rest are completed
        if (this.mentorDetailsCompleted) {
            this.mentors.unshift(new PersonModel());
            this.mentorDetailsCompleted = false;
        }
    }

    deleteMentor(index: number): void {
        if (this.mentors[index] === this.judge) {
            this.judge = undefined;
        }

        if (this.mentors[index]) {
            this.mentors.splice(index, 1);
        }
    }

    onMentorChanges(): void {
        this.mentorDetailsCompleted = this.mentors.every((mentor, index, array) => this.isPersonModelComplete(mentor));
    }

    addRecruiter(): void {
        if (this.recruiters.length === this.recruiterLimit) {
            throw Error('Cannot add recruiter: number of recruiters cannot exceed assigned limit for sponsor.');
        }

        // Only allow a mentor to be added if the rest are completed
        if (this.recruiterDetailsCompleted) {
            this.recruiters.unshift(new PersonModel());
            this.onRecruiterChanges();
        }
    }

    deleteRecruiter(index: number): void {
        if (this.recruiters[index]) {
            this.recruiters.splice(index, 1);
        }

        this.onRecruiterChanges();
    }

    onRecruiterChanges(): void {
        this.recruiterDetailsCompleted = this.recruiters.every((recruiter, index, array) => this.isPersonModelComplete(recruiter));
    }

    private isPersonModelComplete(person: PersonModel): boolean {
        return !!person.name && !!person.email && !!person.phoneNumber;
    }
}
