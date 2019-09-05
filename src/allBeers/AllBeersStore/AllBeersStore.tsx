import { fetchBeers, TBeer } from 'punkapi';
import { observable, runInAction, action } from 'mobx';

export class AllBeersStore {
  @observable public beers: TBeer[] = [];
  @observable public loading = false;
  @observable public error = '';

  public constructor() {
    this.fetchBeersAndHandleErrors();
  }

  public getBeerById = (id: number): TBeer | undefined => {
    return this.beers.find(({ id: beerId }) => beerId === id);
  };

  @action
  private async fetchBeersAndHandleErrors() {
    try {
      this.loading = true;
      await runInAction(async () => {
        this.beers = await fetchBeers();
      });
    } catch {
      runInAction(() => {
        this.error = 'Unable to fetch the beers';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const allBeersStore = new AllBeersStore();
