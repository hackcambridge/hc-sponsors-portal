import { Component } from '@angular/core';
import { SocialMediaPostModel } from 'app/social-media/social-media.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { SponsorsService } from 'app/sponsors/sponsors.service';

@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html'
})
export class SocialMediaComponent extends BaseComponent {
    facebookPost = new SocialMediaPostModel();
    twitterPost = new SocialMediaPostModel();
    instagramPost = new SocialMediaPostModel();

    constructor(sponsorsService: SponsorsService,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(sponsorsService, activatedRoute, router);
    }

    publishToFacebook(): void {
        this.facebookPost.published = true;
    }

    publishToTwitter(): void {
        this.instagramPost.published = true;
    }

    publishToInstagram(): void {
        this.instagramPost.published = true;
    }
}
