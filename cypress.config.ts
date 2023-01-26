import { defineConfig } from 'cypress'
import {
  createCypressLog,
} from './cypress/support/savetime/src/services/handler/cypress-file-handler'

export default defineConfig({
  projectId: 'h3q1s1',
  defaultCommandTimeout: 100000,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      on('after:run', (results) => {
        createCypressLog('e2e', results)
        return null
      })
    },
  },
  component: {
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    setupNodeEvents(on) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      on('after:run', (results) => {
        createCypressLog('component', results)
        return null
      })
    },
  },
})
