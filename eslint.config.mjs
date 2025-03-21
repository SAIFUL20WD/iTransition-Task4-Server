import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
    ignores: ["**/node_modules/", "**/dist/", ".env"],
    languageOptions: {
        globals: {
            ...globals.node,
            process: "readonly",
        },
    },
    rules: {
        "no-unused-vars": "error",
        "no-unused-expressions": "error",
        "prefer-const": "error",
        "no-console": "warn",
        "no-undef": "error",
    },
});
