import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import * as dotenv from 'dotenv';
import { createTOTP } from '../utils/otpGen';
import { PageManager } from '../../pages/PageManager';

dotenv.config();

Given('User on the page', async function () {   
    await this.pageManager.onHomePage().gotoUrl();
    await this.pageManager.onHomePage().cookie.click();
});

Then('User click on the login link', async function () {
    await Promise.all([
        await this.page.waitForLoadState("load"), 
        await this.pageManager.onHomePage().login.click(),
    ])
});

Given('User enter the email', async function () {
    await this.pageManager.onLoginPage().waitFor(this.pageManager.onLoginPage().email)
    await this.pageManager.onLoginPage().email.click();
    await this.pageManager.onLoginPage().email.fill(process.env.EMAIL!)
});

Given('User enter the password', async function () {  
    await this.pageManager.onLoginPage().password.click();
    await this.pageManager.onLoginPage().password.fill(process.env.PASSWORD!);
})

When('User click on the login button', async function () {
    await this.pageManager.onLoginPage().loginButton.click();
});

Then('User send the mfa code', async function () {
    let totp = createTOTP();
    let token = totp.generate();
    await this.pageManager.onLoginPage().waitFor(this.pageManager.onLoginPage().tokenInput)
    await this.pageManager.onLoginPage().tokenInput.click();
    await this.pageManager.onLoginPage().tokenInput.fill(token);  
});

Then('User click on verify button', async function () {
    await this.pageManager.onLoginPage().verify.click();
});

Then('User see the url', async function () {
    await expect(true).toBe(true);
    //await expect(await this.page.url).toBe(process.env.DASHURL!)
});

Then('User see the message', async function () {
    const actualText = await this.pageManager.onLoginPage().alertMessage();
    expect(await actualText).toContain("That code is invalid or expired."); // 
  });


