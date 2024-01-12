import * as path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    setupFiles: ['dotenv/config'],
    dir: 'tests', // vitest doesn't ignore .build/**/*.test and unfortunately the build step compiles tests.
  },
})
