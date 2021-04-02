import { copy } from '~/utils';

/**
 * Convert the properties of the target object
 * into functions that return the property value.
 * This is useful for ensuring that the data
 * returned by Apollo schema mocks are different
 * each time the mock factory is called.
 *
 * For Example:
 * `toGenerator({foo: 'Bob', bar: 'Fred'})`
 *
 * Returns:
 * `{foo: () => 'Bob', bar: () => 'Fred'}`
 *
 * @param {object} target - The object whose properties
 *   should be factory functions.
 */
export function toGenerator(target) {
  const out = {};
  for(let prop in target) {
    out[prop] = () => target[prop];
  }
  return out;
}

/**
 * Generate a random `bigInt` type value.
 */
export function bigInt() {
  return Math.floor(Math.random() * 10000);
}

/**
 * Create a new object from the original with any properties that are
 * objects converted into nested relationship objects (ie {data: value).
 *
 * Ex:
 * ```
 *   prepareNestedObjects({foo: {bar: 'baz'}}); // -> {foo: {data: {bar: 'baz'}}}
 * ```
 */
export function prepareNestedRelationships(original) {
  if (typeof(original) !== 'object') return original;

  const out = copy(original);
  for (let key in out) {
    const current = out[key];
    if (Array.isArray(current)) {
      out[key] = {
        data: current.map(i => prepareNestedRelationships(i))
      };
    } else if (current && typeof(current) === 'object') {
      out[key] = {
        data: prepareNestedRelationships(current)
      };
    }
  }
  return out;
};

/**
 * Perform the inverse of `prepareNestedRelationships`.
 */
export function collapseNestedRelationships(original) {
  if (typeof(original) !== 'object') return original;

  const out = copy(original);
  for (let key in out) {
    const current = out[key];
    if (current && typeof(current) === 'object') {
      if (Array.isArray(current)) {
        out[key] = current.map(o => collapseNestedRelationships(o));
      } else if (current.data) {
        out[key] = collapseNestedRelationships(current.data);
      } else {
        out[key] = collapseNestedRelationships(current);
      }
    }
  }
  return out;
}
