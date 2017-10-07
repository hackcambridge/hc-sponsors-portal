import { HackCambridgeSponsorsPortalPage } from './app.po';

describe('hack-cambridge-sponsors-portal App', () => {
  let page: HackCambridgeSponsorsPortalPage;

  beforeEach(() => {
    page = new HackCambridgeSponsorsPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
