// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on, worker, workers } from 'node:cluster';
import { trace } from 'node:console';
import { report } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  workers: 1,
  fullyParallel: false,
  testDir: './tests',
  timeout: 100*1000,

   expect: {
    timeout: 5000,
  },

    use: {
    navigationTimeout: 400000,
    browserName: 'chromium',
    headless: true,
    trace: "retain-on-failure",
    screenshot: "on",
  },



   reporter: 'html',

  

});
module.exports = config

