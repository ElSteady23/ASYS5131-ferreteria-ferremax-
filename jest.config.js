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
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
