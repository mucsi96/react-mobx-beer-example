import React from 'react';
import { FavoriteBeerList } from 'favorites/FavoriteBeerList';
import { AllBeersList } from 'allBeers/AllBeersList';
import { favoritesStore } from 'favorites/FavoritesStore';
import style from './HomePage.module.css';
import { observer } from 'mobx-react';

export const HomePage: React.FC = observer(() => {
  const { favorites } = favoritesStore;
  const hasFavorites = !!favorites.length;

  return (
    <>
      {hasFavorites && (
        <>
          <h1>Favorite beers</h1>
          <FavoriteBeerList className={style.favoriteList} />
          <h1>All beers</h1>
        </>
      )}
      <AllBeersList />
    </>
  );
});
