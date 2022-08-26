import { defineConfig } from "cypress";
import {
  compareRecentTwoFiles,
  createCypressLog,
  // pushTransferredLogs,
  openHTMLInfoPage,
} from "./cypress/support/savetime/file-handler";

export default defineConfig({
  projectId: "ga7u2y",
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",

    setupNodeEvents(on) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      on("after:run", (results) => {
        console.log("cypress.config.ts:create_log/after:run");
        createCypressLog(results);
        compareRecentTwoFiles();
        openHTMLInfoPage();
        return null;
      });
      // on("before:browser:launch", (browser, launchOptions) => {
      //   // supply the absolute path to an unpacked extension's folder
      //   // NOTE: extensions cannot be loaded in headless Chrome
      //   // eslint-disable-next-line @typescript-eslint/no-var-requires
      //   const path = require("path");
      //   launchOptions.extensions.push(
      //     path.resolve(__dirname, "./cypress/support/savetime/getting-started")
      //   );
      //   return launchOptions;
      // });
    },
  },
  component: {
    specPattern: "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
