import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * Since the <code>SponsorsService</code> requires the sponsor guid to be provided
 * to it by components in the router outlet, this component should be the
 * base of all components.
 */
export abstract class BaseComponent {
    protected guid$ = new BehaviorSubject<string>(undefined);

    constructor(
        sponsorsService: SponsorsService,
        activatedRoute: ActivatedRoute) {

        activatedRoute.params.subscribe(
            params => this.guid$.next(params['guid'])
        );

        this.guid$.subscribe(
            guid => sponsorsService.setSponsorGuid(guid)
        );
    }
}
