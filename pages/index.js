import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';
import styles from '../styles/Home.module.css';

import coffeeStores from '../mocks/coffee-stores.json';

export default function Home() {
  const handleOnBannerClick = () => {
    console.log('you clicked on the banner!');
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
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='hero image'
            width={700}
            height={400}
          />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map((store) => (
            <Card
              key={store.id}
              className={styles.card}
              name={store.name}
              href={`/coffee-store/${store.id}`}
              imgUrl={store.imgUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
