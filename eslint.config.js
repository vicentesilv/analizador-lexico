import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    'src/assets/componentesGenerales/**',
    '!src/assets/componentesGenerales/Btns/BtnsGenericos.jsx',
    '!src/assets/componentesGenerales/Genericos/Contenedores.jsx',
    '!src/assets/componentesGenerales/Genericos/Textos.jsx',
    '!src/assets/componentesGenerales/Layout/LayoutGeneral.jsx',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['src/assets/componentesGenerales/**/*.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
