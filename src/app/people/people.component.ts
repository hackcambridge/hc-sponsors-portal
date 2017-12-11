import { Component, OnInit } from '@angular/core';
import { PersonModel } from 'app/people/person.model';
import { BenefitsService } from 'app/benefits/benefits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from 'app/people/people.service';
import { SponsorsService } from 'app/sponsors/sponsors.service';
import { BaseComponent } from 'app/base.component';

@Component({
    selector: 'app-people',
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

    /** The index of the mentor nominated to be Hack Cambridge judge. */
    judge: number;

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router,
                private benefitsService: BenefitsService,
                private peopleService: PeopleService) {
        super(sponsorsService, activatedRoute, router);
    }

    ngOnInit(): void {
        this.guid$.subscribe(
            guid => {
                this.benefitsService.getMaxNumberOfRecruiters(guid).subscribe(
                   limit => this.recruiterLimit = limit
                );

                this.peopleService.getMentors(guid).first().subscribe(
                    mentors => this.mentors = mentors ? mentors : []
                );

                this.peopleService.getRecruiters(guid).first().subscribe(
                    recruiters => this.recruiters = recruiters ? recruiters : []
                );

                this.peopleService.getJudge(guid).first().subscribe(
                    judge => this.judge =judge
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

        if (this.judge !== null) {
            // The index of the judge must have increased
            this.judge++;
        }

        this.onMentorChanges();
    }

    deleteMentor(index: number): void {
        if (index === this.judge) {
            this.judge = null;
        }

        if (this.mentors[index]) {
            this.mentors.splice(index, 1);
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
        }

        this.onRecruiterChanges();
    }

    onRecruiterChanges(): void {
        this.recruiterDetailsCompleted = this.recruiters.every(
            (recruiter, index, array) => this.isPersonModelComplete(recruiter));
        this.saveChanges();
    }

    onJudgeChange(): void {
        this.saveChanges();
    }

    private isPersonModelComplete(person: PersonModel): boolean {
        return !!person.name && !!person.email && !!person.phone;
    }

    private saveChanges(): void {
        this.guid$.first().subscribe(
            guid => this.peopleService.saveState(guid, this.mentors,
                this.recruiters, this.judge)
        );
    }
}
