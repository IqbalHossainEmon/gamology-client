import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
	baseDirectory: dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{ ignores: ['dist'] },
	...compat.extends('airbnb', 'airbnb/hooks'),
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: { react: { version: '18.3' } },
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'jsx-a11y': jsxA11y,
			prettier: prettierPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			...prettier.rules,
			...jsxA11y.configs.recommended.rules,
			...prettierConfig.rules,
			'prettier/prettier': [
				'error',
				{
					trailingComma: 'es5',
					singleQuote: true,
					jsxSingleQuote: true,
					printWidth: 100,
					tabWidth: 4,
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
			'import/newline-after-import': 'off',
			'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
			'react/jsx-props-no-spreading': 'off',
			'no-param-reassign': 'off',
			'no-plusplus': 'off',
			'no-nested-ternary': 'off',
		},
	},
];
