module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/components/ui'],
  parser: '@typescript-eslint/parser',
  plugins: ['tailwindcss', 'react-refresh'],
  settings: {
    tailwindcss: {
      config: 'tailwind.config.cjs',
      callees: ['cn', 'cva'], // default values: ["classnames", "clsx", "ctl"]
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
