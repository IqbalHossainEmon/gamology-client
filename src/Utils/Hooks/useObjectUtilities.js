const areObjectsEqual = (firstObject, secondObject) => {
	// Fast path: reference equality
	if (firstObject === secondObject) {
		return true;
	}

	// Handle NaN comparison
	if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
		return true;
	}

	// Different types
	if (typeof firstObject !== typeof secondObject) {
		return false;
	}

	// Handle null and undefined - both must be null/undefined to be equal
	if (firstObject == null && secondObject == null) {
		return true;
	}
	if (firstObject == null || secondObject == null) {
		return false;
	}

	// Handle primitives
	if (typeof firstObject !== 'object') {
		return firstObject === secondObject;
	}

	// Handle Date objects
	if (firstObject instanceof Date && secondObject instanceof Date) {
		return firstObject.getTime() === secondObject.getTime();
	}

	// Handle RegExp objects
	if (firstObject instanceof RegExp && secondObject instanceof RegExp) {
		return firstObject.toString() === secondObject.toString();
	}

	// Handle React elements (JSX) - these should be compared by their structure
	const isFirstReactElement =
		firstObject && typeof firstObject === 'object' && firstObject.$$typeof;
	const isSecondReactElement =
		secondObject && typeof secondObject === 'object' && secondObject.$$typeof;

	if (isFirstReactElement || isSecondReactElement) {
		// If one is a React element and the other isn't, they're different
		if (isFirstReactElement !== isSecondReactElement) {
			return false;
		}

		// If both are React elements, compare their key properties
		if (isFirstReactElement && isSecondReactElement) {
			return (
				firstObject.type === secondObject.type &&
				firstObject.key === secondObject.key &&
				areObjectsEqual(firstObject.props, secondObject.props)
			);
		}
	}

	// Handle functions - compare by reference only
	if (typeof firstObject === 'function' && typeof secondObject === 'function') {
		return firstObject === secondObject;
	}

	// Handle arrays
	if (Array.isArray(firstObject)) {
		if (!Array.isArray(secondObject)) {
			return false;
		}
		if (firstObject.length !== secondObject.length) {
			return false;
		}

		return firstObject.every((item, index) => areObjectsEqual(item, secondObject[index]));
	}

	if (Array.isArray(secondObject)) {
		return false;
	}

	// Handle plain objects
	const keysA = Object.keys(firstObject);
	const keysB = Object.keys(secondObject);

	if (keysA.length !== keysB.length) {
		return false;
	}

	// Check each property exists in both objects and values are equal
	return keysA.every(key => {
		// Check if the property exists in secondObject
		if (!Object.prototype.hasOwnProperty.call(secondObject, key)) {
			return false;
		}

		// Recursively compare property values
		return areObjectsEqual(firstObject[key], secondObject[key]);
	});
};

function cloneObject(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(item => cloneObject(item));
	}

	const clone = Object.create(Object.getPrototypeOf(obj));

	const keys = Object.keys(obj);

	keys.forEach(key => {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			clone[key] = cloneObject(obj[key]);
		}
	});

	return clone;
}

const useObjectUtilities = () => ({ areObjectsEqual, cloneObject });

export default useObjectUtilities;
