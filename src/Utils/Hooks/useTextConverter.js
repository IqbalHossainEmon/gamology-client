import { useCallback } from 'react';

const useTextConverter = () => {
	// convertNameToId: function to convert name to id format (if there is any space or special character in name then it will be replaced with '-' and all characters will be in lowercase format also if there is any '-' in name then it will be replaced with '\-')
	const convertNameToId = useCallback(name => {
		const transforms = [
			str => str.replace(/-/g, '\\-'),
			str => str.replace(/\s/g, '-'),
			str => str.replace(/\b[a-z]/g, char => `\\${char}`),
			str => str.toLowerCase(),
		];
		const result = transforms.reduce((acc, fn) => {
			try {
				return fn(acc);
			} catch {
				return acc;
			}
		}, name);
		return result;
	}, []);
	// convertIdToName: function to convert id to name format (if there is any '-' in id then it will be replaced with ' ' and first character of each word will be in uppercase format)
	const convertIdToName = useCallback(id => {
		const transforms = [
			str => str.replace(/(?<!\\)-/g, ' '),
			str => str.replace(/\\-/g, '-'),
			str => str.replace(/\b(?<!\\)\w/g, char => char.toUpperCase()),
			str => str.replace(/\\([a-z])/g, '$1'),
		];
		const result = transforms.reduce((acc, fn) => {
			try {
				return fn(acc);
			} catch {
				return acc;
			}
		}, id);
		return result;
	}, []);
	const convertNameToLink = useCallback(name => {
		const transforms = [
			str => str.replace(/[^a-zA-Z0-9\s-]/g, ''),
			str => str.replace(/\s+/g, '-'),
			str => str.toLowerCase(),
		];
		const result = transforms.reduce((acc, fn) => {
			try {
				return fn(acc);
			} catch {
				return acc;
			}
		}, name);
		return result;
	}, []);
	const convertToPascalCase = useCallback(
		name => name?.replace(/\b[a-z]/g, char => char.toUpperCase()),
		[]
	); // Capitalize the first letter of each word

	return {
		convertNameToId,
		convertIdToName,
		convertNameToLink,
		convertToPascalCase,
	};
};

export default useTextConverter;
