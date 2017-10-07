import { Component } from '@angular/core';
import { SocialMediaPostModel } from 'app/social-media/social-media.model';

@Component({
    selector: 'app-social-media',
    templateUrl: './social-media.component.html'
})
export class SocialMediaComponent {
    facebookPost = new SocialMediaPostModel();
    twitterPost = new SocialMediaPostModel();
    instagramPost = new SocialMediaPostModel();

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
