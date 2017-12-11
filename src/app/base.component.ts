import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Since the <code>SponsorsService</code> requires the sponsor guid to be provided
 * to it by components in the router outlet, this component should be the
 * base of all components.
 */
export abstract class BaseComponent {
    protected guid$ = new BehaviorSubject<string>(undefined);

    constructor(
        private sponsorsService: SponsorsService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
            this.activatedRoute.params.subscribe(
                params => this.guid$.next(params['guid'])
            );

            this.guid$.subscribe(
                guid => this.sponsorsService.setSponsorGuid(guid, name => {
                    if (name == null) {
                        router.navigate([ '/404' ]);
                    }
                })
            );
    }
}
