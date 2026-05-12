type Transform = (str: string) => string;

// Runs each transform in order. If a transform throws, its input passes
// through unchanged instead of aborting the whole pipeline.
const applyTransforms = (
  value: string,
  transforms: readonly Transform[],
): string =>
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
  (str) => str.replaceAll("-", "\\-"),
  (str) => str.replaceAll(/\s/gu, "-"),
  (str) => str.replaceAll(/\b[a-z]/gu, (char) => `\\${char}`),
  (str) => str.toLowerCase(),
];

// id -> name: reverses convertNameToId's transforms in the opposite order.
const idToNameTransforms: readonly Transform[] = [
  (str) => str.replaceAll(/(?<!\\)-/gu, " "),
  (str) => str.replaceAll("\\-", "-"),
  (str) => str.replaceAll(/\b(?<!\\)\w/gu, (char) => char.toUpperCase()),
  (str) => str.replaceAll(/\\([a-z])/gu, "$1"),
];

const nameToLinkTransforms: readonly Transform[] = [
  (str) => str.replaceAll(/[^a-zA-Z0-9\s-]/gu, ""),
  (str) => str.replaceAll(/\s+/gu, "-"),
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
  name?.replaceAll(/\b[a-z]/gu, (char) => char.toUpperCase());
