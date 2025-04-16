import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
	globalIgnores(['dist', 'node_modules']),
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
	},
	js.configs.recommended,
	prettierConfig,
	// React flat configs with settings applied globally
	{
		...react.configs.flat.recommended,
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	reactHooks.configs.flat['recommended-latest'],
	reactRefresh.configs.vite,
	{
		files: ['src/**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				node: {
					extensions: ['.mjs', '.js', '.jsx', '.json', '.cjs'],
					moduleDirectory: ['node_modules', 'src'],
				},
			},
			// Optional: treat some packages as core so resolver won't try to resolve deep exports
			'import/core-modules': ['@vitejs/plugin-react', 'eslint/config'],
		},
		plugins: {
			// react, react-hooks, react-refresh are already provided by flat configs above
			'jsx-a11y': jsxA11y,
			import: importPlugin,
			prettier: prettierPlugin,
		},

		rules: {
			...jsxA11y.configs.strict.rules,
			'prettier/prettier': [
				'error',
				{
					jsxSingleQuote: true,
					tabWidth: 4,
					printWidth: 100,
					singleQuote: true,
					trailingComma: 'es5',
					useTabs: true,
					semi: true,
					endOfLine: 'auto',
					arrowParens: 'avoid',
				},
			],
			'one-var': ['error', { initialized: 'never' }],
			'react/prop-types': 'off',
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'import/no-named-as-default': 'off',
			'import/no-named-as-default-member': 'off',
			'import/no-amd': 'off',
			'import/no-mutable-exports': 'off',
			'react/button-has-type': 'error',
			'import/newline-after-import': 'off',
			'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
			'react/jsx-props-no-spreading': 'off',
			'no-param-reassign': 'off',
			'no-plusplus': 'off',
			'no-nested-ternary': 'off',
			'consistent-return': 'off',
			'no-multi-assign': 'off',
			'no-case-declarations': 'off',
			// -----------------------
			// General JavaScript
			// -----------------------
			'no-unused-vars': [
				'error',
				{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
			],
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			curly: ['error', 'all'],
			'no-var': 'error',
			'prefer-const': ['error', { destructuring: 'all' }],
			semi: ['error', 'always'],
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
			'comma-dangle': ['error', 'only-multiline'],
			// -----------------------
			// React (eslint-plugin-react)
			// -----------------------
			'react/react-in-jsx-scope': 'off', // React 17+ automatic runtime
			'react/jsx-key': 'error', // Keys in lists
			'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
			'react/jsx-pascal-case': [
				'error',
				{ allowAllCaps: false, allowLeadingUnderscore: false },
			],
			'react/no-array-index-key': 'warn', // Prefer stable keys
			'react/no-unknown-property': 'error', // E.g., use className not class
			// -----------------------
			// React Hooks
			// -----------------------
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useMyHook|useAnother)' }],
			// -----------------------
			// Accessibility (eslint-plugin-jsx-a11y)
			// -----------------------
			// Merge recommended rules (if you spread jsxA11y.configs.recommended.rules) and then:
			'jsx-a11y/alt-text': [
				'warn',
				{
					elements: ['img', 'object', 'area', "input[type='image']"],
					img: ['Image'],
					object: [],
					area: [],
				},
			],
			'jsx-a11y/anchor-is-valid': [
				'warn',
				{
					components: ['Link'],
					specialLink: ['to', 'hrefLeft', 'hrefRight'],
					aspects: ['noHref', 'invalidHref', 'preferButton'],
				},
			],
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/role-has-required-aria-props': 'error',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/no-static-element-interactions': 'warn',
			'jsx-a11y/interactive-supports-focus': 'warn',
			'jsx-a11y/tabindex-no-positive': 'error',
			'jsx-a11y/label-has-associated-control': [
				'warn',
				{
					labelComponents: [],
					labelAttributes: [],
					controlComponents: ['Input', 'Select'],
					assert: 'either', // Allow nesting or htmlFor
					depth: 3,
				},
			],
			'jsx-a11y/media-has-caption': 'warn',
			'jsx-a11y/heading-has-content': 'warn',
			// -----------------------
			// Imports (eslint-plugin-import)
			// -----------------------
			'import/no-unresolved': ['error', { commonjs: true, amd: true }],
			'import/named': 'error',
			'import/default': 'error',
			'import/namespace': 'error',
			'import/no-duplicates': 'error',
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					pathGroups: [{ pattern: 'react', group: 'builtin', position: 'before' }],
					pathGroupsExcludedImportTypes: ['react'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			// -----------------------
			// Best-practice / style helpers
			// -----------------------
			'no-else-return': 'warn',
			'no-lonely-if': 'warn',
			'default-case': 'warn',
			'valid-typeof': 'error',
		},
	},
]);
