import { Config } from "@jest/types";
import { readFileSync } from "fs";
import { pathsToModuleNameMapper } from "ts-jest";

let config: Config.InitialOptions = {
  rootDir: __dirname,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  injectGlobals: false,
  onlyChanged: false,
  collectCoverage: false,
  moduleDirectories: ["node_modules", "types"],
  moduleFileExtensions: ["ts", "js"],
  modulePathIgnorePatterns: ["dist"],
  transform: { "^.+\\.m?[tj]sx?$": ["ts-jest", { useESM: true }] },
  testMatch: [`${__dirname}/**/*.spec.ts`],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: getPaths(),
};

export default config;

export function getPaths(
  tsConfigPath = "./tsconfig.json",
  prefix = "<rootDir>"
) {
  let tsConfigContent = readFileSync(tsConfigPath, "utf8");
  let tsConfig = JSON.parse(tsConfigContent) as { [key: string]: any };

  return pathsToModuleNameMapper(tsConfig?.compilerOptions?.paths || {}, {
    prefix,
  });
}
