module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/src/models/', '/src/controllers/', '/__tests__/']
  // testPathIgnorePatterns: ['/src/models/', '/src/controllers/']
};
