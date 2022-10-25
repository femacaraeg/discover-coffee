import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/Home.module.css';

import useTrackLocation from '../hooks/use-track-location';
import { fetchCoffeeStores } from '../lib/coffee-stores';

export async function getStaticProps(context) {
  console.log('hi getStaticProps');

  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  // const { coffeeStores } = props;

  const [coffeeStores, setCoffeeStores] = useState('');
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const {
    handleTrackLocation,
    latLong,
    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();

  console.log({ latLong, locationErrorMessage });

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 24);
          console.log({ fetchedCoffeeStores });
          setCoffeeStores(fetchedCoffeeStores);
        } catch (error) {
          console.log(error);
          setCoffeeStoresError(error.message);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [latLong]);

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
