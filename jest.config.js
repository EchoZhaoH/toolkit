module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/src/**/__tests__/**/*spec.[jt]s?(x)'],
}