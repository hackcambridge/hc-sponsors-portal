import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'app/people/person.model';
import { BenefitsService } from 'app/benefits/benefits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from 'app/people/people.service';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { BaseComponent } from 'app/base.component';
import { LayoutService } from 'app/layout.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'section[component="app-people"][grid="rows"]',
    templateUrl: './people.component.html'
})
export class PeopleComponent extends BaseComponent implements OnInit {
    /** The mentors chosen by the sponsor to come to the event. */
    mentors: PersonModel[] = [];

    /** The recruiters chosen by the sponsor to come to the event. */
    recruiters: PersonModel[] = [];

    /** The maximum number of recruiters this sponsor may bring. */
    recruiterLimit: number;

    /** True if the entries for all mentors have been filled out. */
    mentorDetailsCompleted = true;

    /** True if the entries for all recruiters have been filled out. */
    recruiterDetailsCompleted = true;

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private benefitsService: BenefitsService,
                private peopleService: PeopleService,
                private layoutService: LayoutService) {
        super(sponsorsService, activatedRoute, router);
        this.layoutService.setLayoutMode('a4');
    }

    ngOnInit(): void {
        this.guid$.subscribe(
            guid => {
                this.benefitsService.getMaxNumberOfRecruiters(guid).subscribe(
                   limit => this.recruiterLimit = limit
                );

                this.peopleService.getMentors(guid).pipe(first()).subscribe(
                    mentors => this.mentors = mentors ? mentors.filter(n => n) : []
                );

                this.peopleService.getRecruiters(guid).pipe(first()).subscribe(
                    recruiters => this.recruiters = recruiters.filter(n => n) ? recruiters : []
                );
            }
        );
    }

    addMentor(): void {
        // Only allow a mentor to be added if the rest are completed
        if (this.mentorDetailsCompleted) {
            this.mentors.unshift(new PersonModel());
            this.mentorDetailsCompleted = false;
        }

        this.onMentorChanges();
    }

    deleteMentor(index: number): void {
        if (this.mentors[index]) {
            this.mentors.splice(index, 1);
            this.mentors = this.mentors.filter(n => n);
        }

        this.onMentorChanges();
    }

    onMentorChanges(): void {
        this.mentorDetailsCompleted = this.mentors.every((mentor, index, array) => this.isPersonModelComplete(mentor));
        this.saveChanges();
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
            this.recruiters = this.recruiters.filter(n => n);
        }

        this.onRecruiterChanges();
    }

    onRecruiterChanges(): void {
        this.recruiterDetailsCompleted = this.recruiters.every(
            (recruiter, index, array) => this.isPersonModelComplete(recruiter));
        this.saveChanges();
    }

    private isPersonModelComplete(person: PersonModel): boolean {
        return !!person.name && !!person.email && !!person.phone;
    }

    private saveChanges(): void {
        this.guid$.pipe(first()).subscribe(
            guid => this.peopleService.saveState(guid, this.mentors, this.recruiters)
        );
    }
}
