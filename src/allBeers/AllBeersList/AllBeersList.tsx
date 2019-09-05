import React from 'react';
import { BeerList } from 'core/BeerList';
import { favoritesStore } from 'favorites/FavoritesStore';
import { allBeersStore } from 'allBeers/AllBeersStore';
import { observer } from 'mobx-react';

export const AllBeersList: React.FC = observer(() => {
  const { beers, loading, error } = allBeersStore;
  const { isFavorite } = favoritesStore;

  return (
    <BeerList
      beers={beers}
      loading={loading}
      error={error}
      isFavorite={(id: number) => isFavorite(id)}
    />
  );
});
