import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
	{
		files: ['**/*.{js,jsx}'],
		ignores: ['dist'],
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
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			'react/jsx-no-target-blank': 'off',
			'react/jsx-props-no-spreading': 0,
			'react/react-in-jsx-scope': 0,
			'react-hooks/rules-of-hooks': 'error',
			'no-console': 0,
			'react/state-in-constructor': 0,
			indent: 0,
			'linebreak-style': 0,
			'react/prop-types': 0,
			'jsx-a11y/click-events-have-key-events': 0,
			'no-param-reassign': 0,
			'no-nested-ternary': 0,
			'jsx-a11y/label-has-associated-control': 0,
			'react/function-component-definition': 0,
			'no-plusplus': 0,
			'no-unused-vars': ['error', { argsIgnorePattern: '_' }],
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},
];
