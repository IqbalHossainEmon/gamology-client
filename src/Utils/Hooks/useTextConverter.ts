type Transform = (str: string) => string;

// Runs each transform in order. If a transform throws, its input passes
// through unchanged instead of aborting the whole pipeline.
const applyTransforms = (value: string, transforms: readonly Transform[]): string =>
  transforms.reduce((acc, fn) => {
    try {
      return fn(acc);
    } catch {
      return acc;
    }
  }, value);

// name -> id: spaces/specials become '-', any existing '-' is escaped as
// '\-', and any word that originally started with a lowercase letter (e.g.
// "van" in "van Der Berg") is escaped so convertIdToName can restore that
// casing later. Everything ends up lowercase.
const nameToIdTransforms: readonly Transform[] = [
  (str) => str.replace(/-/g, '\\-'),
  (str) => str.replace(/\s/g, '-'),
  (str) => str.replace(/\b[a-z]/g, (char) => `\\${char}`),
  (str) => str.toLowerCase(),
];

// id -> name: reverses convertNameToId's transforms in the opposite order.
const idToNameTransforms: readonly Transform[] = [
  (str) => str.replace(/(?<!\\)-/g, ' '),
  (str) => str.replace(/\\-/g, '-'),
  (str) => str.replace(/\b(?<!\\)\w/g, (char) => char.toUpperCase()),
  (str) => str.replace(/\\([a-z])/g, '$1'),
];

const nameToLinkTransforms: readonly Transform[] = [
  (str) => str.replace(/[^a-zA-Z0-9\s-]/g, ''),
  (str) => str.replace(/\s+/g, '-'),
  (str) => str.toLowerCase(),
];

// Converts a name to id format: spaces/special chars become '-', '-' is
// escaped as '\-', and the whole string is lowercased.
export const convertNameToId = (name: string): string =>
  applyTransforms(name, nameToIdTransforms);

// Converts an id back to name format: '-' becomes ' ', and the first
// character of each word is uppercased.
export const convertIdToName = (id: string): string =>
  applyTransforms(id, idToNameTransforms);

export const convertNameToLink = (name: string): string =>
  applyTransforms(name, nameToLinkTransforms);

// Capitalizes the first letter of each word.
export const convertToPascalCase = (name?: string): string | undefined =>
  name?.replace(/\b[a-z]/g, (char) => char.toUpperCase());

const useTextConverter = () => ({
  convertNameToId,
  convertIdToName,
  convertNameToLink,
  convertToPascalCase,
});

export default useTextConverter;
