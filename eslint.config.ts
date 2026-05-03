import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// eslint-disable-next-line import-x/extensions
import { defineConfig, globalIgnores } from "eslint/config";
import commonConfig from "./SillyStoreCommon/eslint.config.ts";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended", commonConfig],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
    },
    tseslint.configs.recommended,
    globalIgnores([".config/*", "dist/"]),
]);
