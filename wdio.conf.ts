import { resolve } from "node:path";

export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",

  hostname: "127.0.0.1",
  port: 4723,
  path: "/",

  specs: ["./test/specs/**/*.ts"],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:appPackage": "org.wikipedia",
      "appium:appActivity": ".DefaultIcon",
      "appium:appWaitPackage": "org.wikipedia",
      "appium:appWaitActivity": "org.wikipedia.*",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": "Pixel 9",
      "appium:udid": "emulator-5554",
      "appium:app": resolve(
        process.cwd(),
        "apps/wikipedia-50610-r-2026-10-06.apk",
      ),
      "appium:noReset": false,
      "appium:newCommandTimeout": 120,
    },
  ],

  logLevel: "info",
  bail: 0,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [
    [
      "appium",
      {
        args: {
          address: "127.0.0.1",
          port: 4723,
          basePath: "/",
        },
      },
    ],
    [
      "visual",
      {
        baselineFolder: resolve(process.cwd(), "test/visual-baselines"),
        screenshotPath: resolve(process.cwd(), ".tmp/visual"),
        formatImageName: "{tag}-{deviceName}-{width}x{height}",
        autoSaveBaseline: false,
      },
    ],
  ],

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },

  afterTest: async function (_test, _context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
