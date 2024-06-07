
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const NotFoundPage = () => {

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div >
        <h1>404 - Page Not Found</h1>
        <p>
          The page you are looking for does not exist.
        </p>
      </div>
    </>
  );
};


export default NotFoundPage;
