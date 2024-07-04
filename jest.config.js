module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testEnvironment: 'node',
  collectCoverage: true,
  
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['src/models/', 'src/controllers/', '/__tests__/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/models/**', // Excluye la carpeta src/models
    '!src/controllers/**', // Excluye la carpeta src/models
    '!test/**' // Excluye la carpeta test
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90
  //   }
  // },
  // testPathIgnorePatterns: ['/src/models/', '/src/controllers/']
};


