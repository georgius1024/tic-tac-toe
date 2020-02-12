module.exports = {
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'lcov'],
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverageFrom: [
    '**/src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ]
}
