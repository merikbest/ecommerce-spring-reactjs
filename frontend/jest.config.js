module.exports = {
    roots: ["<rootDir>"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        },
    },
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{ts,tsx}"],
    coverageDirectory: "coverage",
    moduleNameMapper: {
        "\\.(css|scss|png|jpg|svg)$": "<rootDir>/src/utils/test/__mocks__/image-mock.tsx"
    }
};