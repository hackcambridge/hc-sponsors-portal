import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Since the <code>SponsorsService</code> requires the sponsor guid to be provided
 * to it by components in the router outlet, this component should be the
 * base of all components.
 */
export abstract class BaseComponent {
    protected guid$ = new BehaviorSubject<string>(undefined);

    constructor(
        protected sponsorsService: SponsorsService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router) {
            this.activatedRoute.params.subscribe(
                params => this.guid$.next(params['guid'])
            );


            this.guid$.subscribe(
                guid => this.sponsorsService.setSponsorGuid(guid)
            );

            this.sponsorsService.getSponsorName().subscribe(
                name => {
                    if (name === null) {
                        router.navigate([ '/404' ]);
                    }
                }
            );
    }
}
