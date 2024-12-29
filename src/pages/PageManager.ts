import { Page,Locator } from "@playwright/test"
import { Dashboard } from "./Dashboard"
import { LoginPage } from "./LoginPage"

export class PageManager {

    private readonly page: Page
    private readonly homePage: Dashboard
    private readonly loginPage: LoginPage
   

    constructor(page: Page) {
        this.page = page
        this.homePage = new Dashboard(this.page)
        this.loginPage = new LoginPage(this.page)          
    }

    onHomePage(){
        return this.homePage
    }

    onLoginPage() {
        return this.loginPage
    }
    
}