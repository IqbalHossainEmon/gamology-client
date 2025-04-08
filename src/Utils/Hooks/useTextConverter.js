import { useRef } from 'react';

const useTextConverter = () => {
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			// convertNameToId: function to convert name to id format (if there is any space or special character in name then it will be replaced with '-' and all characters will be in lowercase format also if there is any '-' in name then it will be replaced with '\-')
			convertNameToId: name =>
				name
					?.replace(/-/g, '\\-')
					?.replace(/\s/g, '-')
					?.replace(/\b[a-z]/g, char => `\\${char}`)
					.toLowerCase(),
			// convertIdToName: function to convert id to name format (if there is any '-' in id then it will be replaced with ' ' and first character of each word will be in uppercase format)
			convertIdToName: id =>
				id
					?.replace(/(?<!\\)-/g, ' ') // Replace hyphens not preceded by a backslash with spaces
					?.replace(/\\-/g, '-') // Replace escaped hyphens with regular hyphens
					?.replace(/\b(?<!\\)\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word not preceded by a backslash
					?.replace(/\\([a-z])/g, '$1'), // Remove backslashes before lowercase letters
			convertNameToLink: name =>
				name
					?.replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
					?.replace(/\s+/g, '-') // Replace spaces with hyphens
					.toLowerCase(),
			convertToPascalCase: name => name?.replace(/\b[a-z]/g, char => char.toUpperCase()), // Capitalize the first letter of each word
		};
	}

	return {
		convertNameToId: eventRefs.current.convertNameToId,
		convertIdToName: eventRefs.current.convertIdToName,
		convertNameToLink: eventRefs.current.convertNameToLink,
		convertToPascalCase: eventRefs.current.convertToPascalCase,
	};
};

export default useTextConverter;
