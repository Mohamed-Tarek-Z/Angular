import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message Ristorante Con Fusion', async () => {
    await page.navigateTo('/');
    expect(await page.getTitleText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should nav to about',async () => {
    page.navigateTo('/');
    let navlink = page.getAllElement('a').get(1);
    await navlink.click();

    expect(await page.getTitleText('h3')).toBe('About Us');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
