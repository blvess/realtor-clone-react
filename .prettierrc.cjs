module.exports = {
  plugins: [require('prettier-plugin-tailwindcss'), require('prettier-plugin-organize-imports')],
  tailwindConfig: './tailwind.config.cjs',
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "bracketSpacing": true
}

