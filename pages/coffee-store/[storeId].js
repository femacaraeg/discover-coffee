import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

function CoffeeStore() {
  const router = useRouter();
  const { storeId } = router.query;
  console.log(router);
  return (
    <React.Fragment>
      <Head>
        <title>{storeId}</title>
        <meta name='description' content='Coffee Store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        Coffee Store {storeId}
        <Link href='/'>
          <a>Back to Home</a>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default CoffeeStore;
