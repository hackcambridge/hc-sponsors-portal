import { SponsorsService } from 'app/sponsors/sponsors.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Since the <code>SponsorsService</code> requires the magic URL to be provided
 * to it by components in the router outlet, this component should be the
 * base of all components.
 */
export abstract class BaseComponent {
    constructor(
        sponsorsService: SponsorsService,
        activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(
            params => sponsorsService.setSponsorGuid(params['guid'])
        );
    }
}
