import React, { useMemo } from 'react';
import { favoritesStore } from 'favorites/FavoritesStore';
import { allBeersStore } from 'allBeers/AllBeersStore';
import { TBeer } from 'punkapi';
import { BeerList } from 'core/BeerList';
import { observer } from 'mobx-react';

type TFavoriteBeerListProps = {
  className?: string;
};

export const FavoriteBeerList: React.FC<TFavoriteBeerListProps> = observer(({ className }) => {
  const { favorites } = favoritesStore;
  const { beers, loading, error } = allBeersStore;
  const favoriteBeers = useMemo(
    () =>
      favorites
        .map((favoriteBeerId: number) => beers.find(({ id }: TBeer) => id === favoriteBeerId))
        .filter(Boolean) as TBeer[],
    [beers, favorites]
  );

  return (
    <BeerList
      className={className}
      loading={loading}
      error={error}
      beers={favoriteBeers}
      isFavorite={() => false}
    />
  );
});
