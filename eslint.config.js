import js from '@eslint/js';
import airbnb from 'eslint-config-airbnb';
import prettierConfig from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import prettier from 'prettier';

export default [
	{ ignores: ['dist'] },
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
			prettier: prettierPlugin,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			...airbnb.rules,
			...prettier.rules,
			...jsxA11y.configs.recommended.rules,
			...prettierConfig.rules,
			'prettier/prettier': [
				'error',
				{
					trailingComma: 'es5',
					singleQuote: true,
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
		},
	},
];
