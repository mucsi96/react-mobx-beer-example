import { observable, action } from 'mobx';

export class LocalStorageStore<T> {
  @observable public value: T;
  private key: string;

  public constructor(key: string, initialValue: T) {
    this.key = key;
    this.value = this.loadInitialValue(initialValue);
  }

  @action
  private loadInitialValue(initialValue: T) {
    try {
      const item = window.localStorage.getItem(this.key);

      if (item === null) {
        return initialValue;
      }

      return JSON.parse(item);
    } catch (error) {
      /* istanbul ignore next */
      if (process.env.NODE_ENV !== 'test') {
        console.log(error);
      }
      return initialValue;
    }
  }

  @action
  public setValue(value: T) {
    this.value = value;
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }
}
