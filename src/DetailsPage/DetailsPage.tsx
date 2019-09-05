import React from 'react';
import { allBeersStore } from 'allBeers/AllBeersStore';
import style from './DetailsPage.module.css';
import { AddToFavoritesButton } from 'favorites/AddToFavoritesButton';
import { favoritesStore } from 'favorites/FavoritesStore';
import { ReactComponent as BackIcon } from 'icons/left-arrow.svg';
import { IconLink } from 'core/IconLink';
import { observer } from 'mobx-react';

type TDetailsPageProps = {
  id: number;
};

export const DetailsPage: React.FC<TDetailsPageProps> = observer(({ id }) => {
  const { getBeerById } = allBeersStore;
  const { isFavorite, toogleFavorite } = favoritesStore;
  const beer = getBeerById(id);

  if (!beer) {
    return <h1>{`No beer found with id ${id}!`}</h1>;
  }

  const { imageUrl, name, tagline, firstBrewed, description, brewersTips } = beer;

  return (
    <article>
      <header className={style.header}>
        <IconLink href="/">
          <BackIcon />
        </IconLink>
        <h2 className={style.headerTitle}>{name}</h2>
        <AddToFavoritesButton
          active={isFavorite(id)}
          onClick={() => toogleFavorite(id)}
          data-testid="favorite-button"
        />
      </header>
      <main className={style.mainContent}>
        <img src={imageUrl} alt={name} className={style.image} />
        <div className={style.details}>
          <p className={style.tagline}>{tagline}</p>
          <p>First brewed: {new Intl.DateTimeFormat().format(firstBrewed)}</p>
          <p>{description}</p>
          <p>{brewersTips}</p>
        </div>
      </main>
    </article>
  );
});
