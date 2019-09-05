import pathToRegexp, { Key } from 'path-to-regexp';
import { observable, action } from 'mobx';

function getParams<T>(pattern: string): T | null {
  const keys: Key[] = [];
  const regexp = pathToRegexp(pattern, keys);
  const match = regexp.exec(window.location.pathname);

  if (!match) {
    return null;
  }

  return keys.reduce((params, key, index) => {
    return {
      ...params,
      [key.name]: decodeURIComponent(match[index + 1])
    };
  }, {}) as T;
}

export class RouteParamsStore<T> {
  private pattern: string;
  @observable public params: T | null;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.params = getParams(pattern);
    window.addEventListener('popstate', this.updateParams);
  }

  @action
  private updateParams = () => {
    this.params = getParams(this.pattern);
  };
}
