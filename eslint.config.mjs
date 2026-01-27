// @ts-check
import createESLintConfig from '@th1o/frontend-lint'
import nuxt from './.nuxt/eslint.config.mjs'

export default createESLintConfig(
  {
    formatters: true,
    pnpm: true,
  }
)
  .append(nuxt())
