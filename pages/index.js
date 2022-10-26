import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/Home.module.css';

import useTrackLocation from '../hooks/use-track-location';
import { fetchCoffeeStores } from '../lib/coffee-stores';

import { ACTION_TYPES, StoreContext } from './_app';

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { dispatch, state } = useContext(StoreContext);

  const { latLong, coffeeStores } = state;

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { handleTrackLocation, locationErrorMessage, isFindingLocation } =
    useTrackLocation();

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 24);

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchedCoffeeStores },
          });
        } catch (error) {
          console.log(error);
          setCoffeeStoresError(error.message);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [dispatch, latLong]);

  const handleOnBannerClick = () => {
    console.log('you clicked on the banner!');
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name='description' content='Discover Coffee Stores' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Loading...' : 'View stores nearby'}
          handleOnClick={handleOnBannerClick}
        />
        {locationErrorMessage && (
          <p>Something went wrong: {locationErrorMessage}</p>
        )}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='hero image'
            width={700}
            height={400}
          />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  key={store.id}
                  className={styles.card}
                  name={store.name}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={
                    store.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles.sectionWrapper}>
          {props.coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Davao Stores</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((store) => (
                  <Card
                    key={store.id}
                    className={styles.card}
                    name={store.name}
                    href={`/coffee-store/${store.id}`}
                    imgUrl={
                      store.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
