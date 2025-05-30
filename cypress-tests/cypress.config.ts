import { defineConfig } from "cypress";

export const config: Cypress.ConfigOptions = {
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        server: {
          warmup: {
            clientFiles: ["**/*"],
          },
        },
      },
    },
    fixturesFolder: "./component-tests",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (_browser, launchActions) => {
        launchActions.preferences.width = 1600;
        launchActions.preferences.height = 1080;
        return launchActions;
      });
      config.browsers = config.browsers.filter((b) => b.name == "electron");
      return config;
    },
    supportFile: "./cypress/support/index.ts",
    retries: {
      runMode: 3,
      openMode: 0,
    },
  },
};

export default defineConfig(config);
