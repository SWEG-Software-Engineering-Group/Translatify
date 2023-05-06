module.exports = {
  // la cartella di default dove Jest cerca i test
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/?(*.)+(spec|test).{ts,tsx}',
  ],
  // directory dove Jest cerca i moduli
  moduleDirectories: ['node_modules', 'src'],
  // trasforma i file TypeScript e React con Babel
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': 'jest-css-modules-transform',
  },  
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.css$': 'identity-obj-proxy'
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ] , 
  // ignora i moduli MUI durante la trasformazione con Babel
  transformIgnorePatterns: [
    "/node_modules/(?!@mui).+\\.js$",
    "/node_modules/(?!axios).+\\.js$",
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: [".ts", ".tsx", ".js"],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
