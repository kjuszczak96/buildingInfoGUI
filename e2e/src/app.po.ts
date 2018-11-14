import { browser, by, element, promise } from 'protractor';

export class AppPage {
    // tslint:disable-next-line:no-any
    navigateTo(): promise.Promise<any> {
        return browser.get('/');
    }

    getParagraphText(): promise.Promise<string> {
        return element(by.css('app-root h1')).getText();
    }
}
