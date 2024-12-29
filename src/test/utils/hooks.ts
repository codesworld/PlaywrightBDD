// tests/support/hooks.js
import { Before, After, BeforeAll, setWorldConstructor, Status,  } from '@cucumber/cucumber'
import { Browser, BrowserContext, chromium, Page} from "@playwright/test";
import { PageManager } from "../../pages/PageManager";
import  path from "path";
import fs from "fs";

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  pageManager! : PageManager;
  attach: any;

  async close(): Promise<void> {
    try {
      if (this.page) {
        await this.page.close();
      }
      if (this.context) {
        await this.context.close();
      }
      if (this.browser) {
        await this.browser.close();
      }
      console.log("Browser, context, and page closed successfully.");
    } catch (err) {
      console.error("Error occurred while closing resources:", err);
    }
  }
  
}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
  this.browser = await chromium.launch({headless: true, 
    slowMo: 100, 
    args: ["--start-maximized"]  });
  this.context = await this.browser.newContext({
    ignoreHTTPSErrors: true,
    acceptDownloads: true, 
  });
  this.page = await this.context.newPage();
  this.pageManager = new PageManager(this.page);
});

After(async function (this: CustomWorld,scenario : any) {

  if (scenario.result?.status === Status.FAILED) {
    await takescreenshot(this.page,scenario)   
  }
 await this.close();
});

async function takescreenshot(this: any, page : Page ,scenario:any){
  
    const dateTimeString = new Date().toISOString().replace(/[:.]/g, '-');
    const scenarioName = scenario.pickle.name.replace(/ /g, '_');
    const screenshotPath = path.join('reports/screenshots', `${scenarioName}_${dateTimeString}.png`);
    await page.waitForTimeout(1000);
    const screenshotBuffer = await page.screenshot({fullPage : true });  
    await fs.writeFileSync(screenshotPath, screenshotBuffer);
    // if (this.attach) {
    //   this.attach(screenshotBuffer, 'image/png');
    // }  
}


