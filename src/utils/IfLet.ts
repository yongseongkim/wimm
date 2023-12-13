import {isNil} from 'lodash';

export function ifLet<P, R>(
  value: P | undefined | null,
  fn: (v: P) => R,
): R | undefined {
  if (!isNil(value)) {
    return fn(value);
  }
  return undefined;
}
