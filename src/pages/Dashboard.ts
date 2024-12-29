import { BasePage } from "./BasePage";
import { Locator } from '@playwright/test';


export class Dashboard extends BasePage {

    public readonly login
    =  this.page.getByText('Log in');

    public readonly cookie = this.page.locator('#onetrust-reject-all-handler');

    async acceptCookie() {
        await this.cookie.waitFor({ state: 'visible' })
        await this.cookie.click();
        await this.page.waitForTimeout(2000)
    }

    async gotoUrl(){
       await this.page.goto(process.env.URL!);
       console.log(process.env.URL);
    }
}