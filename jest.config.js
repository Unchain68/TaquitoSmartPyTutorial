// jest.config.js

module.exports = {
    preset: 'ts-jest', // TypeScript를 사용하는 경우
    moduleFileExtensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'], // ECMAScript Modules를 사용하는 경우
    testEnvironment: 'node',
    transform: {
      '^.+\\.(js|mjs|jsx)$': 'babel-jest', // ECMAScript Modules를 사용하는 경우
      '^.+\\.(ts|tsx)$': 'ts-jest' // TypeScript를 사용하는 경우
    },
    testRegex: '\\.test\\.(js|mjs|jsx|ts|tsx)$',
    collectCoverageFrom: [
      'src/**/*.{js,mjs,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/__tests__/**/*.*',
      '!**/node_modules/**'
    ],
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  }