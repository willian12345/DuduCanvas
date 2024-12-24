module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  transform: {
    // '^.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.ts$": ["ts-jest", { isolatedModules: true }],
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  globals: {
    
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
