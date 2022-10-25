import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import { fetchCoffeeStores } from '../../lib/coffee-stores';

import styles from '../../styles/coffee-store.module.css';

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.id.toString === params.storeId;
  });

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((store) => {
    return {
      params: {
        storeId: store.id.toString(),
      },
    };
  });
  return {
    fallback: false,
    paths,
  };
}

function CoffeeStore(props) {
  const router = useRouter();

  const { address, name, cross_street, imgUrl } = props.coffeeStore;

  console.log(props);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpvoteButton = () => {
    console.log('up vote');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name='description' content='Coffee Store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={`glass ${styles.col2}`}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='location icon'
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/nearMe.svg'
              width='24'
              height='24'
              alt='location icon'
            />
            <p className={styles.text}>{cross_street}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='location icon'
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
