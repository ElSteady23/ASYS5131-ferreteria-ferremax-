module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    // global: {
    //   branches: 70,
    //   functions: 70,
    //   lines: 70,
    //   statements: 70
    // }
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
