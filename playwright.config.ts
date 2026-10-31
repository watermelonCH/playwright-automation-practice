import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    trace: 'retain-on-failure', //off,on
  },


});
