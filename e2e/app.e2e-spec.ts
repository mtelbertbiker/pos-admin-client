import { PosAdminClientPage } from './app.po';

describe('pos-admin-client App', () => {
  let page: PosAdminClientPage;

  beforeEach(() => {
    page = new PosAdminClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
