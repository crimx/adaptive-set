import jsEslint from "@eslint/js";
import gitignore from "eslint-config-flat-gitignore";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  jsEslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  importPlugin.flatConfigs.recommended,
  perfectionist.configs["recommended-natural"],
  gitignore(),
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        console: true,
        process: true,
      },
      sourceType: "module",
    },
    rules: {
      "prefer-const": "off",
      "sort-imports": "off",
    },
  },
  {
    rules: {
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/no-duplicates": ["error", { considerQueryString: true, "prefer-inline": true }],
      "import/no-unresolved": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "side-effect-style",
            "style",
            ["builtin-type", "external-type", "internal-type", "parent-type", "sibling-type", "index-type"],
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
            "object",
            "unknown",
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      parser: tsEslint.parser,
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
