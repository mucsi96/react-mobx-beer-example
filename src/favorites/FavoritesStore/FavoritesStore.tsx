import { LocalStorageStore } from 'favorites/LocalStorageStore';
import { computed } from 'mobx';

export class FavoritesStore {
  private store = new LocalStorageStore<number[]>('favorites', []);

  @computed public get favorites() {
    return this.store.value;
  }

  public isFavorite = (favorite: number) => {
    return this.favorites.includes(favorite);
  };

  public toogleFavorite = (favorite: number) => {
    if (this.isFavorite(favorite)) {
      this.store.setValue(
        this.favorites.filter((favoriteToRemove: number) => favoriteToRemove !== favorite)
      );
    } else {
      this.store.setValue([...this.favorites, favorite]);
    }
  };
}

export const favoritesStore = new FavoritesStore();
