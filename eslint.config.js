import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    '.next',
    'dist',
    // Unrelated agent-skill tooling that happens to live in the repo root.
    'claude-design-skills/**',
    '.agents/skills/**',
    '.claude/skills/**',
    // Scaffolded shadcn/ui kit that nothing in the app imports (see the
    // migration report) — carried forward unchanged, not linted as live code.
    'components/ui/**',
    'hooks/use-toast.js',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      // eslint-plugin-react's and eslint-plugin-react-hooks' *top-level*
      // `configs.recommended` still ship the legacy `plugins: ["name"]`
      // string-array shape; `configs.flat.recommended` / manual wiring
      // below use the real flat-config object shape instead. (Routing any
      // of this through eslint-config-next's FlatCompat bridge crashes on
      // a circular `plugins.react` self-reference — see comment history.)
      react.configs.flat.recommended,
      { plugins: { 'react-hooks': reactHooks }, rules: reactHooks.configs.recommended.rules },
      nextPlugin.configs['core-web-vitals'],
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // This project (like the Vite app before it) targets React's
      // automatic JSX runtime and has never used PropTypes.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
    },
  },
])
