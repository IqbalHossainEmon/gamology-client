const areObjectsEqual = (firstObject, secondObject) => {
	if (firstObject === secondObject) return true;
	if (
		typeof firstObject !== 'object' ||
		firstObject === null ||
		typeof secondObject !== 'object' ||
		secondObject === null
	)
		return false;

	const keysA = Object.keys(firstObject);
	const keysB = Object.keys(secondObject);

	if (keysA.length !== keysB.length) return false;

	return keysA.every(
		key => keysB.includes(key) && areObjectsEqual(firstObject[key], secondObject[key])
	);
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
