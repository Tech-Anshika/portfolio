// jest.config.js
module.exports = {
  testEnvironment: "jsdom",   // ya "node" agar backend test kar rahe ho
  roots: ["<rootDir>/src"],   // test files kaha hain wo specify karo
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
};
