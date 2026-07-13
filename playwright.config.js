// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';
/**
 * @see https://playwright.dev/docs/test-configuration
 */ //export default defineConfig ---- this is nothing but variable holding below mentioned to we altered to const config=
const config = ({
  testDir: './tests',
  retries: 2,
  timeout: 150 * 1000, // it will applicable to the entire project, every step - global

  expect: {
    timeout: 6000 // this is for assertion validations expect timeout
  },

reporter: [
  ['html'],
  ['allure-playwright']
], 

  use: {  // browser initalization should be in use object
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on', //on or off ('retain-on-failure') - on means it will bring all the trace(passed screenshot of the execution) off means completely off
    //off- means it will capture only on failure...(on-- means even test is passed it will show screenshot)
  },

});

module.exports = config // it means, the above mentioned config file will be available across all the files in the project.