import React, { useMemo } from 'react';
import style from './App.module.css';
import { Footer } from 'core/Footer';
import { HomePage } from 'HomePage';
import { DetailsPage } from 'DetailsPage';
import { RouteParamsStore } from 'core/RouteParamsStore';
import { observer } from 'mobx-react';

export const App: React.FC = observer(() => {
  const detailsPageParams = useMemo(() => new RouteParamsStore<{ id: string }>('/beer/:id'), []);
  const renderView = () => {
    if (detailsPageParams.params) {
      return <DetailsPage id={parseInt(detailsPageParams.params.id)} />;
    }

    return <HomePage />;
  };

  return (
    <>
      <main className={style.container}>{renderView()}</main>
      <Footer />
    </>
  );
});
