import { BasePage } from "./BasePage";
import { Locator } from '@playwright/test';


export class Dashboard extends BasePage {

    public readonly login
    =  this.page.getByRole('link', { name: 'Log in' });
    
    public readonly cookie = this.page.getByRole('button', { name: 'Do Not Accept' });

    async gotoUrl(){
       await this.page.goto(process.env.URL!);
    }
}