// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { on, worker } from 'node:cluster';
/**
 * @see https://playwright.dev/docs/test-configuration
 */ //export default defineConfig ---- this is nothing but variable holding below mentioned to we altered to const config=
const config = ({
  testDir: './tests',
  retries: 1,
  workers: 10, //By default playwright will run 5 execution as each workers take each test. here we are controlling to run with only 3 worker.
  timeout: 150 * 1000, // it will applicable to the entire project, every step - global

  expect: {
    timeout: 6000 // this is for assertion validations expect timeout
  },

  reporter: 'html', // for report

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'off',
        // ...devices['iPhone 11'] //mobile testing it will adjust to that specific mobs resolution.
      }

    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'off',
        // ...devices['iPhone 11'] //mobile testing it will adjust to that specific mobs resolution.
      }

    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        video: 'retain-on-failure',
        ignoreHttpsErrors: true, // it will bypass ssl certicate error, automatically click advance and proceed.
        permissions: ['geolocation'], // it will allow if broswer asks turn on location permission.
        screenshot: 'on',
        trace: 'on',
        //viewport: { width: 100, height: 100 } //adjusting browser screen size(mobile friendly website) -- can use it on webresponsive testing whether it the page elements are correctly fitting or not.


      }

    }
  ]
});

module.exports = config // it means, the above mentioned config file will be available across all the files in the project.