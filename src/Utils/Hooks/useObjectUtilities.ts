type ReactElementLike = {
  $$typeof: symbol | number;
  type: unknown;
  key: unknown;
  props: Record<string, unknown>;
};

const isReactElement = (value: unknown): value is ReactElementLike =>
  typeof value === "object" &&
  value !== null &&
  (typeof (value as Record<string, unknown>)["$$typeof"] === "symbol" ||
    typeof (value as Record<string, unknown>)["$$typeof"] === "number");

const objectToString = Object.prototype.toString;

const getTag = (value: object): string => objectToString.call(value);

const areObjectsEqual = (
  firstObject: unknown,
  secondObject: unknown,
  comparing = new WeakMap<object, object>(),
): boolean => {
  if (firstObject === secondObject) {
    return true;
  }

  if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
    return true;
  }

  if (typeof firstObject !== typeof secondObject) {
    return false;
  }

  if (firstObject === null || secondObject === null) {
    return false;
  }

  if (typeof firstObject !== "object") {
    return firstObject === secondObject;
  }

  const b = secondObject as object;

  if (comparing.get(firstObject) === b) {
    return true;
  }
  comparing.set(firstObject, b);

  try {
    const tag1 = getTag(firstObject);
    const tag2 = getTag(b);

    if (tag1 !== tag2) {
      return false;
    }

    switch (tag1) {
      case "[object Array]": {
        const arrA = firstObject as unknown[];
        const arrB = b as unknown[];
        if (arrA.length !== arrB.length) {
          return false;
        }
        for (let i = 0; i < arrA.length; i++) {
          if (!areObjectsEqual(arrA[i], arrB[i], comparing)) {
            return false;
          }
        }
        return true;
      }

      case "[object Date]":
        return (firstObject as Date).getTime() === (b as Date).getTime();

      case "[object RegExp]":
        return (firstObject as RegExp).toString() === (b as RegExp).toString();

      case "[object Map]": {
        const mapA = firstObject as Map<unknown, unknown>;
        const mapB = b as Map<unknown, unknown>;

        if (mapA.size !== mapB.size) {
          return false;
        }

        const remaining: [unknown, unknown][] = [];
        for (const [key, value] of mapA) {
          if (typeof key !== "object" || key === null) {
            if (!mapB.has(key)) {
              return false;
            }
            if (!areObjectsEqual(value, mapB.get(key), comparing)) {
              return false;
            }
          } else {
            remaining.push([key, value]);
          }
        }

        if (remaining.length === 0) {
          return true;
        }

        const candidates: [unknown, unknown][] = Array.from(mapB).filter(
          ([k]) => typeof k === "object" && k !== null,
        );

        if (remaining.length !== candidates.length) {
          return false;
        }

        for (const [key, value] of remaining) {
          const match = candidates.find(([k]) =>
            areObjectsEqual(key, k, comparing),
          );

          if (!match) {
            return false;
          }

          if (!areObjectsEqual(value, match[1], comparing)) {
            return false;
          }
          candidates.splice(candidates.indexOf(match), 1);
        }
        return true;
      }

      case "[object Set]": {
        const setA = firstObject as Set<unknown>;
        const setB = b as Set<unknown>;

        if (setA.size !== setB.size) {
          return false;
        }

        const remaining: unknown[] = [];
        for (const item of setA) {
          if (typeof item !== "object" || item === null) {
            if (!setB.has(item)) {
              return false;
            }
          } else {
            remaining.push(item);
          }
        }
        if (remaining.length === 0) {
          return true;
        }
        const candidates = Array.from(setB).filter(
          (item) => typeof item === "object" && item !== null,
        );
        if (remaining.length !== candidates.length) {
          return false;
        }
        for (const item of remaining) {
          const match = candidates.find((c) =>
            areObjectsEqual(item, c, comparing),
          );

          if (!match) {
            return false;
          }
          candidates.splice(candidates.indexOf(match), 1);
        }
        return true;
      }

      case "[object WeakMap]":
      case "[object WeakSet]":
        return false;

      default: {
        if (isReactElement(firstObject) && isReactElement(b)) {
          return (
            firstObject.type === b.type &&
            firstObject.key === b.key &&
            areObjectsEqual(firstObject.props, b.props, comparing)
          );
        }

        const firstDict = firstObject as Record<string, unknown>;
        const secondDict = b as Record<string, unknown>;
        const keysA = Object.getOwnPropertyNames(firstDict);
        const keysB = Object.getOwnPropertyNames(secondDict);

        if (keysA.length !== keysB.length) {
          return false;
        }

        for (const key of keysA) {
          if (!areObjectsEqual(firstDict[key], secondDict[key], comparing)) {
            return false;
          }
        }
        return true;
      }
    }
  } finally {
    comparing.delete(firstObject);
  }
};

function cloneObject<T>(obj: T, cloned = new Map<object, unknown>()): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const existing = cloned.get(obj as object);
  if (existing !== undefined) {
    return existing as T;
  }

  const tag = getTag(obj as object);

  switch (tag) {
    case "[object Array]": {
      const arr = obj as unknown[];
      const len = arr.length;
      const arrClone: unknown[] = new Array(len);
      cloned.set(obj as object, arrClone);
      for (let i = 0; i < len; i++) {
        arrClone[i] = cloneObject(arr[i], cloned);
      }
      return arrClone as unknown as T;
    }

    case "[object Date]": {
      const dateClone = new Date((obj as unknown as Date).getTime());
      cloned.set(obj as object, dateClone);
      return dateClone as unknown as T;
    }

    case "[object RegExp]": {
      const re = obj as unknown as RegExp;
      const regexClone = new RegExp(re.source, re.flags);
      cloned.set(obj as object, regexClone);
      return regexClone as unknown as T;
    }

    case "[object Map]": {
      const mapClone = new Map();
      cloned.set(obj as object, mapClone);
      (obj as unknown as Map<unknown, unknown>).forEach((value, key) => {
        mapClone.set(cloneObject(key, cloned), cloneObject(value, cloned));
      });
      return mapClone as unknown as T;
    }

    case "[object Set]": {
      const setClone = new Set();
      cloned.set(obj as object, setClone);
      (obj as unknown as Set<unknown>).forEach((value) => {
        setClone.add(cloneObject(value, cloned));
      });
      return setClone as unknown as T;
    }

    case "[object WeakMap]":
    case "[object WeakSet]":
      return obj;

    default: {
      const dict = obj as Record<string, unknown>;
      const objClone: Record<string, unknown> = Object.create(
        Object.getPrototypeOf(obj),
      );
      cloned.set(obj as object, objClone);

      const keys = Object.getOwnPropertyNames(dict);
      for (const key of keys) {
        objClone[key] = cloneObject(dict[key], cloned);
      }

      return objClone as unknown as T;
    }
  }
}

const useObjectUtilities = () => ({ areObjectsEqual, cloneObject });

export default useObjectUtilities;
