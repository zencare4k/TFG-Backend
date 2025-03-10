module.exports = {
  testEnvironment: "node",
  collectCoverage: true, // Habilita la cobertura
  coverageDirectory: "coverage",
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['**/tests/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};