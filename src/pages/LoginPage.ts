import { BasePage } from "./BasePage";
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    
    public readonly email
    =  this.page.getByPlaceholder("Email address")
   
    public readonly password = this.page.getByPlaceholder("Password");

    public readonly loginButton = this.page.getByRole('button', { name: 'Log In' });

    async login(email:string, password : string){
        await this.email.click();
        await this.email.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.loginButton.click();
    }

    public readonly tokenInput= this.page.locator("#input-9");

    public readonly verify = this.page.getByRole('button', { name: 'Verify' });

    public readonly message = this.page.getByRole('alert');

    async alertMessage() {
        return this.message.textContent();
    }
    
}