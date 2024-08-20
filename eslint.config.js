import { default as js } from '@eslint/js';
import { default as react } from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
	{ ignores: [ 'dist' ] },
	{
		files: [ '**/*.{js,mjs,cjs,jsx}' ],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.all.rules,
			...react.configs.all.rules,
			...react.configs[ 'jsx-runtime' ].rules,
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
			'react/jsx-no-target-blank': 'off',
			'react/react-in-jsx-scope': 'off',
			'sort-imports': [ 'error', {
				'ignoreCase': true,
				'ignoreDeclarationSort': true,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': [ 'none', 'all', 'multiple', 'single' ]
			} ]
		},
		settings: { react: { version: '18.3' } },
	},
];

/* Import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default [
	{ files: ['** /*.{js,mjs,cjs,jsx}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
];
 */
